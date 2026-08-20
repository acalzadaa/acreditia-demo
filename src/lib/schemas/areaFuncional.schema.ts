import { z } from 'zod';
import { baseRefSchema } from './shared.schema';

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
export const areaFuncionalItemSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string().default(''),
	parentId: z.uuid().nullable(),
	parent: baseRefSchema.nullable(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type AreaFuncionalItem = z.infer<typeof areaFuncionalItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// ============================================
export const areaFuncionalConfigSchema = z.object({
	areaFuncionalItems: z.array(areaFuncionalItemSchema)
});

export type AreaFuncionalConfig = z.infer<typeof areaFuncionalConfigSchema>;
