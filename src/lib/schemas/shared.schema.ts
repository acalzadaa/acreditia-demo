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

export const calidadSeccionRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});
export type CalidadSeccionRef = z.infer<typeof calidadSeccionRefSchema>;

export const calidadCapituloRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});
export type CalidadCapituloRef = z.infer<typeof calidadCapituloRefSchema>;

export const calidadModeloRefSchema = z.object({
	id: z.uuid(),
	code: z.string(),
	name: z.string()
});
export type CalidadModeloRef = z.infer<typeof calidadModeloRefSchema>;
