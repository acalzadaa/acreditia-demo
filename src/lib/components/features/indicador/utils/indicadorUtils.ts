import type { OptionData } from '$lib/components/ui/select/utils/inputSelect';
import { INDICADOR_TYPE } from '$lib/schemas/indicador.schema';

export type IndicadorType = (typeof INDICADOR_TYPE)[number];

const INDICADOR_TYPE_LABELS: Record<IndicadorType, string> = {
	global: 'Indicador global',
	campus: 'Indicador por campus',
	unidadAcademica: 'Indicador por Unidad Academica'
};

export const indicadorTypeOptions: OptionData[] = INDICADOR_TYPE.map((v) => ({
	id: v,
	option: INDICADOR_TYPE_LABELS[v].toUpperCase()
}));

export function convertIndicadorTypeToLabel(type: IndicadorType): string {
	switch (type) {
		case 'campus':
			return INDICADOR_TYPE_LABELS['campus'];
		case 'global':
			return INDICADOR_TYPE_LABELS['global'];
		case 'unidadAcademica':
			return INDICADOR_TYPE_LABELS['unidadAcademica'];
		default:
			return '';
	}
}
