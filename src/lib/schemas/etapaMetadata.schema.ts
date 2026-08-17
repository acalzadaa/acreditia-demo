import { z } from 'zod';

// ============================================
// Códigos de etapa (debe coincidir con etapaRefSchema.code)
// ============================================

export const EtapaCodeEnum = z.enum([
	'meta',
	'evidencia',
	'resultados',
	'autoevaluacion-ejecucion',
	'autoevaluacion-revision',
	'planeacion',
	'ejecucion'
]);
export type EtapaCode = z.infer<typeof EtapaCodeEnum>;

// ============================================
// Schema compartido para "invalidar"
// (se puede mezclar con cualquier etapa vía .extend() o .merge())
// ============================================

export const etapaInvalidatedItemSchema = z.object({
	invalidate: z.boolean().default(false),
	invalidateReason: z.string().default('')
});

// ============================================
// Metadata por etapa — CADA UNA lleva su propio
// campo discriminante `code` como literal
// ============================================

//etapa 1
export const etapaMetaItemSchema = z
	.object({
		code: z.literal('meta'),
		target: z.number().nullable().default(null),
		targetUnit: z.string().optional()
	})
	.extend(etapaInvalidatedItemSchema.shape);

export type EtapaMetaItem = z.infer<typeof etapaMetaItemSchema>;

export const etapaMetaFormSchema = z.object({
	target: z.number().min(0).nullable().default(null),
	targetUnit: z.string().optional()
});

export type EtapaMetaForm = z.infer<typeof etapaMetaFormSchema>;

//etapa 2

/**
 * Status del archivo dentro del ciclo de subida async a S3.
 * - sending: el server action ya registró el archivo y aceptó el form,
 *   pero el PUT a S3 todavía no se confirma. Es la ÚNICA transición que
 *   se actualiza in-place sobre la fila vigente (no genera nueva versión
 *   SCD2) — ver nota en evidenciaFileRefSchema.
 * - ready: la subida a S3 se confirmó, el archivo ya existe físicamente.
 */
export const evidenciaFileStatusEnum = z.enum(['sending', 'ready']);
export type EvidenciaFileStatus = z.infer<typeof evidenciaFileStatusEnum>;

/**
 * Referencia a un archivo dentro del jsonb. NO es el archivo binario ni
 * la URL de S3 — esas viven en la tabla `evidencia_archivos` (s3_key,
 * mime_type, size_bytes, etc). Aquí solo lo mínimo para renderizar la
 * lista en UI y para resolver el archivo real vía join por `id` cuando
 * se necesite (ej. generar una signed URL).
 *
 * `id` es el mismo UUID usado como nombre del objeto en S3
 * (evidencia/{registroId}/{id}.{ext}), no se genera un id aparte.
 */
export const evidenciaFileRefSchema = z.object({
	id: z.uuid(),
	filename: z.string(),
	status: evidenciaFileStatusEnum
});

export type EvidenciaFileRef = z.infer<typeof evidenciaFileRefSchema>;

export const evidenciaUrlRefSchema = z.object({
	id: z.uuid(),
	url: z.url()
});

export type EvidenciaUrlRef = z.infer<typeof evidenciaUrlRefSchema>;

export const etapaEvidenciaItemSchema = z
	.object({
		code: z.literal('evidencia'),
		file: z.array(evidenciaFileRefSchema).optional(),
		url: z.array(evidenciaUrlRefSchema).optional()
	})
	.extend(etapaInvalidatedItemSchema.shape);

export type EtapaEvidenciaItem = z.infer<typeof etapaEvidenciaItemSchema>;

/**
 * Schema del mini-form de "Agregar" (sube UN archivo y/o cambia la url
 * en la misma interacción). Esto NO es lo que se guarda en el jsonb —
 * es el input crudo que llega al server action. El action decide qué
 * actualizar según qué venga lleno/cambiado.
 *
 * `file` es opcional porque el usuario puede mandar solo url, solo
 * archivo, o ambos en la misma sumisión.
 */
export const etapaEvidenciaFormSchema = z.object({
	file: z.instanceof(File).refine((f) => f.size > 0, 'El archivo está vacío'),
	url: z.url().default('')
});

export type EtapaEvidenciaForm = z.infer<typeof etapaEvidenciaFormSchema>;

