import { z } from 'zod';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const evidenciaRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});
export type EvidenciaRef = z.infer<typeof evidenciaRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const evidenciaFormSchema = z.object({
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
	createdBy: z.string().optional()
});
export type EvidenciaForm = z.infer<typeof evidenciaFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const evidenciaItemSchema = z.object({
    id: z.uuid(),
    code: z.string(),
    name: z.string(),
    description: z.string(),
    version: z.number().default(0),
    isCurrent: z.boolean().default(false),
    validFrom: z.coerce.date().optional(),
    validTo: z.coerce.date().optional(),
    isDeleted: z.boolean().default(false),
    createdAt: z.iso.datetime().optional(),
    createdBy: z.string()
});
export type EvidenciaItem = z.infer<typeof evidenciaItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const evidenciaConfigSchema = z.object({
	evidenciaItems: z.array(evidenciaItemSchema)
});
export type EvidenciaConfig = z.infer<typeof evidenciaConfigSchema>;
