import { z } from 'zod';

export const JOB_TYPE = ['funcional', 'responsable'] as const;
export const ESTATUS = ['activo', 'inactivo', 'borrado'] as const;

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const puestoRefSchema = z.object({
    id: z.uuid(),
    code: z.string(),
    name: z.string(),
});
export type PuestoRefSchema = z.infer<typeof puestoRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const puestoFormSchema = z.object({
    id: z.uuid().optional(),
    code: z.string()
        .min(1, "El código debe tener al menos 1 caracter")
        .max(50, "El código debe tener máximo 50 caracteres"),
    name: z.string()
        .min(1, "El nombre es obligatorio")
        .max(255, "El nombre debe tener máximo 255 caracteres"),
    type: z.enum(JOB_TYPE).default('funcional'),
    description: z.string().default(''),
});
export type PuestoForm = z.infer<typeof puestoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const puestoItemSchema = puestoFormSchema.extend({
    id: z.uuid(),
    version: z.number().default(0),
    isCurrent: z.boolean().default(false),
    validFrom: z.date().optional(),
    validTo: z.date().optional(),
    isDeleted: z.boolean().default(false),
    createdAt: z.iso.datetime().optional(),
});
export type PuestoItem = z.infer<typeof puestoItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const puestoConfigSchema = z.object({
    puestoItems: z.array(puestoItemSchema),
});
export type PuestoConfig = z.infer<typeof puestoConfigSchema>;