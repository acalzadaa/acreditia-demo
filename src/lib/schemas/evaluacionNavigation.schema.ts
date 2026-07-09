import z from 'zod';

export const evaluacionNavItemSchema = z.object({
	id: z.uuid(),
	name: z.string(),
	url: z.string(),
	order: z.number().positive()
});

export type EvaluacionNavItem = z.infer<typeof evaluacionNavItemSchema>;
