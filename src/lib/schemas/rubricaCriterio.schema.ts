// rubricaCriterio.schema.ts
import { z } from 'zod';
import { rubricaRefSchema } from './shared.schema';

// ============================================
// 1. REFERENCE SCHEMA
// ============================================

// ============================================
// 2. FORM SCHEMA
// ============================================
export const rubricaCriterioFormSchema = z.object({
	id: z.uuid().optional(),
	rubricaCode: z.string().optional(),
	code: z
		.string()
		.min(1, 'El código es requerido')
		.max(255)
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Formato de código inválido'),
	criterio: z
		.string()
		.min(1, 'El criterio es requerido')
		.max(500, 'El criterio no puede exceder 500 caracteres'),
	order: z.coerce.number().int().min(1).default(1),
	createdBy: z.string().min(1, 'El creador es requerido')
});

export type RubricaCriterioForm = z.infer<typeof rubricaCriterioFormSchema>;

// ============================================
// 3. ITEM SCHEMA
// ============================================
export const rubricaCriterioItemSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	rubrica: rubricaRefSchema,
	criterio: z.string(),
	order: z.number().int(),
	version: z.number().int().nonnegative(),
	isCurrent: z.boolean(),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean(),
	createdAt: z.coerce.date(),
	createdBy: z.string()
});

export type RubricaCriterioItem = z.infer<typeof rubricaCriterioItemSchema>;


/* Caso especial para eliminar el criterio de una rubrica */
export const removerRubricaCriterioItemSchema = z.object({
	id: z.uuid(),
	criterioId: z.uuid()
});

export type RemoverRubricaCriterioItem = z.infer<typeof removerRubricaCriterioItemSchema>;
