// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from '@/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  connectDB();
  res.status(200).json({ success: true, message: 'hello' });
}
