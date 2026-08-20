import { z } from 'zod';
import { areaResponsableWithRelationsItemSchema } from './areaResponsable.schema';
import { areaResponsableRefSchema, baseRefSchema } from './shared.schema';

// ============================================
// 1. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const campusAreaResponsableFormSchema = z.object({
	id: z.uuid().optional(),
	campusCode: z.string().optional(),
	areaResponsableCode: z.string().min(1, 'Favor de seleccionar un area responsable'),
	createdBy: z.string().optional()
});

export type CampusAreaResponsableForm = z.infer<typeof campusAreaResponsableFormSchema>;

// ============================================
// 2. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const campusAreaResponsableItemSchema = z.object({
	id: z.uuid(),
	campus: baseRefSchema,
	areaResponsable: areaResponsableRefSchema,
	version: z.number().int().nonnegative().default(0),
	isCurrent: z.boolean().default(true),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().nullable().optional(),
	createdBy: z.string()
});

export type CampusAreaResponsableItem = z.infer<typeof campusAreaResponsableItemSchema>;

// ============================================
// 3. ITEM WITH RELATIONS SCHEMA
// ============================================
export const campusAreaResponsableWithRelationsItemSchema = campusAreaResponsableItemSchema.extend({
	areaResponsable: areaResponsableWithRelationsItemSchema.optional()
});

export type CampusAreaResponsableWithRelationsItem = z.infer<
	typeof campusAreaResponsableWithRelationsItemSchema
>;
