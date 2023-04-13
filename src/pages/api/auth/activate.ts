import connectDB from '@/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User from '@/models/user';
import { UserToken } from '@/types/user-token';

const { ACTIVATION_TOKEN_SECRET } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    const { token } = req.body;
    const userToken = jwt.verify(token, ACTIVATION_TOKEN_SECRET!) as UserToken;

    const userDB = await User.findById(userToken.id);

    if (userDB.emailVerified === true) res.status(400).json({ message: 'Account already activated' });

    await User.findByIdAndUpdate(userDB.id, { emailVerified: true });

    res.status(200).json({ message: 'Account successfully activated' });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
}
