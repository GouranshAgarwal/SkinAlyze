import { ApiResponse } from "@/helpers/ApiResponse";
import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import { Types } from "mongoose";

export async function GET(request: Request, { session }: { session: any }) {
    await dbConnect();
    try {
      const { searchParams } = new URL(request.url);
      const rawTargetId = searchParams.get("target");
      const rawAppointmentId = searchParams.get("appointment");
      const rawDate = searchParams.get("date");
      const status = searchParams.get("status");
  
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      const skip = (page - 1) * limit;
  
      const role = session.user.role;
      const userId = session.user.id;
      const query: any = {};
  
      // 🛡️ Secure Access Control
      if (role === "Patient" && rawTargetId) {
        return ApiResponse.error("Patients cannot access others' appointments.", 403);
      }
  
      if (role === "Doctor" && rawTargetId && Types.ObjectId.isValid(rawTargetId)) {
        const validTarget = await Patient.findById(rawTargetId).select("_id");
        if (!validTarget) {
          return ApiResponse.error("Invalid targetId — patient not found.", 403);
        }
        query.doctor_ID = userId;
        query.patient_ID = rawTargetId;
      } else if (Types.ObjectId.isValid(userId)) {
        query[role === "Doctor" ? "doctor_ID" : "patient_ID"] = userId;
      } else {
        return ApiResponse.error("Invalid user ID.", 400);
      }
  
      // Optional filters
      if (rawAppointmentId && Types.ObjectId.isValid(rawAppointmentId)) {
        query._id = rawAppointmentId;
      }
  
      if (rawDate) {
        const parsedDate = new Date(rawDate);
        if (!isNaN(parsedDate.getTime())) {
          const start = new Date(parsedDate.setHours(0, 0, 0, 0));
          const end = new Date(parsedDate.setHours(23, 59, 59, 999));
          query.dateTime = { $gte: start, $lte: end };
        }
      }
  
      if (status) {
        query.status = status;
      }
  
      const totalCount = await Appointment.countDocuments(query);
  
      const appointments = await Appointment.find(query)
        .sort({ dateTime: -1 })
        .skip(skip)
        .limit(limit)
        .populate("doctor_ID", "name specialization")
        .populate("patient_ID", "name age")
        .select("-__v");
  
      return ApiResponse.success({
        appointments,
        pagination: {
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
        },
      });
    } catch (error) {
      console.error("ERROR::GET::book_appointment::", error);
      return ApiResponse.error("Error while getting appointment info");
    }
}

export async function POST(request:Request) { // book an appointment
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session?.user.role){
            return ApiResponse.unauthorized();
        }

        const availableDays = await Doctor.findById(session.user.id).select("availability");
        const {date, doctorId, duration, reason, type} = await request.json();

        if(!date || !doctorId || duration || type){
            return ApiResponse.badRequest("please fill the required fields");
        }
        if(session.user.role !== "Patient"){
            return ApiResponse.forbidden("You are not authorized to book appointments with doctor");
        }
        const appointment = await Appointment.create({
            patient_ID:session.user.id,
            doctor_ID:doctorId,
            dateTime:date,
            status:"Upcoming",
            duration,
            reason,
            type
        });
        return ApiResponse.success(appointment, "Appointment booked successfully");

    } catch (error) {
        console.error("ERROR::POST::book_appointment::", error);
        return ApiResponse.error("Error while booking the appointment");
    }
}
export async function PATCH(request:Request) { // reschedule the appointment on a later date 
    await dbConnect();
    try { // for doctor, he should be able to rechedule an appointment to a date at which he was not previously available which is currently not happening with this code 
        const {id, new_date, duration, reason} = await request.json();
        if(!id)return ApiResponse.badRequest("id is required");
        if(!new_date) return ApiResponse.badRequest("please select a valid date to reschedule");
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.role){
            return ApiResponse.unauthorized();
        }
        const role = session.user.role;
        const appointment = await Appointment.findById(id); // is it correct???
        if(!appointment){
            return ApiResponse.notFound("Appointment not found");
        }

        if(duration) appointment.duration = duration;
        if(reason) appointment.reason = reason;

        if(role === "Doctor"){
            appointment.status = "rescheduled by doctor";
        }else if(role === "Patient"){
            appointment.status = "rescheduled by patient";
        }

        const updatedAppointment = await appointment.save();
        
        return ApiResponse.success(updatedAppointment, "Appointment cancelled Successfully")
        
    } catch (error) {
        console.error("ERROR::PATCH::book_appointment::", error);
        return ApiResponse.error("Error while rescheduling the appointment");
    }
}
export async function DELETE(request:Request) {  // cancel the appointment
    await dbConnect();
    try {
        const {id, reason} = await request.json();
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.role){
            return ApiResponse.unauthorized();
        }
        const role = session.user.role;
        const appointment = await Appointment.findById(id); // is it correct???
        if(!appointment){
            return ApiResponse.notFound("Appointment not found");
        }

        if(role === "Doctor"){
            appointment.status = "cancelled by doctor";
            if(reason) appointment.reason = reason;
        }else if(role === "Patient"){
            appointment.status = "cancelled by patient";
            if(reason) appointment.reason = reason;
        }

        const updatedAppointment = await appointment.save();
        
        return ApiResponse.success(updatedAppointment, "Appointment cancelled Successfully")
    } catch (error) {
        console.error("ERROR::DELETE::book_appointment::", error);
        return ApiResponse.error("Error while cancelling the appointment, please try again");
    }
}