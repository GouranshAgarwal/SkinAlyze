import EmailTemplate from '@/components/EmailTemplate';
import { Resend } from 'resend';
import React from 'react';
import { ApiResponse } from './ApiResponse';

const resend = new Resend(process.env.RESEND_API);

export async function sendOtpEmail( //need to change this void
    email:string,
    otp:string,
    username?:string,
    text?:string,
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [email],
            subject: "Your Manhwa Partner | OTP",
            react: React.createElement(EmailTemplate, { username, otp, text}),
          });

        return ApiResponse.success("Email Sent successfully");
    } catch (error) {
        console.error("error sending verification email", error);
        return ApiResponse.error(`error while sending email,${error}`);
    }

  
};