import { z } from 'zod';
import { auditMetadata, baseRefSchema } from './shared.schema';

export const rolFormSchema = z.object({
	id: z.uuid().optional(),
	name: z.string().min(1, 'El nombre es requerido'),
	description: z.string().default(''),
	createdBy: z.string().optional()
});
export type RolForm = z.infer<typeof rolFormSchema>;

export const rolItemSchema = baseRefSchema
	.extend({
		description: z.string().default('')
	})
	.extend(auditMetadata.shape);
export type RolItem = z.infer<typeof rolItemSchema>;
