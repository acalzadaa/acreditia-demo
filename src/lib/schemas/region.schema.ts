// region.schema.ts (ACTUALIZADO)
import { z } from 'zod';
import { puestoItemSchema, puestoRefSchema } from './puesto.schema';
import { usuarioRefSchema } from './usuario.schema';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================
export const regionRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type RegionRef = z.infer<typeof regionRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const regionFormSchema = z.object({
	id: z.uuid().optional(),
	directorPuestoId: z.uuid().nullable().optional(), // Cambiado: puede ser null si no tiene director asignado
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

export type RegionForm = z.infer<typeof regionFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const regionItemSchema = z.object({
	id: z.uuid(),
	directorPuestoId: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string(),
	directorPuesto: puestoRefSchema.nullable(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type RegionItem = z.infer<typeof regionItemSchema>;

// ============================================
// 4. ITEM WITH RELATIONS SCHEMA (Versión completa)
// ============================================

export const regionWithPuestoItemSchema = regionItemSchema
	.omit({
		directorPuesto: true
	})
	.extend({
		directorPuesto: puestoItemSchema.nullable()
	});

export type RegionWithPuestoItem = z.infer<typeof regionWithPuestoItemSchema>;

export const regionWithDirectorSchema = regionWithPuestoItemSchema.extend({
	director: usuarioRefSchema.nullable()
});

export type RegionWithDirectorItem = z.infer<typeof regionWithDirectorSchema>;

// ============================================
// 5. CONFIG SCHEMA
// ============================================
export const regionConfigSchema = z.object({
	regionItems: z.array(regionItemSchema)
});

export type RegionConfig = z.infer<typeof regionConfigSchema>;
