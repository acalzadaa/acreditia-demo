import { z } from 'zod';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const calidadModeloFormSchema = z.object({
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
    
	entidadAcreditadora: z
		.string()
		.max(255, 'La entidad acreditadora debe tener máximo 255 caracteres')
		.nullable()
		.optional(),
	createdBy: z.string().optional()
});
export type CalidadModeloForm = z.infer<typeof calidadModeloFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const calidadModeloItemSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string(),
	entidadAcreditadora: z.string().nullable(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});
export type CalidadModeloItem = z.infer<typeof calidadModeloItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const calidadModeloConfigSchema = z.object({
	calidadModeloItems: z.array(calidadModeloItemSchema)
});
export type CalidadModeloConfig = z.infer<typeof calidadModeloConfigSchema>;

// ============================================
// 5. WITH RELATIONS SCHEMA (Servidor → Cliente)
// Cuando necesitas incluir las relaciones
// ============================================

export const calidadModeloWithCapitulosSchema = calidadModeloItemSchema.extend({
	capitulos: z.array(z.object({
		id: z.uuid(),
		code: z.string(),
		name: z.string(),
		orden: z.number()
	})).optional()
});
export type CalidadModeloWithCapitulos = z.infer<typeof calidadModeloWithCapitulosSchema>;