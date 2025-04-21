import dbConnect from "@/lib/dbConnect";
import Otp from "@/models/Otp";
import { sendOtpEmail } from "@/helpers/sendOtpEmail";
import { ApiResponse } from "@/helpers/ApiResponse";
import User from "@/models/User";


export async function POST(req:Request) {
    if(!(req.method == "POST")){
        return ApiResponse.forbidden("Request type not supported");
    }

    await dbConnect();
    try {
        const {email} = await req.json();

        if(!email){
            return ApiResponse.badRequest("email is required");
        }

        const existingUser = await User.findOne({
            email
        })

        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.findOneAndUpdate(
            {email},
            {otp:generatedOtp, expiresAt:new Date(Date.now() + 5 * 60 * 1000)},
            {upsert : true, new : true}
        )
        
        await sendOtpEmail(email, generatedOtp, "User"); // can add user name here 
        return ApiResponse.success("OTP sent Successfully. Please verify to continue.")
        
    } catch (error) {
        console.error("error::POST::send-otp:: ", error);
        return ApiResponse.error("Error while sending OTP");
    }
}