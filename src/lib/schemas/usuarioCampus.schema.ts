import { z } from 'zod';
import { auditMetadataSchema } from './shared.schema';

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const usuarioCampusFormSchema = z.object({
	id: z.uuid().optional(),
	usuarioId: z.uuid('Debes seleccionar un usuario'),
	campusId: z.uuid('Debes seleccionar un campus'),
	createdBy: z.string().optional()
});

export type UsuarioCampusForm = z.infer<typeof usuarioCampusFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const usuarioCampusItemSchema = z
	.object({
		id: z.uuid(),
		usuarioId: z.uuid(),
		campusId: z.uuid()
	})
	.extend(auditMetadataSchema.shape);

export type UsuarioCampusItem = z.infer<typeof usuarioCampusItemSchema>;

// ============================================
// 5. CONFIG SCHEMA
// ============================================
export const usuarioCampusConfigSchema = z.object({
	usuarioCampusItems: z.array(usuarioCampusItemSchema)
});

export type UsuarioCampusConfig = z.infer<typeof usuarioCampusConfigSchema>;
