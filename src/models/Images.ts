// models/Image.ts
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  pati
  publicId: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
