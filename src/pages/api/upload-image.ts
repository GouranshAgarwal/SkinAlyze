// pages/api/upload-image.ts
import formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { uploadImageToCloudinary, saveImageToDB } from '@/lib/imageService';

export const config = {
  api: { bodyParser: false },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({ uploadDir: './', keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.image) {
      return res.status(500).json({ message: 'Upload failed' });
    }

    const file = Array.isArray(files.image) ? files.image[0] : files.image;

    try {
      const { publicId, url } = await uploadImageToCloudinary(file.filepath);
      const image = await saveImageToDB(publicId, url);
      fs.unlinkSync(file.filepath); // clean up temp file
      res.status(200).json({ id: image._id, url });
    } catch (error) {
      res.status(500).json({ message: 'Upload error', error });
    }
  });
}
