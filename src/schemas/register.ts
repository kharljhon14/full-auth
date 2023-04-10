import { z } from 'zod';
import validator from 'validator';

export const RegisterSchema = z.object({
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
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
