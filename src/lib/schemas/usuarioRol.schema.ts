import { z } from 'zod';
import { auditMetadataSchema } from './shared.schema';

export const usuarioRolFormSchema = z.object({
	id: z.uuid().optional(),
	usuarioId: z.uuid('Debes seleccionar un usuario'),
	rolId: z.uuid('Debes seleccionar un rol'),
	createdBy: z.string().optional()
});
export type UsuarioRolForm = z.infer<typeof usuarioRolFormSchema>;

export const usuarioRolItemSchema = z
	.object({
		id: z.uuid(),
		usuarioId: z.uuid(),
		rolId: z.uuid()
	})
	.extend(auditMetadataSchema.shape);
export type UsuarioRolItem = z.infer<typeof usuarioRolItemSchema>;
