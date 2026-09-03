import z from 'zod';
import { INDICADOR_CONFIG_TYPE } from './indicador.schema';

export const indicadorNavListItemSchema = z.object({
	id: z.uuid(),//ESTE ID ES IMPORTANTE PARA INDEXAR LA LISTA EN SVELTE!! NO REMOVER!!!
	name: z.string(),
	code: z.enum(INDICADOR_CONFIG_TYPE).optional(),
	url: z.string(),
	order: z.number().positive(),
});

export type IndicadorNavListItem = z.infer<typeof indicadorNavListItemSchema>;
