import z from "zod";


export const etapaRefSchema = z.object({
    order: z.number(),
    code: z.string(),
    name: z.string(),
});

export type EtapaRef = z.infer<typeof etapaRefSchema>;