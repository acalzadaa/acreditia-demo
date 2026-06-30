import { z } from 'zod';

// ============================================
// 1. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const unidadAcademicaFormSchema = z.object({
	id: z.uuid().optional(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido'),
	createdBy: z.string().optional()
});

export type UnidadAcademicaForm = z.infer<typeof unidadAcademicaFormSchema>;

// ============================================
// 2. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const unidadAcademicaItemSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string(),
	version: z.number().int().nonnegative().default(0),
	isCurrent: z.boolean().default(true),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().nullable().optional(),
	createdBy: z.string()
});

export type UnidadAcademicaItem = z.infer<typeof unidadAcademicaItemSchema>;

// ============================================
// 3. ITEM WITH RELATIONS SCHEMA
// ============================================
export const unidadAcademicaWithRelationsItemSchema = unidadAcademicaItemSchema.extend({
	campusAsignados: z
		.array(z.object({ id: z.uuid(), code: z.string(), name: z.string() }))
		.optional()
});

export type UnidadAcademicaWithRelationsItem = z.infer<
	typeof unidadAcademicaWithRelationsItemSchema
>;
