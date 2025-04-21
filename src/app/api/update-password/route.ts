import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/helpers/ApiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function PATCH(request:Request) {
    if(!(request.method == "PATCH")){
        return ApiResponse.badRequest("request Method not accepted");
    }
    await dbConnect();

    try {
        
        const session = await getServerSession(authOptions);
        if(!session || !session.user){
            return ApiResponse.unauthorized()
        }

        const {currentPassword, newPassword} = await request.json();
        if(!currentPassword || !newPassword){
            return ApiResponse.badRequest("please provide both old and new password");
        }

        const user = await User.findOne({email:session.user.email});
        if(!user){
            return ApiResponse.notFound("user not found");
        }
        const isMatching = await bcrypt.compare(currentPassword, user.password);
        if(!isMatching){
            return ApiResponse.badRequest("Incorrect old password");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return ApiResponse.success("Password Updated Successfully");
        
    } catch (error) {
        console.error("error::POST::update-password::", error);
        return ApiResponse.error("error while updating password")
    }
}