import { z } from 'zod';
import {
	areaResponsableRefSchema,
	auditMetadataSchema,
	baseRefSchema} from './shared.schema';
import { unidadAcademicaItemSchema } from './unidadAcademica.schema';
import { areaResponsableItemSchema } from './areaResponsable.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const unidadAcademicaAreaResponsableFormSchema = z.object({
	id: z.uuid().optional(),
	unidadAcademicaId: z.uuid(),
	areaResponsableId: z.uuid(),
	description: z.string().default(''),
	createdBy: z.string().optional()
});

export type UnidadAcademicaAreaResponsableForm = z.infer<typeof unidadAcademicaAreaResponsableFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================

export const unidadAcademicaAreaResponsableItemSchema = z
	.object({
		id: z.uuid(),
		uniqueId: z.uuid(),
		unidadAcademica: baseRefSchema,
		areaResponsable: areaResponsableRefSchema.nullable()
	})
	.extend(auditMetadataSchema.shape);

export type UnidadAcademicaAreaResponsableItem = z.infer<typeof unidadAcademicaAreaResponsableItemSchema>;

export const unidadAcademicaAreaResponsableWithRelationsItemSchema = unidadAcademicaAreaResponsableItemSchema.extend({
	unidadAcademica: unidadAcademicaItemSchema,
	areaResponsable: areaResponsableItemSchema.nullable()
});

export type UnidadAcademicaAreaResponsableWithRelationsItem = z.infer<
	typeof unidadAcademicaAreaResponsableWithRelationsItemSchema
>;
