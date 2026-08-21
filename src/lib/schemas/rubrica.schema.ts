// rubrica.schema.ts
import { z } from 'zod';
import { rubricaCriterioItemSchema } from './rubricaCriterio.schema';
import { auditMetadataSchema, baseRefSchema, rubricaCriterioRefSchema } from './shared.schema';

// ============================================
// 1. REFERENCE SCHEMA
// ============================================

// ============================================
// 2. FORM SCHEMA
// ============================================
export const rubricaFormSchema = z
	.object({
		id: z.uuid().optional(),
		indicadorCode: z.string().optional(),
		code: z
			.string()
			.min(1, 'El código es requerido')
			.max(255, 'El código no puede exceder 255 caracteres')
			.regex(
				/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
				'Code solo puede contener letras minúsculas, números y guiones'
			),
		rangeStart: z.coerce
			.number()
			.int()
			.min(1, 'El inicio del rango debe ser al menos 1')
			.max(10, 'El inicio no puede exceder 10'),
		rangeEnd: z.coerce
			.number()
			.int()
			.min(1, 'El fin del rango debe ser al menos 1')
			.max(10, 'El fin no puede exceder 10'),
		order: z.coerce.number().int().min(1).max(5).default(1),
		createdBy: z.string().min(1, 'El creador es requerido')
	})
	.refine((data) => data.rangeStart <= data.rangeEnd, {
		message: 'El inicio del rango debe ser menor o igual al fin del rango',
		path: ['rangeEnd']
	})
	.refine((data) => data.rangeStart >= 1 && data.rangeEnd <= 10, {
		message: 'Los rangos deben estar entre 1 y 10',
		path: ['rangeStart']
	});

export type RubricaForm = z.infer<typeof rubricaFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Con criterios incluidos)
// ============================================
export const rubricaItemSchema = z
	.object({
		indicador: baseRefSchema,
		rangeStart: z.number().int(),
		rangeEnd: z.number().int(),
		order: z.number().int().min(1).max(5),
		criterios: z.array(rubricaCriterioRefSchema)
	})
	.extend(baseRefSchema.shape)
	.extend(auditMetadataSchema.shape);

export type RubricaItem = z.infer<typeof rubricaItemSchema>;

// ============================================
// 4. WITH RELATIONS SCHEMA (Con criterios)
// ============================================
export const rubricaWithRelationsItemSchema = rubricaItemSchema.extend({
	criterios: z.array(rubricaCriterioItemSchema)
});

export type RubricaWithRelationsItem = z.infer<typeof rubricaWithRelationsItemSchema>;

// ============================================
// 5. CONFIG SCHEMA
// ============================================
export const rubricaConfigSchema = z.object({
	rubricaItems: z.array(rubricaWithRelationsItemSchema)
});

export type RubricaConfig = z.infer<typeof rubricaConfigSchema>;
