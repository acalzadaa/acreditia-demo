import { isRubricaRange } from '$lib/components/common/utils/rubricaUtils';
import type { IconName } from '$lib/components/ui/Icon.svelte';
import type { EvaluacionEtapaIndicadorItemFor } from '$lib/schemas/evaluacionEtapaIndicador.schema';
import type { RubricaItem } from '$lib/schemas/rubrica.schema';
import type { EvaluacionRevisionIndicadorItem } from '../etapa/metadata/autoevaluacion-revision/EvaluacionEtapaAutoevaluacionRevisionDetail.svelte';

interface AutoevaluacionButtonConfig {
	label: string;
	isDisabled: boolean;
	icon?: IconName;
}

export function selectAutoevaluacionEjecucionButtonConfig(
	rubrica: RubricaItem,
	score?: number
): AutoevaluacionButtonConfig {
	/** Hay 2 casos:
	 * 1) rubrica.startRange es diferente que score
	 * Label = 'seleccionar'
	 * 2) rubrica.startRange es igual a score
	 * Label = 'seleccionado'
	 * isDisabled = true
	 * icon = 'check'
	 */

	if (!isRubricaRange(rubrica, score ?? 0)) {
		return { label: 'Seleccionar', isDisabled: false };
	} else if (isRubricaRange(rubrica, score ?? 0)) {
		return { label: 'Seleccionado', isDisabled: true, icon: 'check' };
	}
	return { label: 'Seleccionar', isDisabled: false };
}

export function selectAutoevaluacionRevisionButtonConfig(
	rubrica: RubricaItem,
	item: EvaluacionRevisionIndicadorItem
): AutoevaluacionButtonConfig {
	/** Hay 5 casos:
	 * 1) rubrica.startRange es diferente que originalScore y score
	 * Label = 'seleccionar'
	 * 2) rubrica.startRange es igual a originalScore pero score es null.
	 * Label = 'seleccionado'
	 * isDisabled = true
	 * 3) rubrica.startRange es igual a score, pero diferente a originalScore.
	 * Label = 'revisado'
	 * isDisabled = true
	 * 4) rubrica.startRange es igual a score y a originalScore.
	 * Label = 'seleccionado'
	 * isDisabled = true
	 * 5) status = 'feedback-in-progress' o 'feedback-ready'
	 * isDisabled = true
	 */

	let returnConfig: AutoevaluacionButtonConfig = { label: 'Seleccionar', isDisabled: false };

	if (
		!isRubricaRange(rubrica, item.metadata.originalScore ?? 0) &&
		!isRubricaRange(rubrica, item.metadata.score ?? 0)
	) {
		returnConfig = { label: 'Seleccionar', isDisabled: false };
	} else if (
		isRubricaRange(rubrica, item.metadata.originalScore ?? 0) &&
		item.metadata.score !== item.metadata.originalScore
	) {
		returnConfig = { label: 'Seleccionado', isDisabled: true };
	} else if (
		isRubricaRange(rubrica, item.metadata.score ?? 0) &&
		item.metadata.originalScore !== item.metadata.score
	) {
		returnConfig = { label: 'Revisado', isDisabled: true, icon: 'check' };
	} else if (
		isRubricaRange(rubrica, item.metadata.originalScore ?? 0) &&
		isRubricaRange(rubrica, item.metadata.score ?? 0)
	) {
		returnConfig = { label: 'Seleccionado', isDisabled: true, icon: 'check' };
	}

	if (item.status === 'feedback_in_progress' || item.status === 'completed') {
		returnConfig = {
			...returnConfig,
			isDisabled: true
		};
	}
	return returnConfig;
}

export function appendScoreAndName(
	item: EvaluacionEtapaIndicadorItemFor<'autoevaluacion-revision'>,
	score: number,
	name: string
) {
	return {
		...item,
		metadata: {
			code: item.metadata.code,
			originalName: item.metadata.originalName,
			name: name,
			originalScore: item.metadata.originalScore,
			invalidate: item.metadata.invalidate,
			invalidateReason: item.metadata.invalidateReason,
			score: score
		}
	};
}
