import { ESTATUS } from '$lib/types/common.types';
import { z } from 'zod';
import { entidadLegalRefSchema } from './entidadLegal.schema';
import { regionRefSchema } from './region.schema';
import { institucionRefSchema } from './institucion.schema';
import { campusRefSchema } from './campus.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const unidadAcademicaFormSchema = z.object({
    id: z.uuid().optional(),
    entidadLegalId: z.uuid("Debes seleccionar una entidad legal"),
    regionId: z.uuid("Debes seleccionar una region"),
    institucionId: z.uuid("Debes seleccionar una institucion"),
    campusId: z.uuid("Debes seleccionar un campus"),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    status: z.enum(ESTATUS).default('activo')
});

export type UnidadAcademicaForm = z.infer<typeof unidadAcademicaFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const unidadacademicaItemSchema = z.object({
    id: z.uuid(),
    entidadLegalId: z.uuid("Debes seleccionar una entidad legal"),
    regionId: z.uuid("Debes seleccionar una region"),
    institucionId: z.uuid("Debes seleccionar una institucion"),
    campusId: z.uuid("Debes seleccionar un campus"),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    entidadLegal: entidadLegalRefSchema.optional(),
    region: regionRefSchema.optional(),
    institucion: institucionRefSchema.optional(),
    campus: campusRefSchema.optional(),
    status: z.enum(ESTATUS).default('activo'),
    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional()
});

export type UnidadAcademicaItem = z.infer<typeof unidadacademicaItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const unidadacademicaConfigSchema = z.object({
    unidadacademicaItems: z.array(unidadacademicaItemSchema)
});

export type UnidadAcademicaConfig = z.infer<typeof unidadacademicaConfigSchema>;
