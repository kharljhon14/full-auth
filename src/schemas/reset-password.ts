import { z } from 'zod';
import validator from 'validator';

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(10, 'Password must be 10 characters')
      .max(100, 'Password must be less than 100 characters'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match",
    path: ['confirm_password'],
  });

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
