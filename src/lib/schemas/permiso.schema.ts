import { z } from 'zod';
import { auditMetadataSchema } from './shared.schema';

export const permisoFormSchema = z.object({
	id: z.uuid().optional(),
	action: z.string().min(1, 'La acción es requerida'), // 'create', 'read', 'update', 'delete'
	resource: z.string().min(1, 'El recurso es requerido'), // 'areaResponsable', 'filosofia', 'areaFuncional', etc
	description: z.string().default(''),
	createdBy: z.string().optional()
});
export type PermisoForm = z.infer<typeof permisoFormSchema>;

export const permisoItemSchema = z
	.object({
		id: z.uuid(),
		action: z.string(),
		resource: z.string(),
		description: z.string().default('')
	})
	.extend(auditMetadataSchema.shape);
export type PermisoItem = z.infer<typeof permisoItemSchema>;
