import User from '@/models/user';
import { RegisterSchemaType } from '@/schemas/register';
import connectDB from '@/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    const { first_name, last_name, phone, email, password }: RegisterSchemaType = req.body;

    if (!first_name || !last_name || !phone || !email || !password)
      return res.status(400).json({ message: 'Please fill in all fields' });

    if (!validator.isEmail(email)) return res.status(400).json({ message: 'Please add a valid email' });
    if (!validator.isMobilePhone(phone)) return res.status(400).json({ message: 'Please add a valid phone number' });

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: 'Email is already exists' });
    if (password.length < 10) return res.status(400).json({ message: 'Password must be atleast 10 characters' });

    const cryptedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: `${first_name} ${last_name}`,
      password: cryptedPassword,
      email,
      phone,
    });

    await newUser.save();

    res.status(200).json({ message: 'Register success! Please activate your account' });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
}
