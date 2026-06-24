import { z } from 'zod';

// ============================================
// Códigos de etapa (debe coincidir con etapaRefSchema.code)
// ============================================

export const EtapaCodeEnum = z.enum([
	'meta',
	'evidencia',
	'captura',
	'autoevaluacion',
	'revision',
	'planMejora',
	'autorizacion',
	'ejecucion'
]);
export type EtapaCode = z.infer<typeof EtapaCodeEnum>;

// ============================================
// Schema compartido para "no aplicable"
// (se puede mezclar con cualquier etapa vía .extend() o .merge())
// ============================================

export const etapaNotAppliableItemSchema = z.object({
	notAppliable: z.boolean(),
	notAppliableExplain: z.string()
});

// ============================================
// Metadata por etapa — CADA UNA lleva su propio
// campo discriminante `code` como literal
// ============================================

//etapa 1
export const etapaMetaItemSchema = z.object({
	code: z.literal('meta'),
	target: z.coerce.number().default(0),
	targetUnit: z.string().default('')
});

export type EtapaMetaItem = z.infer<typeof etapaMetaItemSchema>;

export const etapaMetaFormSchema = z.object({
	target: z.coerce.number().default(0),
	targetUnit: z.string().optional()
});

export type EtapaMetaForm = z.infer<typeof etapaMetaFormSchema>;

//etapa 2
export const etapaEvidenciaItemSchema = z.object({
	code: z.literal('evidencia'),
	file: z.array(z.string()).optional(),
	url: z.url().optional()
});

export type EtapaEvidenciaItem = z.infer<typeof etapaEvidenciaItemSchema>;

//etapa 3
export const etapaCapturaResultadosItemSchema = z.object({
	code: z.literal('resultados'),
	resultado: z.number().optional(),
	cumplioMeta: z.boolean().optional(),
	justificacion: z.string().optional()
});

export type EtapaCapturaResultadosItem = z.infer<typeof etapaCapturaResultadosItemSchema>;

//etapa 4
export const etapaCapturaAutoevaluacionItemSchema = z.object({
	code: z.literal('autoevaluacion'),
	puntaje: z.number().optional(),
	comentario: z.string().optional()
});

export type EtapaCapturaAutoevaluacionItem = z.infer<typeof etapaCapturaAutoevaluacionItemSchema>;

//etapa 5
export const etapaRevisionAutoevaluacionItemSchema = z.object({
	code: z.literal('revision-autoevaluacion'),
	acuerdos: z.string().optional(),
	aceptado: z.boolean().optional(),
	puntaje: z.number().optional(),
	comentario: z.string().optional()
});

export type EtapaRevisionAutoevaluacionItem = z.infer<typeof etapaRevisionAutoevaluacionItemSchema>;

//etapa 6
export const etapaCapturaPlanMejoraItemSchema = z.object({
	code: z.literal('captura-plan-mejora'),
	acuerdos: z.string().optional()
});

export type EtapaCapturaPlanMejoraItem = z.infer<typeof etapaCapturaPlanMejoraItemSchema>;

//etapa 7
export const etapaAutorizacionPlanMejoraItemSchema = z.object({
	code: z.literal('autorizacion-plan-mejora'),
	autorizado: z.boolean().optional()
});

export type EtapaAutorizacionPlanMejoraItem = z.infer<typeof etapaAutorizacionPlanMejoraItemSchema>;

//etapa 8
export const etapaEjecucionPlanMejoraItemSchema = z.object({
	code: z.literal('ejecucion-plan-mejora'),
	enEjecucion: z.boolean().optional()
});

export type EtapaEjecucionPlanMejoraItem = z.infer<typeof etapaEjecucionPlanMejoraItemSchema>;

// ============================================
// UNION DISCRIMINADA
// Zod usa el campo "code" para saber qué schema
// aplicar a cada objeto metadata.
// ============================================

export const etapaMetadataSchema = z.discriminatedUnion('code', [
	etapaMetaItemSchema,
	etapaEvidenciaItemSchema,
	etapaCapturaResultadosItemSchema,
	etapaCapturaAutoevaluacionItemSchema,
	etapaRevisionAutoevaluacionItemSchema,
	etapaCapturaPlanMejoraItemSchema,
	etapaAutorizacionPlanMejoraItemSchema,
	etapaEjecucionPlanMejoraItemSchema
]);

export type EtapaMetadata = z.infer<typeof etapaMetadataSchema>;
