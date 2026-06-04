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
