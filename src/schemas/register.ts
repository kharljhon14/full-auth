import { z } from 'zod';
import validator from 'validator';

export const RegisterSchema = z
  .object({
    first_name: z
      .string()
      .min(2, 'First name must be atleast 2 characters')
      .max(32, 'Must be less tha 32 characters')
      .regex(new RegExp('[a-zA-z]+$'), 'No Special characters allowed'),
    last_name: z
      .string()
      .min(2, 'Last name must be atleast 2 characters')
      .max(32, 'Must be less tha 32 characters')
      .regex(new RegExp('[a-zA-z]+$'), 'No Special characters allowed'),
    email: z.string().email('Please enter valid email address'),
    phone: z.string().refine(validator.isMobilePhone, { message: 'Please enter a valid phone number' }),
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

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
