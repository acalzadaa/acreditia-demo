import { ESTATUS } from '$lib/types/common.types';
import { z } from 'zod';
import { entidadLegalRefSchema } from './entidadLegal.schema';
import { regionRefSchema } from './region.schema';
import { institucionRefSchema } from './institucion.schema';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

export const campusRefSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido")
});

export type CampusRef = z.infer<typeof campusRefSchema>;


// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const campusFormSchema = z.object({
    id: z.uuid().optional(),
    entidadLegalId: z.uuid("Debes seleccionar una entidad legal"),
    regionId: z.uuid("Debes seleccionar una region"),
    institucionId: z.uuid("Debes seleccionar una institucion"),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    status: z.enum(ESTATUS).default('activo')
});

export type CampusForm = z.infer<typeof campusFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const campusItemSchema = z.object({
    id: z.uuid(),
    entidadLegalId: z.uuid("Debes seleccionar una entidad legal"),
    regionId: z.uuid("Debes seleccionar una region"),
    institucionId: z.uuid("Debes seleccionar una institucion"),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    entidadLegal: entidadLegalRefSchema.optional(),
    region: regionRefSchema.optional(),
    institucion: institucionRefSchema.optional(),
    status: z.enum(ESTATUS).default('activo'),
    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional()
});

export type CampusItem = z.infer<typeof campusItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const campusConfigSchema = z.object({
    campusItems: z.array(campusItemSchema)
});

export type CampusConfig = z.infer<typeof campusConfigSchema>;
