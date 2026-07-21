import { z } from 'zod';
import { auditMetadataSchema } from './shared.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const rolPermisoFormSchema = z.object({
	id: z.uuid().optional(),
	rolId: z.uuid('Debes seleccionar un rol'),
	permisoId: z.uuid('Debes seleccionar un permiso'),
	createdBy: z.string().optional()
});

export type RolPermisoForm = z.infer<typeof rolPermisoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const rolPermisoItemSchema = z
	.object({
		id: z.uuid(),
		rolId: z.uuid(),
		permisoId: z.uuid()
	})
	.extend(auditMetadataSchema.shape);

export type RolPermisoItem = z.infer<typeof rolPermisoItemSchema>;

// ============================================
// 5. CONFIG SCHEMA
// ============================================
export const rolPermisoConfigSchema = z.object({
	rolPermisoItems: z.array(rolPermisoItemSchema)
});

export type RolPermisoConfig = z.infer<typeof rolPermisoConfigSchema>;