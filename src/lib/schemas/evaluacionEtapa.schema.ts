import { z } from 'zod';
import { evaluacionRefSchema } from './shared.schema';
import { evaluacionItemSchema } from './evaluacion.schema';
import { etapaRefSchema } from './etapa.schema';

// ============================================
// ENUMS
// ============================================

export const evaluacionEtapaPlaneacionStatusEnum = z.enum(['planning', 'ready']);
export type EvaluacionEtapaPlaneacionStatus = z.infer<typeof evaluacionEtapaPlaneacionStatusEnum>;

export const evaluacionEtapaEjecucionStatusEnum = z.enum(['pendiente', 'activo', 'finalizado']);
export type EvaluacionEtapaEjecucionStatus = z.infer<typeof evaluacionEtapaEjecucionStatusEnum>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const etapaFormSchema = z.object({
	id: z.uuid().optional(),
	code: z
		.string()
		.min(3, 'Code debe tener al menos 3 caracteres')
		.max(100, 'Code no puede exceder 100 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
		),
	fechaInicio: z.coerce.date().optional().nullable(),
	fechaFinal: z.coerce.date().optional().nullable(),
	periodoExtraordinario: z.boolean().default(false),
	periodoExtraordinarioInicio: z.coerce.date().optional().nullable(),
	periodoExtraordinarioFinal: z.coerce.date().optional().nullable(),
	createdBy: z.string().optional().default(''),
	updatedBy: z.string().optional().default('')
});

export type EtapaForm = z.infer<typeof etapaFormSchema>;

export const etapaDateItemSchema = z.object({
	etapa: z.number(),
	dateEnum: z.enum([
		'StartDate',
		'EndDate',
		'StartExtraordinaryPeriodDate',
		'EndExtraordinaryPeriodDate'
	])
});

export type EtapaDateItem = z.infer<typeof etapaDateItemSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps
// ============================================

export const evaluacionEtapaItemSchema = z.object({
	id: z.uuid(),
	evaluacionId: z.uuid(),
	evaluacion: evaluacionRefSchema,
	etapa: etapaRefSchema,
	periodoExtraordinario: z.boolean().default(false),
	fechaInicio: z.coerce.date().optional().nullable(),
	fechaFinal: z.coerce.date().optional().nullable(),
	periodoExtraordinarioInicio: z.coerce.date().optional().nullable(),
	periodoExtraordinarioFinal: z.coerce.date().optional().nullable(),
	status: evaluacionEtapaPlaneacionStatusEnum,
	createdAt: z.iso.datetime().optional(),
	updatedAt: z.iso.datetime().optional(),
	createdBy: z.string().optional().nullable(),
	updatedBy: z.string().optional().nullable(),
	isDeleted: z.boolean().default(false)
});

export type EvaluacionEtapaItem = z.infer<typeof evaluacionEtapaItemSchema>;

// ============================================
// 4. ITEM WITH RELATIONS SCHEMA (Servidor → Cliente)
// Datos completos incluyendo relaciones anidadas
// ============================================

export const evaluacionEtapaWithRelationsItemSchema = evaluacionEtapaItemSchema
	.omit({ evaluacionId: true })
	.extend({
		evaluacion: evaluacionItemSchema
	});

export type EvaluacionEtapaWithRelationsItem = z.infer<
	typeof evaluacionEtapaWithRelationsItemSchema
>;

// ============================================
// 5. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const etapasConfigSchema = z.object({
	etapasItems: z.array(evaluacionEtapaWithRelationsItemSchema)
});

export type EtapasConfig = z.infer<typeof etapasConfigSchema>;
