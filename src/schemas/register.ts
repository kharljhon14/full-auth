import { z } from 'zod';

export const RegisterSchema = z.object({
  first_name: z
    .string()
    .min(2, 'First name must be atleast 2 characters')
    .max(32, 'Must be less tha 32 characters')
    .regex(new RegExp('[a-zA-z]+$'), 'No Special characters allowed'),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
