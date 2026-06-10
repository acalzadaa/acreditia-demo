import { z } from 'zod';
import { areaResponsableRefSchema, puestoRefSchema } from './shared.schema';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const areaResponsableFormSchema = z.object({
	id: z.uuid().optional(),
	puestoId: z.uuid({ message: 'El puesto es requerido' }),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido'),
	description: z.string().default(''),
	parentId: z.string().default(''),
	createdBy: z.string().optional()
});

export type AreaResponsableForm = z.infer<typeof areaResponsableFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================

export const areaResponsableItemSchema = z.object({
	id: z.uuid(),
	puestoId: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string().default(''),
	parentId: z.uuid().nullable(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type AreaResponsableItem = z.infer<typeof areaResponsableItemSchema>;

export const areaResponsableWithRelationsItemSchema = areaResponsableItemSchema.extend({
	puesto: puestoRefSchema.nullable().optional(),
	parent: areaResponsableRefSchema.nullable().optional()
});

export type AreaResponsableWithRelationsItem = z.infer<
	typeof areaResponsableWithRelationsItemSchema
>;
