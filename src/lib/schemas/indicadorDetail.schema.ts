import z from 'zod';

export const indicadorDetailItemSchema = z.object({
	id: z.uuid(),
	name: z.string(),
	url: z.string(),
	order: z.number().positive()
});

export type IndicadorDetailItem = z.infer<typeof indicadorDetailItemSchema>;
