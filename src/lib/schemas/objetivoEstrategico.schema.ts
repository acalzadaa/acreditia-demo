import { z } from 'zod';
import {
	planeacionEstrategicaItemSchema,
	planeacionEstrategicaRefSchema
} from './planeacionEstrategica.schema';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const objetivoEstrategicoRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});
export type ObjetivoEstrategicoRefSchema = z.infer<typeof objetivoEstrategicoRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// Agregar defaults si son opcionales en las formas
// ============================================

export const objetivoEstrategicoFormSchema = z.object({
	id: z.uuid().optional(),
	planeacionId: z.uuid(),
	code: z.string().min(1, 'Codigo requerido').max(255),
	name: z.string().min(1, 'Nombre requerido').max(255),
	description: z.string().default(''),
	createdBy: z.string().default('')
});
export type ObjetivoEstrategicoForm = z.infer<typeof objetivoEstrategicoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// agregar opcional si
// ============================================

export const objetivoEstrategicoItemSchema = z.object({
	id: z.uuid(),
	planeacionId: z.uuid(),
	code: z.string(),
	name: z.string(),
	description: z.string().default(''),
	planeacion: planeacionEstrategicaRefSchema.optional(),
	version: z.number().default(0),
	isCurrent: z.boolean().default(false),
	validFrom: z.coerce.date().optional(),
	validTo: z.coerce.date().optional(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string().optional()
});
export type ObjetivoEstrategicoItem = z.infer<typeof objetivoEstrategicoItemSchema>;

export const objetivoEstrategicoWithPlaneacionItemSchema = objetivoEstrategicoItemSchema
	.omit({ planeacion: true })
	.extend({
		planeacion: planeacionEstrategicaItemSchema
			.omit({ filosofia: true, filosofiaId: true })
			.nullable()
	});

export type ObjetivoEstrategicoWithPlaneacionItem = z.infer<
	typeof objetivoEstrategicoWithPlaneacionItemSchema
>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const objetivoEstrategicoConfigSchema = z.object({
	objetivoEstrategicoItems: z.array(objetivoEstrategicoItemSchema)
});
export type ObjetivoEstrategicoConfig = z.infer<typeof objetivoEstrategicoConfigSchema>;
