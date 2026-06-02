
// ============================================
// 1. REFERENCE SCHEMAS
// ============================================

import z from "zod";

export const regionRefSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, 'El código es requerido'),
    name: z.string().min(1, 'El nombre es requerido')
});

export type RegionRef = z.infer<typeof regionRefSchema>;
