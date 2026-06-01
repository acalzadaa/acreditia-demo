// unidadAcademica.schema.ts (ACTUALIZADO)
import { z } from 'zod';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================
export const unidadAcademicaRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type UnidadAcademicaRef = z.infer<typeof unidadAcademicaRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const unidadAcademicaFormSchema = z.object({
	id: z.uuid().optional(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido'),
	createdBy: z.string().optional(),
	version: z.number().int().nonnegative().default(0),
	isCurrent: z.boolean().default(true),
	validFrom: z.coerce.date().default(() => new Date()),
	validTo: z.coerce.date().nullable().optional(),
	isDeleted: z.boolean().default(false)
});

export type UnidadAcademicaForm = z.infer<typeof unidadAcademicaFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const unidadAcademicaItemSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type UnidadAcademicaItem = z.infer<typeof unidadAcademicaItemSchema>;
