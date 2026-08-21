import { z } from 'zod';
import { auditMetadataSchema, baseRefSchema } from './shared.schema';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const areaFuncionalFormSchema = z.object({
	id: z.uuid().optional(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido'),
	description: z.string().default(''),
	parentId: z.string().default(''),
	createdBy: z.string().optional()
});

export type AreaFuncionalForm = z.infer<typeof areaFuncionalFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const areaFuncionalItemSchema = z
		.object({
			description: z.string().default(''),
			institucion: baseRefSchema.optional(), //DEPRECATED
			parent: baseRefSchema.nullable(),
			totalPuestos: z.number().min(0).default(0)
		})
		.extend(baseRefSchema.shape)
		.extend(auditMetadataSchema.shape);

export type AreaFuncionalItem = z.infer<typeof areaFuncionalItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// ============================================
export const areaFuncionalConfigSchema = z.object({
	areaFuncionalItems: z.array(areaFuncionalItemSchema)
});

export type AreaFuncionalConfig = z.infer<typeof areaFuncionalConfigSchema>;
