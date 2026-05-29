import { z } from 'zod';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const entidadLegalRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type EntidadLegalRef = z.infer<typeof entidadLegalRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const entidadLegalFormSchema = z.object({
	id: z.uuid().optional(),
	code: z
		.string()
		.min(1, 'El código debe tener al menos 1 caracter')
		.max(50, 'El código debe tener máximo 50 caracteres'),
	name: z
		.string()
		.min(1, 'El nombre es obligatorio')
		.max(255, 'El nombre debe tener máximo 255 caracteres'),
	description: z.string().default(''),
	createdBy: z.string().optional()
});

export type EntidadLegalForm = z.infer<typeof entidadLegalFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const entidadLegalItemSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type EntidadLegalItem = z.infer<typeof entidadLegalItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const entidadLegalConfigSchema = z.object({
	entidadLegalItems: z.array(entidadLegalItemSchema)
});

export type EntidadLegalConfig = z.infer<typeof entidadLegalConfigSchema>;
