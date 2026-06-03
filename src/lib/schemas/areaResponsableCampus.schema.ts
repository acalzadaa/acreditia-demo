// areaResponsableCampus.schema.ts
import { z } from 'zod';
import { campusRefSchema } from './campus.schema';
import { areaResponsableRefSchema } from './shared.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const areaResponsableCampusFormSchema = z.object({
	// Para nuevas asignaciones, el ID es opcional (se genera en backend)
	id: z.uuid().optional(),

	// Business key (lo que identifica lógicamente la relación)
	areaResponsableId: z.uuid('Debes seleccionar un área responsable'),
	campusId: z.uuid('Debes seleccionar un campus'),

	createdBy: z.string().optional()

});

export type AreaResponsableCampusForm = z.infer<typeof areaResponsableCampusFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const areaResponsableCampusItemSchema = z.object({
	// Surrogate key (identificador único de la versión)
	id: z.uuid(),

	// Business key
	areaResponsableId: z.uuid(),
	campusId: z.uuid(),

	// SCD Type 2 fields
	version: z.number().int().nonnegative(),
	isCurrent: z.boolean(),
	validFrom: z.coerce.date(),
	validTo: z.coerce.date().nullable(),
	isDeleted: z.boolean(),

	// Auditoría
	createdAt: z.iso.datetime().nullable().optional(),
	createdBy: z.string()
});

export type AreaResponsableCampusItem = z.infer<typeof areaResponsableCampusItemSchema>;

// ============================================
// 4. ITEM WITH RELATIONS SCHEMA
// ============================================
export const areaResponsableCampusWithRelationsItemSchema = areaResponsableCampusItemSchema.extend({
	areaResponsable: areaResponsableRefSchema.optional(),
	campus: campusRefSchema.optional()
});

export type AreaResponsableCampusWithRelationsItem = z.infer<
	typeof areaResponsableCampusWithRelationsItemSchema
>;

// ============================================
// 5. CONFIG SCHEMA
// ============================================
export const areaResponsableCampusConfigSchema = z.object({
	areaResponsableCampusItems: z.array(areaResponsableCampusItemSchema)
});

export type AreaResponsableCampusConfig = z.infer<typeof areaResponsableCampusConfigSchema>;

// ============================================
// 6. DTO PARA CREAR NUEVA VERSIÓN (útil en servicios)
// ============================================
export const createAreaResponsableCampusVersionSchema = z.object({
	areaResponsableId: z.uuid(),
	campusId: z.uuid(),
	createdBy: z.string()
});

export type CreateAreaResponsableCampusVersion = z.infer<
	typeof createAreaResponsableCampusVersionSchema
>;

// ============================================
// 7. DTO PARA ACTUALIZAR (desactivar versión actual)
// ============================================
export const deactivateAreaResponsableCampusVersionSchema = z.object({
	id: z.uuid(),
	validTo: z.coerce.date().default(() => new Date())
});

export type DeactivateAreaResponsableCampusVersion = z.infer<
	typeof deactivateAreaResponsableCampusVersionSchema
>;