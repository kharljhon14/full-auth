import { z } from 'zod';

export const ResetSchema = z.object({
  email: z.string().email('Email is required'),
});

export type ResetSchemaType = z.infer<typeof ResetSchema>;
