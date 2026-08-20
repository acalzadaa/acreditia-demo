import { z } from 'zod';
import { institucionItemSchema } from './institucion.schema';
import { auditMetadataSchema, baseRefSchema } from './shared.schema';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================

// ============================================
// 2. FORM SCHEMA
// ============================================
export const campusFormSchema = z.object({
	id: z.uuid().optional(),
	institucionId: z.uuid('Debes seleccionar una institución'),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido'),
	createdBy: z.string().optional()
});

export type CampusForm = z.infer<typeof campusFormSchema>;

// ============================================
// 3. ITEM WITH RELATIONS SCHEMA
// ============================================

export const campusItemSchema = z
	.object({
		institucionId: z.uuid(),
		institucion: baseRefSchema.optional(),
		totalAreaResponsable: z.number().min(0).default(0),
		totalUnidadAcademica: z.number().min(0).default(0)
	})
	.extend(baseRefSchema.shape)
	.extend(auditMetadataSchema.shape);

export type CampusItem = z.infer<typeof campusItemSchema>;

export const campusWithRelationsItemSchema = campusItemSchema.omit({ institucionId: true }).extend({
	institucion: institucionItemSchema.omit({ entidadLegal: true })
});

export type CampusWithRelationsItem = z.infer<typeof campusWithRelationsItemSchema>;
