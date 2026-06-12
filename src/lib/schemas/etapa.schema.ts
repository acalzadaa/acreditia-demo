import { z } from 'zod';
import { evaluacionRefSchema } from './shared.schema';

// ============================================
// ENUMS
// ============================================

export const EtapaStatusEnum = z.enum(['draft', 'ready']);
export type EtapaStatus = z.infer<typeof EtapaStatusEnum>;

export const EtapaNumeroEnum = z.enum(['1', '2', '3', '4', '5', '6', '7']);
export type EtapaNumero = z.infer<typeof EtapaNumeroEnum>;

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

export const etapaRefSchema = z.object({
	id: z.uuid(),
	numeroEtapa: z.number(),
	status: EtapaStatusEnum,
	evaluacionId: z.uuid()
});
export type EtapaRef = z.infer<typeof etapaRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const etapaFormSchema = z.object({
	id: z.uuid().optional(),
	evaluacionId: z.uuid('Evaluación requerida'),
	code: z
		.string()
		.min(3, 'Code debe tener al menos 3 caracteres')
		.max(100, 'Code no puede exceder 100 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
		),
	name: z.string(),
	numeroEtapa: z.number().int().min(1).max(7, 'El número de etapa debe estar entre 1 y 7'),
	fechaInicio: z.coerce.date().optional().nullable(),
	fechaFinal: z.coerce.date().optional().nullable(),
	periodoExtraordinario: z.boolean().default(false),
	periodoExtraordinarioInicio: z.coerce.date().optional().nullable(),
	periodoExtraordinarioFinal: z.coerce.date().optional().nullable(),
	status: EtapaStatusEnum.default('draft'),
	createdBy: z.string().optional().default(''),
	updatedBy: z.string().optional().default('')
});

export type EtapaForm = z.infer<typeof etapaFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps
// ============================================

export const etapaItemSchema = z.object({
	id: z.uuid(),
	evaluacionId: z.uuid(),
	code: z.string(),
	name: z.string(),
	numeroEtapa: z.number(),
	fechaInicio: z.coerce.date().optional().nullable(),
	fechaFinal: z.coerce.date().optional().nullable(),
	periodoExtraordinario: z.boolean().default(false),
	periodoExtraordinarioInicio: z.coerce.date().optional().nullable(),
	periodoExtraordinarioFinal: z.coerce.date().optional().nullable(),
	status: EtapaStatusEnum,
	createdAt: z.iso.datetime().optional(),
	updatedAt: z.iso.datetime().optional(),
	createdBy: z.string().optional().nullable(),
	updatedBy: z.string().optional().nullable(),
	isDeleted: z.boolean().default(false)
});

export type EtapaItem = z.infer<typeof etapaItemSchema>;

// ============================================
// 4. ITEM WITH RELATIONS SCHEMA (Servidor → Cliente)
// Datos completos incluyendo relaciones anidadas
// ============================================

export const etapaWithRelationsItemSchema = etapaItemSchema.omit({ evaluacionId: true }).extend({
	evaluacion: evaluacionRefSchema
});

export type EtapaWithRelationsItem = z.infer<typeof etapaWithRelationsItemSchema>;

// ============================================
// 5. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const etapasConfigSchema = z.object({
	etapasItems: z.array(etapaWithRelationsItemSchema)
});

export type EtapasConfig = z.infer<typeof etapasConfigSchema>;
