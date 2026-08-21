import { z } from 'zod';
import { auditMetadataSchema, baseRefSchema } from './shared.schema';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const modeloFormSchema = z.object({
	id: z.uuid().optional(),
	code: z
		.string()
		.min(1, 'El código debe tener al menos 1 caracter')
		.max(50, 'El código debe tener máximo 50 caracteres'),
	name: z
		.string()
		.min(1, 'El nombre es obligatorio')
		.max(255, 'El nombre debe tener máximo 255 caracteres'),
	description: z.string().default(''),
	entidadAcreditadora: z
		.string()
		.max(50, 'La entidad acreditadora debe tener máximo 255 caracteres'),
	createdBy: z.string().optional()
});
export type ModeloForm = z.infer<typeof modeloFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos, padres con datos simples REF
// ============================================

export const modeloItemSchema = z
	.object({
		description: z.string(),
		entidadAcreditadora: z.string()
	})
	.extend(baseRefSchema.shape)
	.extend(auditMetadataSchema.shape);
export type ModeloItem = z.infer<typeof modeloItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const modeloConfigSchema = z.object({
	calidadModeloItems: z.array(modeloItemSchema)
});
export type CalidadModeloConfig = z.infer<typeof modeloConfigSchema>;

// ============================================
// 5. WITH RELATIONS SCHEMA (Servidor → Cliente)
// Agrega datos completos de padres
// ============================================

export const modeloFullRefSchema = baseRefSchema.extend({
	capitulos: z.array(
		baseRefSchema.extend({
			secciones: z.array(baseRefSchema)
		})
	)
});

export type ModeloFullRef = z.infer<typeof modeloFullRefSchema>;
