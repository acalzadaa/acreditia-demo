// ============================================
// 1. REFERENCE SCHEMAS
// ============================================

import z from 'zod';

/**
 * Este caso se utiliza cuando se tiene una lista de elementos padres,
 * y se desea identificar un elemento hijo especifico que esta dentro de un elemento padre especifico.
 * En el caso de un create, el hijo aun no tiene un id, por lo que se puede enviar solo el parentId.
 * Util en actions: create, add, remove, edit, delete, etc.
 *
 */

export const identifyParentChildItemSchema = z.object({
	parentId: z.uuid(),
	childId: z.uuid().optional()
});

export type IdentifyParentChildItemSchema = z.infer<typeof identifyParentChildItemSchema>;

//SDC Type 2 - Metadata, este objeto debe agregarse a todos los objetos raiz que requieran auditoria
export const auditMetadataSchema = z.object({
	version: z.number().default(0),
	isCurrent: z.boolean().default(true),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean().default(false),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string()
});

export type AuditMetadata = z.infer<typeof auditMetadataSchema>;

// Base reference schema - este objeto es la base de SCD type2 se debe agregar a todos los objetos que utilizen auditoria
export const baseRefSchema = z.object({
	id: z.uuid(), //id de una version especifica
	uniqueId: z.uuid().optional(), //id unico de un grupo de versiones
	code: z.string(), //usar este code solo para UI
	name: z.string(), //usar este nombre para mostrar en UI
	slug: z.string().optional() //implementar este slug como version modificada de code para mostrar en url
});
export type BaseRef = z.infer<typeof baseRefSchema>;

export const fileSchema = z.object({
	file: z.instanceof(File).refine((f) => f.size > 0, 'El archivo está vacío')
});

export const regionRefSchema = baseRefSchema;
export type RegionRef = z.infer<typeof regionRefSchema>;

export const campusAreaResponsableRefSchema = z.object({
	areaResponsableId: z.uuid(),
	campusId: z.uuid()
});
export type CampusAreaResponsableRef = z.infer<typeof campusAreaResponsableRefSchema>;

export const AREA_RESPONSABLE_TYPE = ['global', 'campus', 'unidad academica'];
export const areaResponsableRefSchema = baseRefSchema.extend({
	type: z.enum(AREA_RESPONSABLE_TYPE)
});
export type AreaResponsableRef = z.infer<typeof areaResponsableRefSchema>;

export const institucionRefSchema = baseRefSchema;
export type InstitucionRef = z.infer<typeof institucionRefSchema>;

export const campusRefSchema = baseRefSchema;
export type CampusRef = z.infer<typeof campusRefSchema>;

export const unidadAcademicaRefSchema = baseRefSchema;
export type UnidadAcademicaRef = z.infer<typeof unidadAcademicaRefSchema>;

export const JOB_SCOPE = ['funcional', 'responsable', 'region'];
export const JOB_TYPE = ['directivo', 'operativo', 'administrativo'];

export const puestoRefSchema = baseRefSchema.extend({
	scope: z.enum(JOB_SCOPE),
	type: z.enum(JOB_TYPE)
});

export type PuestoRef = z.infer<typeof puestoRefSchema>;

export const areaFuncionalRefSchema = baseRefSchema;
export type AreaFuncionalRef = z.infer<typeof areaFuncionalRefSchema>;

export const evaluacionRefSchema = baseRefSchema;
export type EvaluacionRef = z.infer<typeof evaluacionRefSchema>;

export const normativaRefSchema = baseRefSchema;
export type NormativaRef = z.infer<typeof normativaRefSchema>;

export const rubricaCriterioRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	criterio: z.string()
});
export type RubricaCriterioRef = z.infer<typeof rubricaCriterioRefSchema>;

export const rubricaRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	rangeStart: z.number().int().min(1, 'El inicio debe ser al menos 1'),
	rangeEnd: z.number().int().max(10, 'El fin no puede exceder 10'),
	order: z.number().int().min(1).max(5, 'Solo se permiten 5 rúbricas')
});
export type RubricaRef = z.infer<typeof rubricaRefSchema>;

export const indicadorRefSchema = baseRefSchema;
export type IndicadorRef = z.infer<typeof indicadorRefSchema>;

export const usuarioCampusRefSchema = z.object({
	id: z.uuid(),
	usuarioId: z.uuid(),
	campusId: z.uuid()
});
export type UsuarioCampusRef = z.infer<typeof usuarioCampusRefSchema>;

export const usuarioPuestoRefSchema = z.object({
	id: z.uuid(),
	usuarioId: z.uuid(),
	puestoId: z.uuid()
});
export type UsuarioPuestoRef = z.infer<typeof usuarioPuestoRefSchema>;

export const usuarioRefSchema = z.object({
	id: z.uuid(),
	firstName: z.string().default(''),
	lastName: z.string().default(''),
	email: z.email()
});
export type UsuarioRef = z.infer<typeof usuarioRefSchema>;

export const permisoRefSchema = z.object({
	id: z.uuid(),
	action: z.string(),
	resource: z.string()
});
export type PermisoRef = z.infer<typeof permisoRefSchema>;
