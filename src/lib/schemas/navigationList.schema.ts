import z from 'zod';

export const navigationListItemSchema = z.object({
	id: z.uuid(),
	name: z.string(),
	label: z.string(),
	url: z.string(),
	order: z.number().positive()
});

export type navigationListItem = z.infer<typeof navigationListItemSchema>;
