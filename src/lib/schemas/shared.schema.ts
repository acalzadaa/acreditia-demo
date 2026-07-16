// ============================================
// 1. REFERENCE SCHEMAS
// ============================================

import z from 'zod';

// Base reference schema
export const baseRefSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  name: z.string()
});
export type BaseRef = z.infer<typeof baseRefSchema>;

export const regionRefSchema = baseRefSchema;
export type RegionRef = z.infer<typeof regionRefSchema>;

export const campusAreaResponsableRefSchema = z.object({
	areaResponsableId: z.uuid(),
	campusId: z.uuid()
});
export type CampusAreaResponsableRef = z.infer<typeof campusAreaResponsableRefSchema>;

export const areaResponsableRefSchema = baseRefSchema;
export type AreaResponsableRef = z.infer<typeof areaResponsableRefSchema>;

export const seccionRefSchema = baseRefSchema;
export type SeccionRef = z.infer<typeof seccionRefSchema>;

export const capituloRefSchema = baseRefSchema;
export type CapituloRef = z.infer<typeof capituloRefSchema>;

export const modeloRefSchema = baseRefSchema;
export type ModeloRef = z.infer<typeof modeloRefSchema>;

export const institucionRefSchema = baseRefSchema;
export type InstitucionRef = z.infer<typeof institucionRefSchema>;

export const campusRefSchema = baseRefSchema;
export type CampusRef = z.infer<typeof campusRefSchema>;

export const unidadAcademicaRefSchema = baseRefSchema;
export type UnidadAcademicaRef = z.infer<typeof unidadAcademicaRefSchema>;

export const puestoRefSchema = baseRefSchema;
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
