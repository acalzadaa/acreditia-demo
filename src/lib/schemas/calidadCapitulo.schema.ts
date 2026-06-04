import { z } from 'zod';
import { calidadModeloRefSchema } from './shared.schema';
import { calidadModeloItemSchema } from './calidadModelo.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const calidadCapituloFormSchema = z.object({
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
	contenido: z.string().default(''),
	orden: z.number().int().min(0).default(0),
	createdBy: z.string().optional()
});
export type CalidadCapituloForm = z.infer<typeof calidadCapituloFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos
// ============================================

export const calidadCapituloItemSchema = z.object({
	id: z.uuid(),
	modeloId: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string(),
	contenido: z.string(),
	orden: z.number(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});
export type CalidadCapituloItem = z.infer<typeof calidadCapituloItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const calidadCapituloConfigSchema = z.object({
	calidadCapituloItems: z.array(calidadCapituloItemSchema)
});
export type CalidadCapituloConfig = z.infer<typeof calidadCapituloConfigSchema>;

// ============================================
// 5. WITH RELATIONS SCHEMA (Servidor → Cliente)
// Cuando necesitas incluir las relaciones
// ============================================

// Capítulo con su modelo padre
export const calidadCapituloWithModeloItemSchema = calidadCapituloItemSchema.extend({
	modelo: calidadModeloRefSchema.nullable()
});
export type CalidadCapituloWithModeloItem = z.infer<typeof calidadCapituloWithModeloItemSchema>;

// Capítulo con sus secciones
export const calidadCapituloWithSeccionesSchema = calidadCapituloItemSchema.extend({
	secciones: z.array(z.object({
		id: z.uuid(),
		code: z.string(),
		name: z.string(),
		orden: z.number()
	})).optional()
});
export type CalidadCapituloWithSecciones = z.infer<typeof calidadCapituloWithSeccionesSchema>;

// Capítulo completo (modelo + secciones)
export const calidadCapituloFullSchema = calidadCapituloItemSchema.extend({
	modelo: calidadModeloItemSchema.nullable(),
	secciones: z.array(z.object({
		id: z.uuid(),
		code: z.string(),
		name: z.string(),
		description: z.string(),
		contenido: z.string(),
		orden: z.number()
	})).optional()
});
export type CalidadCapituloFull = z.infer<typeof calidadCapituloFullSchema>;