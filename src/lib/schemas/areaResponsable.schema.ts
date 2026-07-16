import { z } from 'zod';
import { areaResponsableRefSchema, institucionRefSchema } from './shared.schema';
import { institucionItemSchema } from './institucion.schema';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const areaResponsableFormSchema = z.object({
	id: z.uuid().optional(),
	institucionId: z.uuid({ message: 'La institucion es requerida' }),
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
	code: z.string(),
	name: z.string(),
	description: z.string().default(''),

	institucion: institucionRefSchema,
	parent: areaResponsableRefSchema.nullable(),

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
	parent: areaResponsableItemSchema
		.omit({
			institucion: true,
			parent: true
		})
		.nullable()
		.optional(),
	institucion: institucionItemSchema.omit({
		entidadLegal: true,
		entidadLegalId: true
	})
});

export type AreaResponsableWithRelationsItem = z.infer<
	typeof areaResponsableWithRelationsItemSchema
>;
