import { ESTATUS } from '$lib/types/common.types';
import { z } from 'zod';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const entidadLegalRefSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido")
});

export type EntidadLegalRef = z.infer<typeof entidadLegalRefSchema>;


// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const entidadLegalFormSchema = z.object({
    id: z.uuid().optional(), // optional para crear, presente para actualizar
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    status: z.enum(ESTATUS).default('activo')
});

export type EntidadLegalForm = z.infer<typeof entidadLegalFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const entidadLegalItemSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    status: z.enum(ESTATUS).default('activo'),
    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional()
});

export type EntidadLegalItem = z.infer<typeof entidadLegalItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const entidadLegalConfigSchema = z.object({
    entidadLegalItems: z.array(entidadLegalItemSchema)
});

export type EntidadLegalConfig = z.infer<typeof entidadLegalConfigSchema>;
