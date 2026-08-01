import { z } from 'zod';
import { modeloItemSchema } from './modelo.schema';
import { institucionItemSchema } from './institucion.schema';
import { institucionRefSchema, modeloRefSchema } from './shared.schema';

export const EvaluacionStatusEnum = z.enum([
	'planning', /* entre creada y hasta agregar la penultima fecha */
	'ready', /* desde agregar la ultima fecha hasta presionar execute */
	'running', /* desde presionar execute hasta que acaba la ultima etapa (tiempo o terminar etapa) */
	'completed' /* desde que acaba la ultima etapa (por tiempo o terminar etapa) */
]);

export type EvaluacionStatus = z.infer<typeof EvaluacionStatusEnum>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const evaluacionFormSchema = z.object({
	id: z.uuid().optional(),
	code: z
		.string()
		.min(3, 'Code debe tener al menos 3 caracteres')
		.max(100, 'Code no puede exceder 100 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
		),
	modeloCode: z
		.string()
		.min(3, 'Code debe tener al menos 3 caracteres')
		.max(100, 'Code no puede exceder 100 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
		),
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
	modelo: modeloRefSchema,

	institucionId: z.uuid(),
	institucion: institucionRefSchema,

	name: z.string(),
	year: z.number(),
	cycle: z.number(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional().nullable(),

	status: EvaluacionStatusEnum.default('planning'),
	startedAt: z.coerce.date().optional().nullable(),
	startedBy: z.string().optional().nullable(),
	completedAt: z.coerce.date().optional().nullable(),

	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});
export type EvaluacionItem = z.infer<typeof evaluacionItemSchema>;

// Versión con relaciones completas (incluye etapas)
export const evaluacionWithRelationsItemSchema = evaluacionItemSchema
	.omit({ modeloId: true, institucionId: true })
	.extend({
		modelo: modeloItemSchema.nullable(),
		institucion: institucionItemSchema.nullable()
	});
export type EvaluacionWithRelationsItem = z.infer<typeof evaluacionWithRelationsItemSchema>;

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
