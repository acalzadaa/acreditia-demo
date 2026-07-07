// usuarioCampus.schema.ts (NUEVO)
import { z } from 'zod';
import { campusRefSchema, usuarioRefSchema } from './shared.schema';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const usuarioCampusFormSchema = z.object({
	id: z.uuid().optional(),
	usuarioId: z.uuid('Debes seleccionar un usuario'),
	campusId: z.uuid('Debes seleccionar un campus'),
	createdBy: z.string().optional()
});

export type UsuarioCampusForm = z.infer<typeof usuarioCampusFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const usuarioCampusItemSchema = z.object({
	id: z.uuid(),
	usuarioId: z.uuid(),
	campusId: z.uuid(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(true),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type UsuarioCampusItem = z.infer<typeof usuarioCampusItemSchema>;

// ============================================
// 4. ITEM WITH RELATIONS SCHEMA
// ============================================
export const usuarioCampusWithRelationsItemSchema = usuarioCampusItemSchema.extend({
	usuario: usuarioRefSchema,
	campus: campusRefSchema
});

export type UsuarioCampusWithRelationsItem = z.infer<typeof usuarioCampusWithRelationsItemSchema>;

// ============================================
// 5. CONFIG SCHEMA
// ============================================
export const usuarioCampusConfigSchema = z.object({
	usuarioCampusItems: z.array(usuarioCampusItemSchema)
});

export type UsuarioCampusConfig = z.infer<typeof usuarioCampusConfigSchema>;