//etapa 3
export const etapaResultadosItemSchema = z
	.object({
		code: z.literal('resultados'),
		target: z.number().optional(),
		result: z.number().optional(),
		isGoalReached: z.boolean().optional(),
		reason: z.string().default('')
	})
	.extend(etapaInvalidatedItemSchema.shape);

export type EtapaResultadosItem = z.infer<typeof etapaResultadosItemSchema>;

export const etapaResultadosFormSchema = z.object({
	result: z.number().optional(),
	reason: z.string().optional()
});

export type EtapaResultadosForm = z.infer<typeof etapaResultadosFormSchema>;

//etapa 4
export const etapaAutoevaluacionEjecucionItemSchema = z
	.object({
		code: z.literal('autoevaluacion-ejecucion'),
		score: z.number().optional(),
		name: z.string().default(''),
		comment: z.string().optional()
	})
	.extend(etapaInvalidatedItemSchema.shape);

export type EtapaAutoevaluacionItem = z.infer<typeof etapaAutoevaluacionEjecucionItemSchema>;

//etapa 5
export const etapaAutoevaluacionRevisionItemSchema = z
	.object({
		code: z.literal('autoevaluacion-revision'),
		originalScore: z.number().optional(),
		score: z.number().optional(),
		originalName: z.string().default(''),
		name: z.string().default(''),
		comment: z.string().optional(),
		feedback: z.string().optional()
	})
	.extend(etapaInvalidatedItemSchema.shape);

export type EtapaAutoevaluacionRevisionItem = z.infer<typeof etapaAutoevaluacionRevisionItemSchema>;

//etapa 6
export const etapaCapturaPlanMejoraItemSchema = z
	.object({
		code: z.literal('captura'),
		agreements: z.string().default('')
	})
	.extend(etapaInvalidatedItemSchema.shape);

export type EtapaCapturaPlanMejoraItem = z.infer<typeof etapaCapturaPlanMejoraItemSchema>;

//etapa 7
export const etapaAutorizacionPlanMejoraItemSchema = z
	.object({
		code: z.literal('autorizacion'),
		agreements: z.string().default(''),
		authorized: z.boolean().default(false),
		comments: z.string().default('')
	})
	.extend(etapaInvalidatedItemSchema.shape);

export type EtapaAutorizacionPlanMejoraItem = z.infer<typeof etapaAutorizacionPlanMejoraItemSchema>;

//etapa 8
export const etapaEjecucionPlanMejoraItemSchema = z
	.object({
		code: z.literal('ejecucion'),
		processing: z.boolean().optional()
	})
	.extend(etapaInvalidatedItemSchema.shape);

export type EtapaEjecucionPlanMejoraItem = z.infer<typeof etapaEjecucionPlanMejoraItemSchema>;

// ============================================
// UNION DISCRIMINADA
// Zod usa el campo "code" para saber qué schema
// aplicar a cada objeto metadata.
// ============================================

export const etapaMetadataSchema = z.discriminatedUnion('code', [
	etapaMetaItemSchema,
	etapaEvidenciaItemSchema,
	etapaResultadosItemSchema,
	etapaAutoevaluacionEjecucionItemSchema,
	etapaAutoevaluacionRevisionItemSchema,
	etapaCapturaPlanMejoraItemSchema,
	etapaAutorizacionPlanMejoraItemSchema,
	etapaEjecucionPlanMejoraItemSchema
]);

export type EtapaMetadata = z.infer<typeof etapaMetadataSchema>;

/**
 * Deriva automáticamente { meta: EtapaMetaItem, evidencia: EtapaEvidenciaItem, ... }
 * a partir de la unión discriminada. Si agregas/quitas un miembro de
 * etapaMetadataSchema, este mapa se actualiza solo — cero mantenimiento manual.
 */
export type EtapaMetadataByCode = {
	[K in EtapaMetadata['code']]: Extract<EtapaMetadata, { code: K }>;
};

/**
 * Type guard: dado un EtapaMetadata cualquiera, confirma (para TS y en runtime)
 * que corresponde al código T y lo estrecha al tipo concreto.
 */
export function isEtapaMetadataOfCode<T extends EtapaMetadata['code']>(
	metadata: EtapaMetadata,
	code: T
): metadata is EtapaMetadataByCode[T] {
	return metadata.code === code;
}
