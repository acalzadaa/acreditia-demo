import { z } from 'zod';
import { usuarioRefSchema } from './shared.schema';

// ============================================
// 1. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const regionFormSchema = z.object({
	id: z.uuid().optional(),
	code: z
		.string()
		.min(3, 'El código es requerido')
		.max(50, 'El código no puede tener más de 50 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Formato de slug inválido. Use solo letras minúsculas, números y guiones simples entre palabras'
		)
		.transform((val) => val.toLowerCase()),
	name: z
		.string()
		.min(1, 'El nombre es obligatorio')
		.max(255, 'El nombre debe tener máximo 255 caracteres'),
	description: z.string().default(''),
	createdBy: z.string().optional()
});

export type RegionForm = z.infer<typeof regionFormSchema>;

// ============================================
// 2. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const regionItemSchema = z.object({
	id: z.uuid(),
	usuario: usuarioRefSchema,
	code: z.string(),
	name: z.string(),
	description: z.string().default(''),
	version: z.number().int().nonnegative().default(0),
	isCurrent: z.boolean().default(true),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().nullable().optional(),
	createdBy: z.string()
});

export type RegionItem = z.infer<typeof regionItemSchema>;

