// pages/api/get-image.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getImageById } from '@/lib/imageService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).end('Invalid ID');

  try {
    const image = await getImageById(id);
    if (!image) return res.status(404).end('Image not found');

    // Now you can pass `image.url` to your model for prediction
    // e.g. const prediction = await model.predictFromUrl(image.url)

    res.status(200).json({ image });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching image', error: err });
  }
}
