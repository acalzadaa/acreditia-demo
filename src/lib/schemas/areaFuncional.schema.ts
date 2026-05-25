import { ESTATUS } from '$lib/types/common.types';
import { z } from 'zod';


// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const areaFuncionalRefSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido")
});

export type AreaFuncionalRefSchema = z.infer<typeof areaFuncionalRefSchema>

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const areaFuncionalFormSchema = z.object({
    id: z.uuid().optional(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().default(''),
    status: z.enum(ESTATUS).default('activo')
});

export type AreaFuncionalForm = z.infer<typeof areaFuncionalFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const areaFuncionalItemSchema = z.object({
    id: z.uuid(),
    code: z.string(),
    name: z.string(),
    description: z.string().default(''),
    status: z.enum(ESTATUS),
    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional(),
});

export type AreaFuncionalItem = z.infer<typeof areaFuncionalItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const areaFuncionalConfigSchema = z.object({
    areafuncionalItems: z.array(areaFuncionalItemSchema)
});

export type AreaFuncionalConfig = z.infer<typeof areaFuncionalConfigSchema>;
