import { z } from 'zod';

export class UserFormSchema {
    static Update = z.object({
        username: z.string()
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be at most 20 characters'),

        avatarUrl: z.string()
            .url('Invalid avatar URL')
            .optional()
            .or(z.literal('')).transform((val) => val === '' ? undefined : val),
      })
}

export type UpdateUserFormSchema = z.infer<typeof UserFormSchema.Update>