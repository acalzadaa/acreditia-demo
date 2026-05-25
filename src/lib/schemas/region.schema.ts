import { ESTATUS } from '$lib/types/common.types';
import { z } from 'zod';


// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

export const regionRefSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido")
});

export type RegionRef = z.infer<typeof regionRefSchema>;


// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const regionFormSchema = z.object({
    id: z.uuid().optional(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido")
});

export type RegionForm = z.infer<typeof regionFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const regionItemSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    status: z.enum(ESTATUS).default('activo'),
    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional()
});

export type RegionItem = z.infer<typeof regionItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const regionConfigSchema = z.object({
    regionItems: z.array(regionItemSchema)
});

export type RegionConfig = z.infer<typeof regionConfigSchema>;
