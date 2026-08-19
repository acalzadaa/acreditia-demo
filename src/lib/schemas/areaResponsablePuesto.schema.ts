import { z } from 'zod';
import { areaResponsableRefSchema, puestoRefSchema } from './shared.schema';
import { puestoItemSchema } from './puesto.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const areaResponsablePuestoFormSchema = z.object({
	id: z.uuid().optional(),
	areaResponsableId: z.uuid(),
	puestoId: z.uuid(),
	description: z.string().default(''),
	createdBy: z.string().optional()
});

export type AreaResponsablePuestoForm = z.infer<typeof areaResponsablePuestoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================

export const areaResponsablePuestoItemSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string().default(''),

	areaResponsable: areaResponsableRefSchema,
	parent: areaResponsableRefSchema.nullable(),

	puestos: z.array(puestoRefSchema.nullable()),

	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type AreaResponsablePuestoItem = z.infer<typeof areaResponsablePuestoItemSchema>;

export const areaResponsablePuestoWithRelationsItemSchema = areaResponsablePuestoItemSchema.extend({
	parent: areaResponsablePuestoItemSchema
		.omit({
			parent: true
		})
		.nullable()
		.optional(),
	puestos: puestoItemSchema
});

export type AreaResponsablePuestoWithRelationsItem = z.infer<
	typeof areaResponsablePuestoWithRelationsItemSchema
>;
