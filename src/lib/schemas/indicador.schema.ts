import { z } from 'zod';
import { seccionItemSchema } from './seccion.schema';

/* Especifico es especifico de un area responsable de un campus, 
mientras que campus
esta relacionada con todo el campus y, las areas responsables y unidades academicas que lo componen*/
export const INDICADOR_TYPE = ['global', 'campus', 'unidadAcademica'] as const;
export const INDICADOR_CONFIG_TYPE = [
	'meta',
	'seccion',
	'funcional',
	'responsable',
	'normativa',
	'indicadorEstrategico',
	'rubrica',
	'evidencia'
] as const;

export const INDICADOR_CONFIG_STATUS = ['pending', 'complete'] as const;

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
	indicadorType: z.enum(INDICADOR_TYPE).default('global'),
	createdBy: z.string().default('')
});

export type IndicadorForm = z.infer<typeof indicadorFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const indicadorNavigationStatusSchema = z.object({
	id: z.uuid(),
	code: z.enum(INDICADOR_CONFIG_TYPE).optional(),
	count: z.number().min(0).default(0),
	status: z.enum(INDICADOR_CONFIG_STATUS).optional()
});

export type IndicadorNavigationStatusItem = z.infer<typeof indicadorNavigationStatusSchema>;

export const indicadorItemSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string(),
	indicadorType: z.string(),
	navigationStatus: z.array(indicadorNavigationStatusSchema).optional(),
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
