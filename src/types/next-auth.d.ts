import 'next-auth'
import { DefaultSession } from 'next-auth'

// might need to change...

declare module "next-auth"{
    interface User{
        id?: string;
        email?: string;
        contact?: number;
        profileImage?: string;
        isVerified?:boolean;
        role?: string;
    }
    interface Session{
        user: {
            id?: string;
            email?: string;
            contact?: number;
            profileImage?: string;
            isVerified?:boolean;
            role?: string;
          } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt"{ //another way of doing the redefining the interfaces
    interface JWT{
        id?:string;
        contact?:number;
        email?:string;
        isVerified?:boolean;
        role?:string;
    }
}