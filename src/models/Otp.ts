import mongoose, { Schema, Document } from "mongoose";

interface IOtp extends Document {
  email: string;  // Connects OTP to a user via email
  otp: string;
  createdAt: Date;
  expiresAt: Date;
}

const OtpSchema = new Schema<IOtp>({
  email: { type: String, required: true }, // Removed `unique: true`
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { 
    type: Date, 
    default: () => new Date(Date.now() + 10 * 60 * 1000), // Auto-calculate expiry
    index: { expires: "10m" } // Auto-delete expired OTPs
  }
});

const Otp = mongoose.models.Otp || mongoose.model<IOtp>("Otp", OtpSchema);
export default Otp;
