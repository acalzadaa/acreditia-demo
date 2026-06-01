// usuarioPuesto.schema.ts (NUEVO)
import { z } from 'zod';
import { usuarioRefSchema } from './usuario.schema';
import { puestoRefSchema } from './puesto.schema';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================
export const usuarioPuestoRefSchema = z.object({
	id: z.uuid(),
	usuarioId: z.uuid(),
	puestoId: z.uuid()
});

export type UsuarioPuestoRef = z.infer<typeof usuarioPuestoRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const usuarioPuestoFormSchema = z.object({
	id: z.uuid().optional(),
	usuarioId: z.uuid('Debes seleccionar un usuario'),
	puestoId: z.uuid('Debes seleccionar un puesto'),
	createdBy: z.string().optional()
});

export type UsuarioPuestoForm = z.infer<typeof usuarioPuestoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const usuarioPuestoItemSchema = z.object({
	id: z.uuid(),
	usuarioId: z.uuid(),
	puestoId: z.uuid(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(true),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type UsuarioPuestoItem = z.infer<typeof usuarioPuestoItemSchema>;

// ============================================
// 4. ITEM WITH RELATIONS SCHEMA
// ============================================
export const usuarioPuestoWithRelationsItemSchema = usuarioPuestoItemSchema.extend({
	usuario: usuarioRefSchema,
	puesto: puestoRefSchema
});

export type UsuarioPuestoWithRelationsItem = z.infer<typeof usuarioPuestoWithRelationsItemSchema>;

// ============================================
// 5. CONFIG SCHEMA
// ============================================
export const usuarioPuestoConfigSchema = z.object({
	usuarioPuestoItems: z.array(usuarioPuestoItemSchema)
});

export type UsuarioPuestoConfig = z.infer<typeof usuarioPuestoConfigSchema>;
