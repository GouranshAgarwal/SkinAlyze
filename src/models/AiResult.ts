import mongoose, { Document, Schema } from "mongoose";

export interface IAiResult extends Document {
    patient: mongoose.Types.ObjectId;
    // doctor?: mongoose.Types.ObjectId;
    image: string;
    diseaseName: string;
    description: string;
    confidence: number;
  }
  
  const AiResultSchema = new Schema<IAiResult>({
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    // doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: false },
    image: { type: String, required: true },
    diseaseName: { type: String, required: true },
    description:{ type:String, required: false, default: "No Information available" },
    confidence: { type: Number, required: true }
  }, {timestamps:true});
  
  export default mongoose.model<IAiResult>("AiResult", AiResultSchema);
  