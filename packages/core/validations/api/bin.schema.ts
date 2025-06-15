import { z } from 'zod';

export class BinAPISchema {
    static Create = z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        language: z.string().min(1),
        description: z.string().optional(),
        isPrivate: z.boolean().default(false),
        password: z.string().optional(),
    })

    static Update = this.Create.partial().extend({
        binId: z.string().min(1),
    })

    static Delete = z.object({
        binId: z.string().min(1),
    })

    static Unlock = z.object({
        binId: z.string().min(1),
        password: z.string().min(1),
      })
}

export type CreateBinFormSchema = z.infer<typeof BinAPISchema.Create>
export type UpdateBinFormSchema = z.infer<typeof BinAPISchema.Update>
export type DeleteBinFormSchema = z.infer<typeof BinAPISchema.Delete>
export type UnlockBinFormSchema = z.infer<typeof BinAPISchema.Unlock>