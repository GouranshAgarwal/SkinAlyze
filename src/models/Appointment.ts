import mongoose, { Document, Schema } from "mongoose";

export interface IAppointment extends Document {
    patient_ID: mongoose.Types.ObjectId;
    doctor_ID: mongoose.Types.ObjectId;
    dateTime: Date;
    status: string;
    duration?: number;
    reason?: string;
    type?: string;
}
  
  const AppointmentSchema = new Schema<IAppointment>({
    patient_ID: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor_ID: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    dateTime: { type: Date, required: true },
    status: { type: String, required: true },
    duration: { type: Number },
    reason: { type: String },
    type: { type: String } // online or offline
  });
  
  export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);
  