import { z } from 'zod';
import { indicadorRefSchema } from './indicador.schema';

// ============================================
// 1. REFERENCE SCHEMA (Para relaciones)
// ============================================
export const indicadorIndicadorEstrategicoRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});

export type IndicadorIndicadorEstrategicoRef = z.infer<typeof indicadorIndicadorEstrategicoRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const indicadorIndicadorEstrategicoFormSchema = z.object({
	id: z.uuid().optional(),
	code: z
		.string()
		.min(1, 'El código es requerido')
		.max(255, 'El código no puede exceder 255 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
		),
	indicadorEstrategicoCode: z.string(),
	createdBy: z.string().min(1, 'El creador es requerido')
});

export type IndicadorIndicadorEstrategicoFormSchema = z.infer<typeof indicadorIndicadorEstrategicoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps
// ============================================

export const indicadorIndicadorEstrategicoItemSchema = z.object({
	id: z.uuid(),
	indicador: indicadorRefSchema,
	code: z.string(),
	indicadorEstrategico: indicadorIndicadorEstrategicoRefSchema,
	version: z.number().int().nonnegative(),
	isCurrent: z.boolean(),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean(),
	createdAt: z.coerce.date(),
	createdBy: z.string()
});

export type IndicadorIndicadorEstrategicoItem = z.infer<typeof indicadorIndicadorEstrategicoItemSchema>;
