import { z } from 'zod';
import {
	AREA_RESPONSABLE_TYPE,
	areaResponsableRefSchema,
	auditMetadataSchema,
	baseRefSchema,
} from './shared.schema';
import { institucionItemSchema } from './institucion.schema';
import { createOptions } from '$lib/components/common/utils/formUtils';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================

export const areaResponsableTypeOptions = createOptions(AREA_RESPONSABLE_TYPE);

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const areaResponsableFormSchema = z.object({
	id: z.uuid().optional(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido'),
	type: z.enum(AREA_RESPONSABLE_TYPE).default('global'),
	description: z.string().default(''),
	parentId: z.string().default(''),
	createdBy: z.string().optional()
});

export type AreaResponsableForm = z.infer<typeof areaResponsableFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================

export const areaResponsableItemSchema = z
	.object({
		description: z.string().default(''),
		institucion: baseRefSchema.optional(), //DEPRECATED
		parent: areaResponsableRefSchema.nullable(),
		type: z.enum(AREA_RESPONSABLE_TYPE)
	})
	.extend(baseRefSchema.shape)
	.extend(auditMetadataSchema.shape);

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
		entidadLegal: true
	})
});

export type AreaResponsableWithRelationsItem = z.infer<
	typeof areaResponsableWithRelationsItemSchema
>;
