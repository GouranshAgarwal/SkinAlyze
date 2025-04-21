import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User"
// import Doctor from "@/models/Doctor";
// import Patient from "@/models/Patient";
import bcryptjs from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import axios from "axios"
import { ApiResponse } from "@/helpers/ApiResponse";

export const authOptions: NextAuthOptions = {
  providers: [

    //  CUSTOM CREDENTIALS LOGIN (Password OR OTP)
    CredentialsProvider({
      id:"credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or contact", type: "text", required:true },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials:any):Promise<any>{

        await dbConnect();

        if(!credentials || !credentials?.identifier){
            throw new Error("contact/Email is requird")
        }

        const user = await User.findOne({ //user exists in database or not for logining
            $or:[
                {email:credentials.identifier},
                {contact:credentials.identifier},
            ]
        });

        if (!user) {
          throw new Error("No user found with this email/contact");
        }

        // **📌 CASE 1: LOGIN WITH PASSWORD**
        if (credentials?.password) {
          const isValid = await bcryptjs.compare(credentials.password, user.password);
          if (!isValid) throw new Error("Incorrect password");
          return user;
        }

        // **📌 CASE 2: LOGIN WITH OTP**
        if (credentials?.otp) {
          try {
            const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/verify-otp`, {
              email:user.email,
              otp: credentials.otp,
            })

            if(response.data.success){
              user.isVerified = true;
              return user;
            }else{
              return ApiResponse.badRequest("Invalid OTP")
            }

          } catch (error) {
            ApiResponse.error("error while logging in with OTP")
          }
        }
      },
    }),

    // GOOGLE LOGIN
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id?.toString();
        token.email = user.email;
        token.contact = user.contact;
        token.isVerified = user.isVerified;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.isVerified = token.isVerified;
        session.user.contact = token.contact;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut:"/auth/logout",
    error: "/auth/error",
  },
};

export default NextAuth(authOptions);
