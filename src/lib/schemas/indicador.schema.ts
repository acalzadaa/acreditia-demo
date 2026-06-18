import type { OptionData } from '$lib/components/ui/input/InputSelect.svelte';
import { z } from 'zod';
import { seccionRefSchema } from './shared.schema';
import { seccionItemSchema } from './seccion.schema';

export const INDICADOR_TYPE = ['campus', 'especifico'] as const;

export const indicadorTypeOptions: OptionData[] =
	INDICADOR_TYPE.map((v) => ({
		id: v,
		option: v.toUpperCase()
	})) ?? [];

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const indicadorRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type IndicadorRef = z.infer<typeof indicadorRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const indicadorFormSchema = z.object({
	id: z.uuid().optional(),
	code: z
		.string()
		.min(3, 'Code debe tener al menos 3 caracteres')
		.max(100, 'Code no puede exceder 100 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
		),
	name: z.string().min(1, 'Nombre requerido').max(255),
	description: z.string().default(''),
	seccionCode: z
		.string()
		.min(3, 'Code debe tener al menos 3 caracteres')
		.max(100, 'Code no puede exceder 100 caracteres')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Code solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales)'
		),
	target: z.coerce.number().nonnegative().min(0, 'La meta debe ser mayor o igual a cero'),
	targetUnit: z.string().min(1, 'La unidad de la meta es requerido'),
	indicadorType: z.enum(INDICADOR_TYPE).default('especifico'),
	createdBy: z.string().default('')
});

export type IndicadorForm = z.infer<typeof indicadorFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const indicadorItemSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string(),
	section: seccionRefSchema,
	target: z.coerce.number(),
	targetUnit: z.string(),
	indicadorType: z.string(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string().optional()
});

export type IndicadorItem = z.infer<typeof indicadorItemSchema>;

export const indicadorWithRelationsItemSchema = indicadorItemSchema.extend({
	seccion: seccionItemSchema
});

// Esquema para la configuración completa
export const indicadorConfigSchema = z.object({
	indicadorItems: z.array(indicadorItemSchema)
});

export type IndicadorConfig = z.infer<typeof indicadorConfigSchema>;
