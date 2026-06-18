import { z } from 'zod';
import { indicadorRefSchema } from './indicador.schema';
import { areaResponsableRefSchema, unidadAcademicaRefSchema } from './shared.schema';

// ============================================
// 1. REFERENCE SCHEMA (Para relaciones)
// ============================================
export const indicadorAreaResponsableRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});

export type IndicadorAreaResponsableRef = z.infer<typeof indicadorAreaResponsableRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const indicadorAreaResponsableFormSchema = z.object({
	id: z.uuid().optional(),
	indicadorCode: z.string().optional(),
	code: z
		.string()
		.min(1, 'El código es requerido')
		.max(255, 'El código no puede exceder 255 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
		),

	unidadesAcademicas: z.array(unidadAcademicaRefSchema).default([]),
	createdBy: z.string().min(1, 'El creador es requerido')
});

export type IndicadorAreaResponsableForm = z.infer<typeof indicadorAreaResponsableFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps
// ============================================

export const indicadorAreaResponsableItemSchema = z.object({
	id: z.uuid(),
	indicador: indicadorRefSchema,
	code: z.string(),
	areaResponsable: areaResponsableRefSchema,
	unidadesAcademicas: z.array(unidadAcademicaRefSchema).default([]),
	version: z.number().int().nonnegative(),
	isCurrent: z.boolean(),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean(),
	createdAt: z.coerce.date(),
	createdBy: z.string()
});

export type IndicadorAreaResponsableItem = z.infer<typeof indicadorAreaResponsableItemSchema>;
