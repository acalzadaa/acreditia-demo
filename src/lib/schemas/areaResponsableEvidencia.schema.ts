import { z } from 'zod';
import { areaResponsableRefSchema, auditMetadataSchema, baseRefSchema } from './shared.schema';
import {
	areaResponsableItemSchema} from './areaResponsable.schema';
import { evidenciaItemSchema } from './evidencia.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const areaResponsableEvidenciaFormSchema = z.object({
	id: z.uuid().optional(),
	areaResponsableId: z.uuid(),
	evidenciaId: z.uuid(),
	description: z.string().default(''),
	createdBy: z.string().optional()
});

export type AreaResponsableEvidenciaForm = z.infer<typeof areaResponsableEvidenciaFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================

export const areaResponsableEvidenciaItemSchema = z
	.object({
		id: z.uuid(),
		uniqueId: z.uuid(),
		areaResponsable: areaResponsableRefSchema,
		evidencia: baseRefSchema.nullable()
	})
	.extend(auditMetadataSchema.shape);

export type AreaResponsableEvidenciaItem = z.infer<typeof areaResponsableEvidenciaItemSchema>;

export const areaResponsableEvidenciaWithRelationsItemSchema =
	areaResponsableEvidenciaItemSchema.extend({
		parent: areaResponsableItemSchema
			.omit({
				parent: true
			})
			.nullable()
			.optional(),
		evidencias: z.array(evidenciaItemSchema)
	});

export type AreaResponsableEvidenciaWithRelationsItem = z.infer<
	typeof areaResponsableEvidenciaWithRelationsItemSchema
>;
