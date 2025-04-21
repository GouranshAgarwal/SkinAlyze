import dbConnect from "@/lib/dbConnect";
import Otp from "@/models/Otp";
import { ApiResponse } from "@/helpers/ApiResponse";
import User from "@/models/User";

export async function POST(requset:Request){
    await dbConnect();
    try {

        const {email, otp} = await requset.json();
        const validOtp = await Otp.findOne({email, otp});

        if(!validOtp){
            return ApiResponse.error("Invalid or Expired OTP");
        }

        await Otp.deleteMany({email});
        const user = await User.findOne({email});
        if(!user){
            return ApiResponse.notFound("Account not found");
        }
        if(user.isVerified == false){
            user.isVerified = true;
            await user.save();
        }
        return ApiResponse.success("Verification successfull");

    } catch (error) {
        console.error("error:POST::verify-otp::", error);
        return ApiResponse.error("Error while verifying OTP");
    }
}