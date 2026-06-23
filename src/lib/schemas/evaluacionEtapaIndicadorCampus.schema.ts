import { z } from 'zod';
import { campusRefSchema, evaluacionRefSchema, indicadorRefSchema } from './shared.schema';
import { etapaRefSchema } from './etapa.schema';
import { etapaMetadataSchema } from './etapaMetadata.schema';

// ============================================
// ENUMS
// ============================================

export const EvaluacionEtapaIndicadorCampusStatusEnum = z.enum(['new', 'working', 'ready']);
export type EvaluacionEtapaIndicadorCampusStatus = z.infer<
	typeof EvaluacionEtapaIndicadorCampusStatusEnum
>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const evaluacionEtapaIndicadorCampusFormSchema = z
	.object({
		id: z.uuid().optional(),
		evaluacionCode: z.string(),
		etapaCode: z.string(),
		indicadorCode: z.string(),
		campusCode: z.string(),
		// metadata acepta CUALQUIERA de las 8 formas válidas (discriminated union)
		metadata: etapaMetadataSchema,
		createdBy: z.string().optional().default('')
	})
	// etapaCode (plano, viene del cliente) y metadata.code (anidado en
	// el jsonb) DEBEN apuntar a la misma etapa.
	.superRefine((data, ctx) => {
		if (data.etapaCode !== data.metadata.code) {
			ctx.addIssue({
				code: 'custom',
				path: ['metadata'],
				message: `El metadata.code ("${data.metadata.code}") no coincide con etapaCode ("${data.etapaCode}")`
			});
		}
	});

export type EvaluacionEtapaIndicadorCampusForm = z.infer<
	typeof evaluacionEtapaIndicadorCampusFormSchema
>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================

export const evaluacionEtapaIndicadorCampusItemSchema = z
	.object({
		id: z.uuid(),
		code: z.string(),
		evaluacion: evaluacionRefSchema,
		etapa: etapaRefSchema,
		indicador: indicadorRefSchema,
		campus: campusRefSchema,
		metadata: etapaMetadataSchema,
		status: EvaluacionEtapaIndicadorCampusStatusEnum,
		version: z.number().default(0),
		isCurrent: z.boolean().default(false),
		validFrom: z.coerce.date().optional(),
		validTo: z.coerce.date().optional(),
		isDeleted: z.boolean().default(false),
		createdAt: z.iso.datetime().optional(),
		createdBy: z.string().optional()
	})
	// Validación cruzada: el code de `etapa` y el code de `metadata`
	// DEBEN coincidir (no solo "ser alguno de los 8 válidos")
	.superRefine((data, ctx) => {
		if (data.etapa.code !== data.metadata.code) {
			ctx.addIssue({
				code: 'custom',
				path: ['metadata'],
				message: `El metadata.code ("${data.metadata.code}") no coincide con etapa.code ("${data.etapa.code}")`
			});
		}
	});

export type EvaluacionEtapaIndicadorCampusItem = z.infer<
	typeof evaluacionEtapaIndicadorCampusItemSchema
>;
