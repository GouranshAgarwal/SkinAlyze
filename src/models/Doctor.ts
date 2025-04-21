import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  gender:string;
  specialization: string;
  license_number: string;
  experience: number;
  hospital_affiliation?: string;
  consultation_fee: number;
  availability?: string[];
  profileImage?:string;
  address?: string; //clinic address
}

const DoctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  gender:{ type:String, required:true },
  specialization: { type: String, required: true },
  license_number: { type: String, required: true, unique: true },
  experience: { type: Number, required: true },
  hospital_affiliation: { type: String },
  consultation_fee: { type: Number, required: true },
  availability: [{ type: String }],
  profileImage:{ type:String, required:false },
  address: { type: String },
});

export default mongoose.model<IDoctor>("Doctor", DoctorSchema);
