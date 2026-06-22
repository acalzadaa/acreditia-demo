// ============================================
// 1. REFERENCE SCHEMAS
// ============================================

import z from 'zod';

export const regionRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type RegionRef = z.infer<typeof regionRefSchema>;

export const campusAreaResponsableRefSchema = z.object({
	areaResponsableId: z.uuid(),
	campusId: z.uuid()
});

export type CampusAreaResponsableRef = z.infer<typeof campusAreaResponsableRefSchema>;

export const areaResponsableRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type AreaResponsableRef = z.infer<typeof areaResponsableRefSchema>;

export const seccionRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});
export type SeccionRef = z.infer<typeof seccionRefSchema>;

export const capituloRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});
export type CapituloRef = z.infer<typeof capituloRefSchema>;

export const modeloRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});
export type ModeloRef = z.infer<typeof modeloRefSchema>;

export const institucionRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type InstitucionRef = z.infer<typeof institucionRefSchema>;

export const campusRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type CampusRef = z.infer<typeof campusRefSchema>;

export const unidadAcademicaRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type UnidadAcademicaRef = z.infer<typeof unidadAcademicaRefSchema>;

export const puestoRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});

export type PuestoRef = z.infer<typeof puestoRefSchema>;

export const usuarioRefSchema = z.object({
	id: z.uuid(),
	firstName: z.string().default(''),
	lastName: z.string().default(''),
	email: z.email()
});

export type UsuarioRef = z.infer<typeof usuarioRefSchema>;

export const areaFuncionalRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

export type AreaFuncionalRef = z.infer<typeof areaFuncionalRefSchema>;

export const evaluacionRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});
export type EvaluacionRef = z.infer<typeof evaluacionRefSchema>;

export const normativaRefSchema = z.object({
	id: z.uuid(),
	code: z.string().min(1, 'El código es requerido'),
	name: z.string().min(1, 'El nombre es requerido')
});

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
