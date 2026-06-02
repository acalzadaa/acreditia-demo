import { z } from 'zod';
import { puestoRefSchema } from './puesto.schema';
import { usuarioRefSchema } from './usuario.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const regionFormSchema = z.object({
	id: z.uuid().optional(),
	puestoId: z.uuid(),
	code: z
		.string()
		.min(3, 'El código debe tener al menos 3 caracteres')
		.max(100, 'El código no puede tener más de 100 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Formato de slug inválido. Use solo letras minúsculas, números y guiones simples entre palabras'
		)
		.transform((val) => val.toLowerCase()),
	name: z
		.string()
		.min(1, 'El nombre es obligatorio')
		.max(255, 'El nombre debe tener máximo 255 caracteres'),
	description: z.string().default(''),
	createdBy: z.string().optional()
});

export type RegionForm = z.infer<typeof regionFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const regionItemSchema = z.object({
	id: z.uuid(),
	puestoId: z.uuid(),
	usuarioId: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string(),
	puesto: puestoRefSchema.nullable(),
	usuario: usuarioRefSchema.nullable(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type RegionItem = z.infer<typeof regionItemSchema>;

// ============================================
// 4. ITEM WITH RELATIONS SCHEMA (Versión completa)
// ============================================

export const regionWithRelationItemSchema = regionItemSchema;

export type RegionWithRelationItem = z.infer<typeof regionWithRelationItemSchema>;

// ============================================
// 6. CONFIG SCHEMA
// ============================================
export const regionConfigSchema = z.object({
	regionItems: z.array(regionItemSchema)
});

export type RegionConfig = z.infer<typeof regionConfigSchema>;