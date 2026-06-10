import { z } from 'zod';
import { modeloItemSchema } from './modelo.schema';
import { institucionItemSchema } from './institucion.schema';
import { institucionRefSchema, modeloRefSchema } from './shared.schema';

export const EvaluacionStatusEnum = z.enum([
    'planned',
    'active',
    'completed',
    'cancelled'
]);

export type EvaluacionStatus = z.infer<typeof EvaluacionStatusEnum>;

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

export const evaluacionRefSchema = z.object({
    id: z.uuid(),
    code: z.string(),
    name: z.string()
});
export type EvaluacionRef = z.infer<typeof evaluacionRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const evaluacionFormSchema = z.object({
    id: z.uuid().optional(),
    code: z.string().min(1, 'Código requerido').max(255),
    modeloId: z.uuid('Modelo de calidad requerido'),
    institucionId: z.uuid('Institución requerida'),
    name: z.string().min(1, 'Nombre requerido').max(255),
    year: z.number().int().min(2000).max(2100),
    cycle: z.number().int().min(1).max(99),
    createdBy: z.string().default('')
});
export type EvaluacionForm = z.infer<typeof evaluacionFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps
// ============================================

export const evaluacionItemSchema = z.object({
    id: z.uuid(),
    code: z.string(),
    modeloId: z.uuid(),
    institucionId: z.uuid(),
    name: z.string(),
    year: z.number(),
    cycle: z.number(),
    version: z.number().default(0),
    isCurrent: z.boolean().default(false),
    validFrom: z.coerce.date().optional(),
    validTo: z.coerce.date().optional().nullable(),

    status: EvaluacionStatusEnum.default('planned'),
    startedAt: z.coerce.date().optional().nullable(),
    startedBy: z.string().optional().nullable(),
    completedAt: z.coerce.date().optional().nullable(),

    isDeleted: z.boolean().default(false),
    createdAt: z.iso.datetime().optional(),
    createdBy: z.string()
});
export type EvaluacionItem = z.infer<typeof evaluacionItemSchema>;

// ============================================
// 4. ITEM WITH RELATIONS SCHEMA (Servidor → Cliente)
// Datos completos incluyendo relaciones anidadas
// ============================================

export const evaluacionWithRelationsItemSchema = evaluacionItemSchema
    .omit({ modeloId: true, institucionId: true })
    .extend({
        modelo: modeloRefSchema,
        institucion: institucionRefSchema
    });
export type EvaluacionWithRelationsItem = z.infer<typeof evaluacionWithRelationsItemSchema>;

// Versión con relaciones completas (si necesitas más datos)
export const evaluacionWithFullRelationsItemSchema = evaluacionItemSchema
    .omit({ modeloId: true, institucionId: true })
    .extend({
        modelo: modeloItemSchema.nullable(),
        institucion: institucionItemSchema.nullable()
    });
export type EvaluacionWithFullRelationsItem = z.infer<typeof evaluacionWithFullRelationsItemSchema>;

// ============================================
// 5. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const evaluacionConfigSchema = z.object({
    evaluacionItems: z.array(evaluacionWithRelationsItemSchema)
});
export type EvaluacionConfig = z.infer<typeof evaluacionConfigSchema>;

// ============================================
// 6. SINGLE RESPONSE SCHEMA (para endpoints que devuelven una evaluación)
// ============================================

export const evaluacionResponseSchema = z.object({
    evaluacionItem: evaluacionWithRelationsItemSchema
});
export type EvaluacionResponse = z.infer<typeof evaluacionResponseSchema>;