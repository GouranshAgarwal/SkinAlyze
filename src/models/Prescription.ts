import mongoose, { Document, Schema } from "mongoose";

export interface IPrescription extends Document {
    patient: mongoose.Types.ObjectId;
    doctor: mongoose.Types.ObjectId;
    appointment_ID: mongoose.Types.ObjectId;
    medications: string[];
    instruction?: string;
    status: string;
  }
  
  const PrescriptionSchema = new Schema<IPrescription>({
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    appointment_ID: { type: Schema.Types.ObjectId, ref: "Appointment", required: true },
    medications: [{ type: String, required: true }], // pills, injections, dosage, routine, etc
    instruction: { type: String, default:"None", required:false }, // regarding diet, etc
    status: { type: String, enum:["active", "completed", "forwarded", "expired"], required: true, default:"active" } // like when patient need to re-visit 2-3 times for the same disease thus their session should be continuous 
  }, {timestamps:true});
  
  export default mongoose.model<IPrescription>("Prescription", PrescriptionSchema);
  