import type { OptionData } from '$lib/components/ui/input/InputSelect.svelte';
import { z } from 'zod';
import { auditMetadataSchema, baseRefSchema } from './shared.schema';

export const JOB_TYPE = ['funcional', 'responsable', 'region'] as const;
export const ESTATUS = ['activo', 'inactivo', 'borrado'] as const;

export const jobTypeOptions: OptionData[] =
	JOB_TYPE.map((v) => ({
		id: v,
		option: v.toUpperCase()
	})) ?? [];

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
	type: z.enum(JOB_TYPE).default('responsable'),
	referenceId: z.uuid(),
	description: z.string().default('')
});

export type PuestoForm = z.infer<typeof puestoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const puestoItemSchema = z
	.object({
		type: z.enum(JOB_TYPE),
		reference: baseRefSchema, //los datos ref de la area responsable, funcional o region
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
