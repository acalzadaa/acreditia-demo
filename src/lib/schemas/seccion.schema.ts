import { z } from 'zod';
import { auditMetadataSchema, baseRefSchema } from './shared.schema';
import { capituloItemSchema } from './capitulo.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const seccionFormSchema = z.object({
	id: z.uuid().optional(),
	capituloCode: z
		.string()
		.min(3, 'Code debe tener al menos 3 caracteres')
		.max(100, 'Code no puede exceder 100 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
		),
	code: z
		.string()
		.min(3, 'Code debe tener al menos 3 caracteres')
		.max(100, 'Code no puede exceder 100 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
		),
	name: z
		.string()
		.min(1, 'El nombre es obligatorio')
		.max(255, 'El nombre debe tener máximo 255 caracteres'),
	description: z.string().default(''),
	content: z.string().default(''),
	order: z.number().int().min(0).default(0),
	createdBy: z.string().optional()
});
export type SeccionForm = z.infer<typeof seccionFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos
// ============================================

export const seccionItemSchema = z
	.object({
		description: z.string(),
		content: z.string(),
		order: z.number(),
		capitulo: baseRefSchema
	})
	.extend(baseRefSchema.shape)
	.extend(auditMetadataSchema.shape);
export type SeccionItem = z.infer<typeof seccionItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const seccionConfigSchema = z.object({
	calidadSeccionItems: z.array(seccionItemSchema)
});
export type SeccionConfig = z.infer<typeof seccionConfigSchema>;

// ============================================
// 5. WITH RELATIONS SCHEMA (Servidor → Cliente)
// Cuando necesitas incluir las relaciones
// ============================================

// Sección con su capítulo padre
export const seccionWithRelationsItemSchema = seccionItemSchema.extend({
	capitulo: capituloItemSchema.nullable()
});
export type SeccionWithRelationsItem = z.infer<typeof seccionWithRelationsItemSchema>;

// Sección con capítulo y modelo (jerarquía completa)
export const seccionFullSchema = seccionItemSchema.extend({
	capitulo: z
		.object({
			id: z.uuid(),
			code: z.string(),
			name: z.string(),
			modelo: z
				.object({
					id: z.uuid(),
					code: z.string(),
					name: z.string(),
					entidadAcreditadora: z.string().nullable()
				})
				.nullable()
		})
		.nullable()
});
export type SeccionFull = z.infer<typeof seccionFullSchema>;
