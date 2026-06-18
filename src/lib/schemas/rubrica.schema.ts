import { z } from 'zod';
import { indicadorRefSchema } from './indicador.schema';

// ============================================
// 1. REFERENCE SCHEMA (Para relaciones)
// ============================================
export const rubricaRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	rangeStart: z.number().int(),
	rangeEnd: z.number().int(),
	order: z.number().int()
});

export type RubricaRef = z.infer<typeof rubricaRefSchema>;

export const rubricaCriterioItemSchema = z.object({
	id: z.uuid(),
    rubricaCode: z.string(),
	descripcion: z.string()
});

export type RubricaCriterioItem = z.infer<typeof rubricaCriterioItemSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const rubricaFormSchema = z
	.object({
		id: z.uuid().optional(),
		indicadorId: z.uuid().optional(),
		code: z
			.string()
			.min(1, 'El código es requerido')
			.max(255, 'El código no puede exceder 255 caracteres')
			.regex(
				/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
				'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
			),
		rangeStart: z.coerce
			.number()
			.int()
			.nonnegative('El inicio del rango debe ser mayor o igual a 0'),
		rangeEnd: z.coerce.number().int().nonnegative('El fin del rango debe ser mayor o igual a 0'),
		order: z.coerce.number().int().nonnegative().default(0),
		criterios: z.array(rubricaCriterioItemSchema).default([]),
		createdBy: z.string().min(1, 'El creador es requerido')
	})
	.refine((data) => data.rangeStart <= data.rangeEnd, {
		message: 'El inicio del rango debe ser menor o igual al fin del rango',
		path: ['rangeEnd']
	});

export type RubricaForm = z.infer<typeof rubricaFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps
// ============================================

export const rubricaItemSchema = z.object({
	id: z.uuid(),
	indicador: indicadorRefSchema,
	code: z.string(),
	rangeStart: z.number().int(),
	rangeEnd: z.number().int(),
	order: z.number().int(),
	criterios: z.array(rubricaCriterioItemSchema).default([]),
	version: z.number().int().nonnegative(),
	isCurrent: z.boolean(),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean(),
	createdAt: z.coerce.date(),
	createdBy: z.string()
});

export type RubricaItem = z.infer<typeof rubricaItemSchema>;

// ============================================
// 6. CONFIG SCHEMA (Para configuraciones completas)
// ============================================

export const rubricaConfigSchema = z.object({
	rubricaItems: z.array(rubricaItemSchema)
});

export type RubricaConfig = z.infer<typeof rubricaConfigSchema>;
