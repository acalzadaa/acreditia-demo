import { ESTATUS } from '$lib/types/common.types';
import { z } from 'zod';
import { entidadLegalRefSchema } from './entidadLegal.schema';
import { regionRefSchema } from './region.schema';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

export const institucionRefSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido")
});

export type InstitucionRef = z.infer<typeof institucionRefSchema>;


// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const institucionFormSchema = z.object({
    id: z.uuid().optional(),
    entidadLegalId: z.uuid("Debes seleccionar una entidad legal"),
    regionId: z.uuid("Debes seleccionar una region"),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    status: z.enum(ESTATUS).default('activo')
});

export type InstitucionForm = z.infer<typeof institucionFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const institucionItemSchema = z.object({
    id: z.uuid(),
    entidadLegalId: z.uuid("Debes seleccionar una entidad legal"),
    regionId: z.uuid("Debes seleccionar una region"),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    entidadLegal: entidadLegalRefSchema.optional(),
    region: regionRefSchema.optional(),
    status: z.enum(ESTATUS).default('activo'),
    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional()
});

export type InstitucionItem = z.infer<typeof institucionItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const institucionConfigSchema = z.object({
    institucionItems: z.array(institucionItemSchema)
});

export type InstitucionConfig = z.infer<typeof institucionConfigSchema>;
