import { z } from 'zod';
import { modeloRefSchema } from './shared.schema';
import { modeloItemSchema } from './modelo.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const capituloFormSchema = z.object({
	id: z.uuid().optional(),
	modeloId: z.uuid('El ID del modelo debe ser un UUID válido'),
	code: z
		.string()
		.min(1, 'El código debe tener al menos 1 caracter')
		.max(50, 'El código debe tener máximo 50 caracteres'),
	name: z
		.string()
		.min(1, 'El nombre es obligatorio')
		.max(255, 'El nombre debe tener máximo 255 caracteres'),
	description: z.string().default(''),
	content: z.string().default(''),
	order: z.number().int().min(0).default(0),
	createdBy: z.string().optional()
});
export type CapituloForm = z.infer<typeof capituloFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos
// ============================================

export const capituloItemSchema = z.object({
	id: z.uuid(),
	modeloId: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string(),
	content: z.string(),
	order: z.number(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});
export type CapituloItem = z.infer<typeof capituloItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const capituloConfigSchema = z.object({
	capituloItems: z.array(capituloItemSchema)
});
export type CalidadCapituloConfig = z.infer<typeof capituloConfigSchema>;

// ============================================
// 5. WITH RELATIONS SCHEMA (Servidor → Cliente)
// Cuando necesitas incluir las relaciones
// ============================================

// Capítulo con su modelo padre
export const capituloWithModeloItemSchema = capituloItemSchema.extend({
	modelo: modeloRefSchema.nullable()
});
export type CapituloWithModeloItem = z.infer<typeof capituloWithModeloItemSchema>;

// Capítulo con sus secciones
export const capituloWithSeccionesSchema = capituloItemSchema.extend({
	secciones: z.array(z.object({
		id: z.uuid(),
		code: z.string(),
		name: z.string(),
		orden: z.number()
	})).optional()
});
export type CapituloWithSecciones = z.infer<typeof capituloWithSeccionesSchema>;

// Capítulo completo (modelo + secciones)
export const capituloFullSchema = capituloItemSchema.extend({
	modelo: modeloItemSchema.nullable(),
	secciones: z.array(z.object({
		id: z.uuid(),
		code: z.string(),
		name: z.string(),
		description: z.string(),
		contenido: z.string(),
		orden: z.number()
	})).optional()
});
export type CapituloFull = z.infer<typeof capituloFullSchema>;