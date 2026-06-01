import { ESTATUS } from '$lib/types/common.types';
import { z } from 'zod';
import { campusRefSchema } from './campus.schema';
import { puestoRefSchema } from './puesto.schema';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================
export const usuarioRefSchema = z.object({
	id: z.uuid(),
	firstName: z.string().default(''),
	lastName: z.string().default(''),
	email: z.email()
});

export type UsuarioRef = z.infer<typeof usuarioRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const usuarioFormSchema = z.object({
	id: z.uuid().optional(),
	authUserId: z.string().min(1, 'El ID de autenticación es requerido'),
	firstName: z.string().min(1, 'El nombre es requerido'),
	lastName: z.string().min(1, 'El apellido es requerido'),
	status: z.enum(ESTATUS).default('activo'),
	createdBy: z.string().optional()
});

export type UsuarioForm = z.infer<typeof usuarioFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const usuarioItemSchema = z.object({
	id: z.uuid(),
	authUserId: z.string(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(true),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type UsuarioItem = z.infer<typeof usuarioItemSchema>;

// ============================================
// 4. ITEM WITH RELATIONS SCHEMA
// ============================================
export const usuarioWithRelationsItemSchema = usuarioItemSchema.extend({
	// Información del auth user (de better-auth)
	authUser: z
		.object({
			id: z.string(),
			name: z.string(),
			email: z.string(),
			image: z.string().nullable()
		})
		.optional(),
	puestos: z.array(puestoRefSchema),
	campus: z.array(campusRefSchema)
});

export type UsuarioWithRelationsItem = z.infer<typeof usuarioWithRelationsItemSchema>;

// ============================================
// 5. CONFIG SCHEMA
// ============================================
export const usuarioConfigSchema = z.object({
	usuarioItems: z.array(usuarioItemSchema)
});

export type UsuarioConfig = z.infer<typeof usuarioConfigSchema>;
