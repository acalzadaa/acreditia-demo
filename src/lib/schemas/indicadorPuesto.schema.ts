import { z } from 'zod';
import {
	auditMetadataSchema,
	puestoRefSchema,
	baseRefSchema
} from './shared.schema';
import { puestoItemSchema } from './puesto.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const indicadorPuestoFormSchema = z.object({
	id: z.uuid().optional(),
	indicadorId: z.uuid(),
	puestoId: z.uuid(),
	description: z.string().default(''),
	createdBy: z.string().optional()
});

export type indicadorPuestoForm = z.infer<typeof indicadorPuestoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================

export const indicadorPuestoItemSchema = z
	.object({
		id: z.uuid(),
		uniqueId: z.uuid(),
		indicador: baseRefSchema,
		puesto: puestoRefSchema.nullable()
	})
	.extend(auditMetadataSchema.shape);

export type indicadorPuestoItem = z.infer<typeof indicadorPuestoItemSchema>;

export const indicadorPuestoWithRelationsItemSchema = indicadorPuestoItemSchema.extend({
	puestos: z.array(puestoItemSchema)
});

export type indicadorPuestoWithRelationsItem = z.infer<
	typeof indicadorPuestoWithRelationsItemSchema
>;
