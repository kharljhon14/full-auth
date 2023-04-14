import { z } from 'zod';

export const ResetSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().min(10, 'Password must be 10 characters').max(100, 'Password must be less than 100 characters'),
});

export type ResetSchemaType = z.infer<typeof ResetSchema>;
