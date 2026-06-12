import { z } from 'zod';
import { unidadAcademicaRefSchema } from './shared.schema';

// ============================================
// 1. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const campusUnidadAcademicaFormSchema = z.object({
	id: z.uuid().optional(),
	unidadAcademicaId: z.uuid('Debes seleccionar una unidad académica'), // FIX: mensaje corregido
	campusId: z.uuid('Debes seleccionar un campus'),
	createdBy: z.string().optional()
});

export type CampusUnidadAcademicaForm = z.infer<typeof campusUnidadAcademicaFormSchema>;

// ============================================
// 2. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const campusUnidadAcademicaItemSchema = z.object({
	id: z.uuid(),
	unidadAcademicaId: z.uuid(),
	campusId: z.uuid(),
	version: z.number().int().nonnegative().default(0),
	isCurrent: z.boolean().default(true),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().nullable().optional(),
	createdBy: z.string()
});

export type CampusUnidadAcademicaItem = z.infer<typeof campusUnidadAcademicaItemSchema>;

// ============================================
// 3. ITEM WITH RELATIONS SCHEMA
// ============================================
export const campusUnidadAcademicaWithRelationsItemSchema = campusUnidadAcademicaItemSchema
	.omit({ unidadAcademicaId: true })
	.extend({
		unidadAcademica: unidadAcademicaRefSchema.optional()
	});

export type CampusUnidadAcademicaWithRelationsItem = z.infer<
	typeof campusUnidadAcademicaWithRelationsItemSchema
>;
