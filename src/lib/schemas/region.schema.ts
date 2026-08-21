import { z } from 'zod';
import { auditMetadataSchema, baseRefSchema, usuarioRefSchema } from './shared.schema';

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
export const regionItemSchema = z
	.object({
		usuario: usuarioRefSchema,
		description: z.string().default(''),
		totalCampus: z.number().min(0).default(0)
	})
	.extend(baseRefSchema.shape)
	.extend(auditMetadataSchema.shape);

export type RegionItem = z.infer<typeof regionItemSchema>;
