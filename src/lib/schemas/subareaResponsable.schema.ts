import { ESTATUS } from '$lib/types/common.types';
import { z } from 'zod';
import { areaResponsableRefSchema } from './areaResponsable.schema';


// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const subareaResponsableRefSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido")
});

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const subareaResponsableFormSchema = z.object({
    id: z.uuid().optional(),
    areaResponsableId: z.uuid("Debes seleccionar una area responsable"),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().default(''),
    status: z.enum(ESTATUS).default('activo')
});

export type SubareaResponsableForm = z.infer<typeof subareaResponsableFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const subareaResponsableItemSchema = z.object({
    id: z.uuid(),
    areaResponsableId: z.uuid(),
    code: z.string(),
    name: z.string(),
    description: z.string().default(''),
    status: z.enum(ESTATUS),
    areaResponsable: areaResponsableRefSchema,
    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional(),
});

export type SubareaResponsableItem = z.infer<typeof subareaResponsableItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const subareaResponsableConfigSchema = z.object({
    subarearesponsableItems: z.array(subareaResponsableItemSchema)
});

export type SubareaResponsableConfig = z.infer<typeof subareaResponsableConfigSchema>;
