import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  contact: number;
  role: "doctor" | "patient";
  referenceId: mongoose.Types.ObjectId;
  isVerified:boolean;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, index:true },
  contact: { type: Number, required: true, unique: true, index:true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Doctor", "Patient"], required: true },
  referenceId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "role" // tells Mongoose to dynamically reference either 'doctor' or 'patient' collection
  },
  isVerified:{
    type:Boolean,
    required:false,
    default:false,
  }
});

export default mongoose.model<IUser>("User", UserSchema);
