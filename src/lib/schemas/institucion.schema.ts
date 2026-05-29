import { z } from 'zod';
import { regionItemSchema, regionRefSchema } from './region.schema';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

export const institucionRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type InstitucionRef = z.infer<typeof institucionRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const institucionFormSchema = z.object({
	id: z.uuid().optional(),
	regionId: z.uuid('Debes seleccionar una region'),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido'),
	createdBy: z.string().optional()
});

export type InstitucionForm = z.infer<typeof institucionFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const institucionItemSchema = z.object({
	id: z.uuid(),
	regionId: z.uuid(),
	code: z.string(),
	name: z.string(),
	region: regionRefSchema.optional(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type InstitucionItem = z.infer<typeof institucionItemSchema>;

export const institucionWithRelationsItemSchema = institucionItemSchema
	.omit({
		region: true
	})
	.extend({
		region: regionItemSchema.omit({ entidadLegal: true, entidadLegalId: true })
	});

export type InstitucionWithRelationsItem = z.infer<typeof institucionWithRelationsItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const institucionConfigSchema = z.object({
	institucionItems: z.array(institucionItemSchema)
});

export type InstitucionConfig = z.infer<typeof institucionConfigSchema>;
