import { z } from 'zod';
import { auditMetadataSchema, baseRefSchema, JOB_SCOPE, JOB_TYPE } from './shared.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const puestoFormSchema = z.object({
	id: z.uuid().optional(),
	code: z
		.string()
		.min(1, 'El código debe tener al menos 1 caracter')
		.max(50, 'El código debe tener máximo 50 caracteres'),
	name: z
		.string()
		.min(1, 'El nombre es obligatorio')
		.max(255, 'El nombre debe tener máximo 255 caracteres'),
	type: z.enum(JOB_TYPE),
	scope: z.enum(JOB_SCOPE),
	description: z.string().default('')
});

export type PuestoForm = z.infer<typeof puestoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const puestoItemSchema = z
	.object({
		scope: z.enum(JOB_SCOPE),
		type: z.enum(JOB_TYPE),
		description: z.string().default('')
	})
	.extend(baseRefSchema.shape)
	.extend(auditMetadataSchema.shape);

export type PuestoItem = z.infer<typeof puestoItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// ============================================
export const puestoConfigSchema = z.object({
	puestoItems: z.array(puestoItemSchema)
});

export type PuestoConfig = z.infer<typeof puestoConfigSchema>;
