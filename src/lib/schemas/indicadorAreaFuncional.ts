import { z } from 'zod';
import { indicadorRefSchema } from './indicador.schema';
import { areaFuncionalRefSchema } from './shared.schema';

// ============================================
// 1. REFERENCE SCHEMA (Para relaciones)
// ============================================
export const indicadorAreaFuncionalRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});

export type IndicadorAreaFuncionalRef = z.infer<typeof indicadorAreaFuncionalRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const indicadorAreaFuncionalFormSchema = z.object({
	id: z.uuid().optional(),
	code: z
		.string()
		.min(1, 'El código es requerido')
		.max(255, 'El código no puede exceder 255 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
		),
	areaFuncionalCode: z.string(),
	createdBy: z.string().min(1, 'El creador es requerido')
});

export type IndicadorAreaFuncionalFormSchema = z.infer<typeof indicadorAreaFuncionalFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps
// ============================================

export const indicadorAreaFuncionalItemSchema = z.object({
	id: z.uuid(),
	indicador: indicadorRefSchema,
	code: z.string(),
	areaFuncional: areaFuncionalRefSchema,
	subareasFuncionales: z.array(indicadorAreaFuncionalRefSchema).default([]),
	version: z.number().int().nonnegative(),
	isCurrent: z.boolean(),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean(),
	createdAt: z.coerce.date(),
	createdBy: z.string()
});

export type IndicadorAreaFuncionalItem = z.infer<typeof indicadorAreaFuncionalItemSchema>;
