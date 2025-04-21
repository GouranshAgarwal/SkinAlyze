import { ApiResponse } from "@/helpers/ApiResponse";
import dbConnect from "@/lib/dbConnect";
import Prescription from "@/models/Prescription";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { Types } from "mongoose";
import Patient from "@/models/Patient";


export async function GET(request:Request) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.role){
            return ApiResponse.unauthorized();
        }
        const { searchParams } = new URL(request.url);
        const rawTargetId = searchParams.get("target");
        const rawAppointmentId = searchParams.get("appointment");
        const rawDate = searchParams.get("date");

        const role = session.user.role; // "Doctor" or "Patient"
        const userId = session.user.id;

        const query: any = {};

        // 🔐 Prevent patients from targeting other users
        if (role === "Patient" && rawTargetId) {
        return ApiResponse.forbidden("Patients cannot access another user's data.");
        }

        // 🔍 If doctor is targeting someone else, validate target role
        if (role === "Doctor" && rawTargetId && Types.ObjectId.isValid(rawTargetId)) {
        const validTarget = await Patient.findById(rawTargetId).select("_id");
        if (!validTarget) {
            return ApiResponse.forbidden("Invalid targetId — patient not found.");
        }
        query["doctor"] = userId;
        query["patient"] = rawTargetId;
        } else if (userId && Types.ObjectId.isValid(userId)) {
        // Default: fetch own data
        query[role.toLowerCase()] = userId;
        } else {
        return ApiResponse.badRequest("Invalid user ID.");
        }

        // 🗓️ Optional appointment filter
        if (rawAppointmentId && Types.ObjectId.isValid(rawAppointmentId)) {
        query.appointment = rawAppointmentId;
        }

        // 📅 Optional date filter
        if (rawDate) {
        const parsedDate = new Date(rawDate);
        if (!isNaN(parsedDate.getTime())) {
            const start = new Date(parsedDate.setHours(0, 0, 0, 0));
            const end = new Date(parsedDate.setHours(23, 59, 59, 999));
            query.createdAt = { $gte: start, $lte: end };
        }
        }

        // 🔎 Fetch filtered prescriptions
        const prescriptions = await Prescription.find(query)
        .select(`-__v -${role.toLowerCase()}`) // Hide own reference field
        .sort({ createdAt: -1 });

        return ApiResponse.success(prescriptions);

    } catch (error) {
        console.error("");
        return ApiResponse.error("error while getting prescreption details")
    }
}

export async function POST(request:Request) {
    await dbConnect();
    try {
        const {medications, status, instruction, appointment_ID, patient_ID} = await request.json();

        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.role){
            return ApiResponse.unauthorized();
        }

        if(session.user.role !== "Doctor"){
            return ApiResponse.unauthorized("you are not authorized to add prescription");
        }
        if(!patient_ID || !appointment_ID) return ApiResponse.badRequest("both IDs are required");
        if(!medications) return ApiResponse.notFound("Please add medications");

        if (!Array.isArray(medications) || medications.length === 0) {
            return ApiResponse.badRequest("Medications must be a non-empty array");
        }
          

        await Prescription.create({
            patient:patient_ID,
            doctor:session.user.id,
            appointment_ID,
            medications,
            status,
            instruction
        })
        return ApiResponse.success("Prescription Added Successfully");
    } catch (error) {
        console.error("ERROR::POST::add-prescription", error);
        return ApiResponse.error("error while adding prescription, please try again");
    }
}
export async function PATCH(request:Request) {
    await dbConnect();
    try {
        const {id, medications, instruction, status} = await request.json();
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.role){
            return ApiResponse.unauthorized();
        }

        if(session.user.role !== "Doctor"){
            return ApiResponse.unauthorized("you are not authorized to add prescription");
        }
        const prescription = await Prescription.findById(id);
        
        if(!prescription) return ApiResponse.notFound("prescription not found");
        if(medications) prescription.medications = medications;
        if(instruction) prescription.instruction = instruction;
        if(status) prescription.status = status;

        await prescription.save();

        return ApiResponse.success("Prescription Updated Successfully");
    } catch (error) {
        console.error("ERROR::PATCH::add-prescription", error);
        return ApiResponse.error("error while updating prescription, please try again");
    }
}
export async function DELETE(request:Request) {
    await dbConnect();
    try {
        const {id} = await request.json();
        const session = await getServerSession(authOptions);
        if (!session || !session.user || session.user.role !== "Doctor") {
        return ApiResponse.unauthorized("You are not authorized to delete prescriptions");
        }

        if(!id){
            return ApiResponse.badRequest("id is required to delete the prescription");
        }
        await Prescription.findByIdAndDelete(id);
        return ApiResponse.success("Prescription Deleted Successfully");
    } catch (error) {
        console.error("ERROR::DELETE::add-prescription", error);
        return ApiResponse.error("error while deleting prescription, please try again");
    }
}