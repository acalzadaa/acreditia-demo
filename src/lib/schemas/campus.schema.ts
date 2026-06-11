import { z } from 'zod';
import { institucionItemSchema } from './institucion.schema';
import { institucionRefSchema, regionRefSchema } from './shared.schema';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================

// ============================================
// 2. FORM SCHEMA
// ============================================
export const campusFormSchema = z.object({
	id: z.uuid().optional(),
	institucionId: z.uuid('Debes seleccionar una institución'),
	regionId: z.uuid('Debes seleccionar una región'),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido'),
	createdBy: z.string().optional()
});

export type CampusForm = z.infer<typeof campusFormSchema>;

// ============================================
// 3. ITEM WITH RELATIONS SCHEMA
// ============================================

export const campusItemSchema = z.object({
	id: z.uuid(),
	institucionId: z.uuid(),
	regionId: z.uuid(),
	code: z.string(),
	name: z.string(),
	institucion: institucionRefSchema.optional(),
	region: regionRefSchema.optional(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type CampusItem = z.infer<typeof campusItemSchema>;

export const campusWithRelationsItemSchema = campusItemSchema
	.omit({ institucion: true, region: true })
	.extend({
		institucion: institucionItemSchema.omit({ entidadLegal: true, entidadLegalId: true }),
		region: regionRefSchema
	});

export type CampusWithRelationsItem = z.infer<typeof campusWithRelationsItemSchema>;