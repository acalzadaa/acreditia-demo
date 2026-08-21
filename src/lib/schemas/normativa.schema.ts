import { z } from 'zod';
import { auditMetadataSchema, baseRefSchema } from './shared.schema';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const normativaFormSchema = z.object({
	id: z.uuid().optional(),
	code: z.string().min(1, 'Codigo requerido').max(255),
	name: z.string().min(1, 'Nombre requerido').max(255),
	description: z.string().default(''),
	createdBy: z.string().default('')
});

export type NormativaForm = z.infer<typeof normativaFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const normativaItemSchema = z
	.object({
		description: z.string().default('')
	})
	.extend(baseRefSchema.shape)
	.extend(auditMetadataSchema.shape);
export type NormativaItem = z.infer<typeof normativaItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const normativaConfigSchema = z.object({
	normativas: z.array(normativaItemSchema)
});

export type NormativaConfig = z.infer<typeof normativaConfigSchema>;
