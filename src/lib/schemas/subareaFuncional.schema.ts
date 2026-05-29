import { ESTATUS } from '$lib/types/common.types';
import { z } from 'zod';
import { areaFuncionalRefSchema } from './areaFuncional.schema';


// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const subareaFuncionalRefSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido")
});

export type SubareaFuncionalRef = z.infer<typeof subareaFuncionalRefSchema>


// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const subareaFuncionalFormSchema = z.object({
    id: z.uuid().optional(),
    areaFuncionalId: z.uuid("Debes seleccionar un area funcional"),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().default(''),
    status: z.enum(ESTATUS).default('activo')
});

export type SubareaFuncionalForm = z.infer<typeof subareaFuncionalFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const subareaFuncionalItemSchema = z.object({
    id: z.uuid(),
    areaFuncionalId: z.uuid(),
    code: z.string(),
    name: z.string(),
    description: z.string().default(''),
    status: z.enum(ESTATUS),
    areaFuncional: areaFuncionalRefSchema,
    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional(),
});

export type SubareaFuncionalItem = z.infer<typeof subareaFuncionalItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const subareaFuncionalConfigSchema = z.object({
    subareafuncionalItems: z.array(subareaFuncionalItemSchema)
});

export type SubareaFuncionalConfig = z.infer<typeof subareaFuncionalConfigSchema>;
