import { z } from 'zod';
import { auditMetadataSchema, baseRefSchema, puestoRefSchema } from './shared.schema';
import { puestoItemSchema } from './puesto.schema';
import { areaFuncionalItemSchema } from './areaFuncional.schema';

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

export const areaFuncionalPuestoItemSchema = z
	.object({
		id: z.uuid(),
		uniqueId: z.uuid(),
		areaFuncional: baseRefSchema,
		puesto: puestoRefSchema.nullable()
	})
	.extend(auditMetadataSchema.shape);

export type AreaFuncionalPuestoItem = z.infer<typeof areaFuncionalPuestoItemSchema>;

export const areaFuncionalPuestoWithRelationsItemSchema = areaFuncionalPuestoItemSchema.extend({
	parent: areaFuncionalItemSchema
		.omit({
			parent: true
		})
		.nullable()
		.optional(),
	puestos: z.array(puestoItemSchema)
});

export type AreaFuncionalPuestoWithRelationsItem = z.infer<
	typeof areaFuncionalPuestoWithRelationsItemSchema
>;
