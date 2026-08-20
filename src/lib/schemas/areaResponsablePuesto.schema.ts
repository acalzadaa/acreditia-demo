import { z } from 'zod';
import { areaResponsableRefSchema, auditMetadataSchema, puestoRefSchema } from './shared.schema';
import { puestoItemSchema } from './puesto.schema';
import { areaResponsableItemSchema } from './areaResponsable.schema';

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

export const areaResponsablePuestoItemSchema = z
	.object({
		id: z.uuid(),
		uniqueId: z.uuid(),
		areaResponsable: areaResponsableRefSchema,
		puesto: puestoRefSchema.nullable()
	})
	.extend(auditMetadataSchema.shape);

export type AreaResponsablePuestoItem = z.infer<typeof areaResponsablePuestoItemSchema>;

export const areaResponsablePuestoWithRelationsItemSchema = areaResponsablePuestoItemSchema.extend({
	parent: areaResponsableItemSchema
		.omit({
			parent: true
		})
		.nullable()
		.optional(),
	puestos: z.array(puestoItemSchema)
});

export type AreaResponsablePuestoWithRelationsItem = z.infer<
	typeof areaResponsablePuestoWithRelationsItemSchema
>;
