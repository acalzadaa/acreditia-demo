import { FREQUENCY_UNIT } from '$lib/types/common.types';
import { z } from 'zod';
import {
	objetivoEstrategicoItemSchema,
	objetivoEstrategicoRefSchema
} from './objetivoEstrategico.schema';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const indicadorEstrategicoRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type IndicadorEstrategicoRef = z.infer<typeof indicadorEstrategicoRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const indicadorEstrategicoFormSchema = z.object({
	id: z.uuid().optional(),
	objetivoId: z.uuid('Debes seleccionar un objetivo estrategico'),
	code: z.string().min(1, 'Codigo requerido').max(255),
	name: z.string().min(1, 'Nombre requerido').max(255),
	description: z.string().default(''),
	target: z.coerce.number().nonnegative().min(0, 'La meta debe ser mayor o igual a cero'),
	targetUnit: z.string().min(1, 'La unidad de la meta es requerido'),
	dataOrigin: z.string().min(1, 'La fuente de datos es requerido'),
	dataFormula: z.string().min(1, 'La formula para obtener la informacion es requerido'),
	frequencyValue: z.coerce
		.number()
		.int('La frecuencia debe ser un numero entero')
		.positive('La frecuencia debe ser un numero mayor que cero'),
	frequencyUnit: z.enum(FREQUENCY_UNIT),
	createdBy: z.string().default('')
});

export type IndicadorEstrategicoForm = z.infer<typeof indicadorEstrategicoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const indicadorEstrategicoItemSchema = z.object({
	id: z.uuid(),
	objetivoId: z.uuid('Debes seleccionar un objetivo estrategico'),
	code: z.string().min(1, 'Codigo requerido').max(255),
	name: z.string().min(1, 'Nombre requerido').max(255),
	description: z.string(),
	target: z.coerce.number().nonnegative().min(0, 'La meta debe ser mayor o igual a cero'),
	targetUnit: z.string().min(1, 'La unidad de la meta es requerido'),
	dataOrigin: z.string().min(1, 'La fuente de datos es requerido'),
	dataFormula: z.string().min(1, 'La formula para obtener la informacion es requerido'),
	frequencyValue: z.coerce
		.number()
		.int('La frecuencia debe ser un numero entero')
		.positive('La frecuencia debe ser un numero mayor que cero'),
	frequencyUnit: z.enum(FREQUENCY_UNIT),
	version: z.number().default(0),
	objetivo: objetivoEstrategicoRefSchema.optional(),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string().optional()
});

export type IndicadorEstrategicoItem = z.infer<typeof indicadorEstrategicoItemSchema>;

export const indicadorEstrategicoWithObjetivoItemSchema = indicadorEstrategicoItemSchema
	.omit({ objetivo: true })
	.extend({
		objetivo: objetivoEstrategicoItemSchema
			.omit({ planeacion: true, planeacionId: true })
			.nullable()
	});

export type IndicadorEstrategicoWithObjetivoItem = z.infer<
	typeof indicadorEstrategicoWithObjetivoItemSchema
>;

// Esquema para la configuración completa
export const indicadorEstrategicoConfigSchema = z.object({
	indicadorEstrategicoItems: z.array(indicadorEstrategicoItemSchema)
});

export type IndicadorEstrategicoConfig = z.infer<typeof indicadorEstrategicoConfigSchema>;
