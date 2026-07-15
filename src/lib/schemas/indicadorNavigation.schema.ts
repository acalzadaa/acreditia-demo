import z from 'zod';

export const indicadorNavListItemSchema = z.object({
	id: z.uuid(),
	name: z.string(),
	url: z.string(),
	order: z.number().positive()
});

export type indicadorNavListItem = z.infer<typeof indicadorNavListItemSchema>;
