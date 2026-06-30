import { z } from 'zod';
import { campusItemSchema } from './campus.schema';

// ============================================
// 1. FORM SCHEMA
// ============================================
export const regionCampusFormSchema = z.object({
	id: z.uuid().optional(),
	regionId: z.uuid('La región es requerida'),
	campusId: z.uuid('El campus es requerido'), // FIX: agregar campusId
	createdBy: z.string().optional()
});

export type RegionCampusForm = z.infer<typeof regionCampusFormSchema>;

// ============================================
// 2. ITEM SCHEMA
// ============================================
export const regionCampusItemSchema = z.object({
	id: z.uuid(),
	regionId: z.uuid(),
	campusId: z.uuid(),
	version: z.number().int().nonnegative().default(0),
	isCurrent: z.boolean().default(true),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().nullable().optional(),
	createdBy: z.string()
});

export type RegionCampusItem = z.infer<typeof regionCampusItemSchema>;

// ============================================
// 3. ITEM WITH RELATIONS SCHEMA
// ============================================
export const regionCampusWithRelationsItemSchema = regionCampusItemSchema.extend({
	campus: campusItemSchema.optional()
});

export type RegionCampusWithRelationsItem = z.infer<typeof regionCampusWithRelationsItemSchema>;
