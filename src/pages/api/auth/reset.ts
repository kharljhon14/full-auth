import connectDB from '@/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User from '@/models/user';
import { UserToken } from '@/types/user-token';
import bcrypt from 'bcryptjs';

const { RESET_TOKEN_SECRET } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    const { token, password } = req.body;
    const userToken = jwt.verify(token, RESET_TOKEN_SECRET!) as UserToken;
    const userDB = await User.findById(userToken.id);

    if (!userDB) return res.status(400).json({ message: 'This account no longer exists' });

    const cryptedPassword = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(userDB.id, { password: cryptedPassword });

    res.status(200).json({ message: 'Your password has been updated' });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
}
