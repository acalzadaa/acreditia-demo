import { z } from 'zod';
import { capituloRefSchema } from './shared.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const seccionFormSchema = z.object({
	id: z.uuid().optional(),
	capituloId: z.uuid('El ID del capítulo debe ser un UUID válido'),
	code: z
		.string()
		.min(1, 'El código debe tener al menos 1 caracter')
		.max(50, 'El código debe tener máximo 50 caracteres'),
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

export const seccionItemSchema = z.object({
	id: z.uuid(),
	capituloId: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string(),
	content: z.string(),
	order: z.number(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});
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
export const seccionWithCapituloItemSchema = seccionItemSchema.extend({
	capitulo: capituloRefSchema.nullable()
});
export type SeccionWithCapituloItem = z.infer<typeof seccionWithCapituloItemSchema>;

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
