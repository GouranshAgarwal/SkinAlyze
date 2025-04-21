import { ApiResponse } from "@/helpers/ApiResponse";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import Patient from "@/models/Patient";
import Doctor from "@/models/Doctor";
import User from "@/models/User";


export async function GET(request:Request) {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    if(!session || !session.user || !session.user.role){
      return ApiResponse.unauthorized();
    }
    const role = session.user.role // why not put this in global scope
    let profile = null;
    if(role === "Doctor"){
      profile = await Doctor
                        .findById(session.user.id)
                        .select("-password")
                        .populate({
                          path:"referenceId",
                          model: role,
                        });
    }else if(role === "Patient"){
      profile = await Patient
                          .findById(session.user.id)
                          .select("-password")
                          .populate({
                            path:"referenceId",
                            model: role,
                          });
    }
    if(!profile) return ApiResponse.notFound("profile info not found, please try again");
    return ApiResponse.success(profile);

  } catch (error) {
    console.error("ERROR::GET::PROFILE::", error);
    return ApiResponse.error("error while getting profile info");
  }
}

export async function PATCH(request:Request) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user){
            return ApiResponse.unauthorized();
        }

        const newData = await request.json();
        const role = session.user.role;

        if(!role){
            return ApiResponse.error("role not defined");
        }

        let user = null;

        if (role === "Doctor") {
          user = await Doctor.findById(session.user.id);
          if (!user) return ApiResponse.notFound("User not found");
    
          const allowedFields = [
            "name",
            "specialization",
            "license_number",
            "experience",
            "hospital_affiliation",
            "consultation_fee",
            "availability",
            "address",
            "profileImage", // Add this to your schema
          ];
    
          for (const field of allowedFields) {
            if (field in newData) {
              (user as any)[field] = newData[field];
            }
          }
    
          await user.save();
        } else if (role === "Patient") {
          user = await Patient.findById(session.user.id);
          if (!user) return ApiResponse.notFound("User not found");
    
          const allowedFields = [
            "name",
            "altContact",
            "gender",
            "age",
            "history",
            "weight",
            "height",
            "address",
            "bloodGroup",
            "profileImage", // Add this to your schema
          ];
    
          for (const field of allowedFields) {
            if (field in newData) {
              (user as any)[field] = newData[field];
            }
          }
    
          await user.save();
        }
        
        return ApiResponse.success("Profile Updated Successfully");
    } catch (error) {
        console.error("");
        return ApiResponse.error("Error while editing the profile info");
    }
}

export async function DELETE(request:Request) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user){
            return ApiResponse.unauthorized();
        }
        const role = session.user.role;
        if(!role){
            return ApiResponse.error("cannot find the role of the user");
        }
        const user = await User.findById(session.user.id);
        if(!user){
            return ApiResponse.notFound("user not found")
        }

        if(role==="Doctor"){
            await Doctor.findByIdAndDelete(user.referenceId);
        }else if(role === "Patient"){
            await Patient.findByIdAndDelete(user.referenceId);
        }
        return ApiResponse.success("account deleted successfully");
    } catch (error) {
        console.error("");
        return ApiResponse.error("Error while deleting the account");
    }
}