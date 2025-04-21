import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { ApiResponse } from "@/helpers/ApiResponse";
import axios from "axios";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";

export async function POST(request:Request) {
    if(request.method !== "POST"){
        return ApiResponse.badRequest("Request method not accepted");
    }
    await dbConnect();
    try {
        const {
            email, 
            password, 
            contact, 
            address, 
            gender, 
            dob, 
            name, 
            role,
            specialization, // only for doc
            licenseNumber, // only for doc
            consultation_fee, // only for doc
            experience, // only for doc
        } = await request.json();

        if (!email || !password || !contact || !address || !gender || !dob || !name || !role) {
            return ApiResponse.badRequest("Please fill all required fields.");
          }
      
          if (!["Doctor", "Patient"].includes(role)) {
            return ApiResponse.badRequest("Invalid role provided.");
          }
      
        const ExistingUser = await User.findOne({$or:[{contact}, {email}]});

        if(ExistingUser){
            return ApiResponse.badRequest("Account Already Exists, please login");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let referenceId;

        if (role === "Doctor") {
          if (!specialization || !licenseNumber || !consultation_fee || !experience) {
            return ApiResponse.badRequest("Doctor details are incomplete.");
          }

          const doctor = await Doctor.create({
            name,
            address,
            gender,
            dob,
            specialization,
            licenseNumber,
            experience,
            consultation_fee,
          });

          referenceId = doctor._id; 
        }else{
            const patient = await Patient.create({
                name,
                address, 
                gender, 
                dob,
            })

            referenceId = patient._id;
        }

        const user = await User.create({
            email,
            password:hashedPassword,
            contact,
            role,
            referenceId,
        })

        await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/send-otp`,{email});
        return ApiResponse.success("Account Created")

    } catch (error) {
        console.error("error::POST::signup::",error);
        return ApiResponse.error("error while signing you up");
    }


}