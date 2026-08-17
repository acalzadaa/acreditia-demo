import { z } from 'zod';
import {
	campusRefSchema,
	evaluacionRefSchema,
	indicadorRefSchema,
	unidadAcademicaRefSchema
} from './shared.schema';
import { etapaRefSchema } from './etapa.schema';
import { etapaMetadataSchema, type EtapaMetadataByCode } from './etapaMetadata.schema';

// ============================================
// ENUMS
// ============================================

export const evaluacionEtapaIndicadorStatusEnum = z.enum([
	'pending',
	'in_process',
	'ready',
	'completed',
	'invalidate_request',
	'forced_in_process',
	'forced_ready',
	'feedback_in_progress',
	'feedback_ready',
]);
export type EvaluacionEtapaIndicadorStatus = z.infer<typeof evaluacionEtapaIndicadorStatusEnum>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const evaluacionEtapaIndicadorFormSchema = z
	.object({
		id: z.uuid().optional(),
		evaluacionCode: z.string(),
		etapaCode: z.string(),
		indicadorCode: z.string(),
		campusCode: z.string(),
		unidadAcademicaCode: z.string(),
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

export type EvaluacionEtapaIndicadorForm = z.infer<typeof evaluacionEtapaIndicadorFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================

export const evaluacionEtapaIndicadorItemSchema = z
	.object({
		id: z.uuid(),
		code: z.string(),
		evaluacion: evaluacionRefSchema,
		etapa: etapaRefSchema,
		indicador: indicadorRefSchema,
		campus: campusRefSchema,
		unidadAcademica: unidadAcademicaRefSchema,
		metadata: etapaMetadataSchema,
		status: evaluacionEtapaIndicadorStatusEnum,
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

export type EvaluacionEtapaIndicadorItem = z.infer<typeof evaluacionEtapaIndicadorItemSchema>;

/**
 * EvaluacionEtapaIndicadorItem, pero con `metadata` estrechado a la forma
 * concreta correspondiente a T. Conserva id, status, campus, etc.
 */
export type EvaluacionEtapaIndicadorItemFor<
	T extends EtapaMetadataByCode[keyof EtapaMetadataByCode]['code']
> = Omit<EvaluacionEtapaIndicadorItem, 'metadata'> & { metadata: EtapaMetadataByCode[T] };
