import connectDB from '@/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';

import User from '@/models/user';
import { resetToken } from '@/utils/tokens';
import sendMail from '@/utils/sendMail';
import { resetPasswordEmail } from '@/email-templates/reset';

const { ACTIVATION_TOKEN_SECRET } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Email does not exist' });

    const userId = resetToken({
      id: user._id.toString(),
    });

    const url = `${process.env.NEXTAUTH_URL}/reset/${userId}`;

    await sendMail(email, user.name, url, 'Password reset', resetPasswordEmail);

    res.status(200).json({ message: 'An email has sent to you <3' });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
}
