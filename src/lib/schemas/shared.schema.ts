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

export const areaResponsableCampusRefSchema = z.object({
	areaResponsableId: z.uuid(),
	campusId: z.uuid()
});

export type AreaResponsableCampusRef = z.infer<typeof areaResponsableCampusRefSchema>;

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
