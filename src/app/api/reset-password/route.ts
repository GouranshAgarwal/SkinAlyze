import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/helpers/ApiResponse";


export async function PATCH(request:Request) {
    if(!(request.method == "PATCH")){
        return ApiResponse.badRequest("request Method not accepted");
    }
    await dbConnect();

    try {

        const {email, newPassword} = await request.json();
        //assuming that we have verified OTP using send-otp and verify-otp route
        const user = await User.findOne({email});
        if(!user){
            return ApiResponse.notFound("User not found");
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return ApiResponse.success("Password Updated Successfully");
        
    } catch (error) {
        console.error("error::POST::update-password::", error);
        return ApiResponse.error("error while updating password")
    }
}