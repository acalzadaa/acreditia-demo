import { z } from 'zod';
import { auditMetadata, puestoRefSchema, usuarioRefSchema } from './shared.schema';
import type { OptionData } from '$lib/components/ui/input/InputSelect.svelte';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================
export const JOB_LEVEL_TYPE = ['primario', 'secundario'] as const;
export const jobLevelTypeOptions: OptionData[] =
	JOB_LEVEL_TYPE.map((v) => ({
		id: v,
		option: v.toUpperCase()
	})) ?? [];

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const usuarioPuestoFormSchema = z.object({
	id: z.uuid().optional(),
	usuarioId: z.uuid('Debes seleccionar un usuario'),
	puestoId: z.uuid('Debes seleccionar un puesto'),
	level: z.enum(JOB_LEVEL_TYPE),
	createdBy: z.string().optional()
});

export type UsuarioPuestoForm = z.infer<typeof usuarioPuestoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const usuarioPuestoItemSchema = z
	.object({
		id: z.uuid(),
		usuarioId: z.uuid(),
		puesto: puestoRefSchema,
		level: z.enum(JOB_LEVEL_TYPE)
	})
	.extend(auditMetadata.shape);

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
