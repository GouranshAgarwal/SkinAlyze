// lib/imageService.ts
import cloudinary from './cloudinary';
import connectDB from './db';
import ImageModel from '@/models/Image';

export async function uploadImageToCloudinary(filePath: string) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'diagnosis-images',
  });
  return { publicId: result.public_id, url: result.secure_url };
}

export async function saveImageToDB(publicId: string, url: string) {
  await connectDB();
  const image = new ImageModel({ publicId, url });
  await image.save();
  return image;
}

export async function getImageById(id: string) {
  await connectDB();
  return await ImageModel.findById(id);
}
