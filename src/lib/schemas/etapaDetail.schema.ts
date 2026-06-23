import z from 'zod';

export const etapaDetailItemSchema = z.object({
	id: z.uuid(),
	name: z.string(),
	url: z.string(),
	order: z.number().positive()
});

export type EtapaDetailItem = z.infer<typeof etapaDetailItemSchema>;
