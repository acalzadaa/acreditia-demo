import { z } from 'zod';
import { baseRefSchema, puestoRefSchema } from './shared.schema';
import { puestoItemSchema } from './puesto.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const areaFuncionalPuestoFormSchema = z.object({
	id: z.uuid().optional(),
	areaFuncionalId: z.uuid(),
	puestoId: z.uuid(),
	description: z.string().default(''),
	createdBy: z.string().optional()
});

export type AreaFuncionalPuestoForm = z.infer<typeof areaFuncionalPuestoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================

export const areaFuncionalPuestoItemSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string().default(''),

	areaFuncional: baseRefSchema,
	parent: baseRefSchema.nullable(),

	puestos: z.array(puestoRefSchema.nullable()),

	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type AreaFuncionalPuestoItem = z.infer<typeof areaFuncionalPuestoItemSchema>;

export const areaFuncionalPuestoWithRelationsItemSchema = areaFuncionalPuestoItemSchema.extend({
	parent: areaFuncionalPuestoItemSchema
		.omit({
			parent: true
		})
		.nullable()
		.optional(),
	puestos: puestoItemSchema
});

export type AreaFuncionalPuestoWithRelationsItem = z.infer<
	typeof areaFuncionalPuestoWithRelationsItemSchema
>;
