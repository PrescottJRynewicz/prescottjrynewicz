import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imageUrl } = req.query;

  if (!imageUrl) {
    throw new Error('no image to find');
  }

  const result = await fetch(imageUrl as string);
  const imageBuffer = Buffer.from(await result.arrayBuffer());
  const imageBase64 = imageBuffer.toString('base64');
  const imageDataUrl = `data:image/png;base64,${imageBase64}`;

  res.status(200).send(imageDataUrl);
}
