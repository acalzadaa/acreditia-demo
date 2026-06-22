import z from "zod";


export const etapaItemSchema = z.object({
    order: z.number(),
    code: z.string(),
    name: z.string(),
});

export type EtapaItem = z.infer<typeof etapaItemSchema>;