import { z } from 'zod';
import { baseRefSchema } from './shared.schema';
import { seccionItemSchema } from './seccion.schema';
import type { OptionData } from '$lib/components/ui/select/utils/inputSelect';

/* Especifico es especifico de un area responsable de un campus, 
mientras que campus
esta relacionada con todo el campus y, las areas responsables y unidades academicas que lo componen*/
export const INDICADOR_TYPE = ['campus', 'especifico'] as const;

export const indicadorTypeOptions: OptionData[] =
	INDICADOR_TYPE.map((v) => ({
		id: v,
		option: v.toUpperCase()
	})) ?? [];

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
	section: baseRefSchema, //referencia a la seccion del sistema de calidad
	target: z.coerce.number(), //referencia a la meta que se desea obtener
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
