import { z } from 'zod';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

export const normativaRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type NormativaRef = z.infer<typeof normativaRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const normativaFormSchema = z.object({
	id: z.uuid().optional(),
	code: z.string().min(1, 'Codigo requerido').max(255),
	name: z.string().min(1, 'Nombre requerido').max(255),
	description: z.string().default(''),
	createdBy: z.string().default('')
});

export type NormativaForm = z.infer<typeof normativaFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const normativaItemSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string().default(''),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string().optional()
});
export type NormativaItem = z.infer<typeof normativaItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const normativaConfigSchema = z.object({
	normativas: z.array(normativaItemSchema)
});

export type NormativaConfig = z.infer<typeof normativaConfigSchema>;
