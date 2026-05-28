import { ESTATUS } from '$lib/types/common.types';
import { z } from 'zod';


// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const areaResponsableRefSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido")
});

export type AreaResponsableRef = z.infer<typeof areaResponsableRefSchema>

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const areaResponsableFormSchema = z.object({
    id: z.uuid().optional(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().default(''),
    status: z.enum(ESTATUS).default('activo')
});

export type AreaResponsableForm = z.infer<typeof areaResponsableFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const areaResponsableItemSchema = z.object({
    id: z.uuid(),
    code: z.string(),
    name: z.string(),
    description: z.string().default(''),
    status: z.enum(ESTATUS),
    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional(),
});

export type AreaResponsableItem = z.infer<typeof areaResponsableItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const areaResponsableConfigSchema = z.object({
    arearesponsableItems: z.array(areaResponsableItemSchema)
});

export type AreaResponsableConfig = z.infer<typeof areaResponsableConfigSchema>;
