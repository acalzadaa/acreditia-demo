import { z } from 'zod';
import { entidadLegalItemSchema, entidadLegalRefSchema } from './entidadLegal.schema';
import { auditMetadataSchema, baseRefSchema } from './shared.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const institucionFormSchema = z.object({
	id: z.uuid().optional(),
	entidadLegalId: z.uuid('Debes seleccionar una entidad legal'),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido'),
	createdBy: z.string().optional()
});

export type InstitucionForm = z.infer<typeof institucionFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const institucionItemSchema = z
	.object({
		entidadLegal: entidadLegalRefSchema
	})
	.extend(baseRefSchema.shape)
	.extend(auditMetadataSchema.shape);

export type InstitucionItem = z.infer<typeof institucionItemSchema>;

export const institucionWithRelationsItemSchema = institucionItemSchema
	.omit({
		entidadLegal: true
	})
	.extend({
		entidadLegal: entidadLegalItemSchema.nullable()
	});

export type InstitucionWithRelationsItem = z.infer<typeof institucionWithRelationsItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const institucionConfigSchema = z.object({
	institucionItems: z.array(institucionItemSchema)
});

export type InstitucionConfig = z.infer<typeof institucionConfigSchema>;
