import z from "zod";

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

export const versionRefSchema = z.object({
    id: z.string().min(1, "El ID de versión es requerido"),
    versionNumber: z.number().int().positive(),
    filename: z.string().min(1, "El nombre del archivo es requerido"),
    isActive: z.boolean()
});

export type VersionRef = z.infer<typeof versionRefSchema>;

export const userRefSchema = z.object({
    id: z.uuid().optional(),
    username: z.string().optional()
});

export type UserRef = z.infer<typeof userRefSchema>;
