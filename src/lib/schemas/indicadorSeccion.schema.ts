import { z } from 'zod';
import { baseRefSchema } from './shared.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const indicadorSeccionFormSchema = z.object({
	id: z.uuid().optional(),
	code: z
		.string()
		.min(1, 'El código es requerido')
		.max(255, 'El código no puede exceder 255 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
		),
	modeloId: z.uuid(),
	capituloId: z.uuid(),
	sectionId: z.uuid(), //referencia a la seccion del sistema de calidad
	createdBy: z.string().min(1, 'El creador es requerido')
});

export type IndicadorSeccionFormSchema = z.infer<typeof indicadorSeccionFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps
// ============================================

export const indicadorSeccionItemSchema = z.object({
	id: z.uuid(),
	indicador: baseRefSchema,
	code: z.string(),
	modelo: baseRefSchema.optional(),
	capitulo: baseRefSchema.optional(),
	seccion: baseRefSchema.optional(),
	version: z.number().int().nonnegative(),
	isCurrent: z.boolean(),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean(),
	createdAt: z.coerce.date(),
	createdBy: z.string()
});

export type IndicadorSeccionItem = z.infer<typeof indicadorSeccionItemSchema>;
