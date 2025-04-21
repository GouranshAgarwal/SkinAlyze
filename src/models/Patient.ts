import mongoose, { Schema, Document} from "mongoose";


export interface IPatient extends Document{
    name: string;
    altContact?:number;
    gender:string;
    age:number;
    history?:string;
    weight?:number;
    height?:number;
    profileImage?:string;
    address?:string;
    bloodGroup?:string;
}

const PatientSchema = new Schema<IPatient>({
    name: {
        type:String,
        required:true,
    },
    altContact:{
        type:String,
        required:false,
    },
    gender:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    history:{
        type:String,
        required:false,
    }, // array or String??
    weight:{
        type:Number,
        required:false,
    },
    height:{
        type:String,
        required:false,
    },
    profileImage:{
        type:String,
        required:false,
    },
    address:{
        type:String,
        required:false,
    },
    bloodGroup:{
        type:String,
        enum:["A+","A-","B+","B-","AB+","AB-","O+","O-", "RH"],
        required:false,
    },
});

export default mongoose.model<IPatient>("Patient", PatientSchema)