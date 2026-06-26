import z from 'zod';

export const evaluacionDetailItemSchema = z.object({
	id: z.uuid(),
	name: z.string(),
	url: z.string(),
	order: z.number().positive()
});

export type EvaluacionDetailItem = z.infer<typeof evaluacionDetailItemSchema>;
