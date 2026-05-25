import { z } from 'zod';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const filosofiaInstitucionalRefSchema = z.object({
    id: z.uuid(),
    code: z.string(),
    name: z.string(),
});
export type FilosofiaInstitucionalRefSchema = z.infer<typeof filosofiaInstitucionalRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const filosofiaInstitucionalFormSchema = z.object({
    id: z.uuid().optional(),
    code: z.string()
        .min(1, "El código debe tener al menos 1 caracter")
        .max(50, "El código debe tener máximo 50 caracteres"),
    name: z.string()
        .min(1, "El nombre es obligatorio")
        .max(255, "El nombre debe tener máximo 255 caracteres"),
    description: z.string().default(''),
    createdBy: z.string().optional()
});
export type FilosofiaInstitucionalForm = z.infer<typeof filosofiaInstitucionalFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const filosofiaInstitucionalItemSchema = filosofiaInstitucionalFormSchema.extend({
    id: z.uuid(),
    version: z.number().default(0),
    isCurrent: z.boolean().default(false),
    validFrom: z.date().optional(),
    validTo: z.date().optional(),
    isDeleted: z.boolean().default(false),
    createdAt: z.iso.datetime().optional(),
    createdBy: z.string()
});
export type FilosofiaInstitucionalItem = z.infer<typeof filosofiaInstitucionalItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const filosofiaInstitucionalConfigSchema = z.object({
    filosofiaInstitucionalItems: z.array(filosofiaInstitucionalItemSchema),
});
export type FilosofiaInstitucionalConfig = z.infer<typeof filosofiaInstitucionalConfigSchema>;