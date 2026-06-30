import { z } from 'zod';
import {
	filosofiaInstitucionalItemSchema,
	filosofiaInstitucionalRefSchema
} from './filosofiaInstitucional.schema';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const planeacionEstrategicaRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});
export type PlaneacionEstrategicaRef = z.infer<typeof planeacionEstrategicaRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const planeacionEstrategicaFormSchema = z.object({
	id: z.uuid().optional(),
	filosofiaId: z.uuid(),
	code: z.string().min(1, 'Codigo requerido').max(255),
	name: z.string().min(1, 'Nombre requerido').max(255),
	description: z.string().default(''),
	createdBy: z.string().optional()
});
export type PlaneacionEstrategicaForm = z.infer<typeof planeacionEstrategicaFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const planeacionEstrategicaItemSchema = z.object({
	id: z.uuid(),
	filosofiaId: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string(),
	filosofia: filosofiaInstitucionalRefSchema.optional(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});
export type PlaneacionEstrategicaItem = z.infer<typeof planeacionEstrategicaItemSchema>;

export const planeacionEstrategicaWithFilosofiaItemSchema = planeacionEstrategicaItemSchema
	.omit({ filosofia: true })
	.extend({
		filosofia: filosofiaInstitucionalItemSchema.nullable()
	});

export type PlaneacionEstrategicaWithFilosofiaItem = z.infer<
	typeof planeacionEstrategicaWithFilosofiaItemSchema
>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const planeacionEstrategicaConfigSchema = z.object({
	planeacionEstrategicaItems: z.array(planeacionEstrategicaItemSchema)
});
export type PlaneacionEstrategicaConfig = z.infer<typeof planeacionEstrategicaConfigSchema>;
