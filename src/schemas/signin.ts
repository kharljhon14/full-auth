import { z } from 'zod';

export const SigninSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().min(10, 'Password must be 10 characters').max(100, 'Password must be less than 100 characters'),
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;
