import { isRubricaRange } from '$lib/components/common/utils/rubricaUtils';
import type { IconName } from '$lib/components/ui/Icon.svelte';
import type { RubricaItem } from '$lib/schemas/rubrica.schema';

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
	originalScore: number,
	newScore?: number
): AutoevaluacionButtonConfig {
	/** Hay 4 casos:
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
	 */

	if (!isRubricaRange(rubrica, originalScore ?? 0) && !isRubricaRange(rubrica, newScore ?? 0)) {
		return { label: 'Seleccionar', isDisabled: false };
	} else if (isRubricaRange(rubrica, originalScore ?? 0) && newScore !== originalScore) {
		return { label: 'Seleccionado', isDisabled: true };
	} else if (isRubricaRange(rubrica, newScore ?? 0) && newScore !== originalScore) {
		return { label: 'Revisado', isDisabled: true, icon: 'check' };
	} else if (
		isRubricaRange(rubrica, originalScore ?? 0) &&
		isRubricaRange(rubrica, newScore ?? 0)
	) {
		return { label: 'Seleccionado', isDisabled: true, icon: 'check' };
	}
	return { label: 'Seleccionar', isDisabled: false };
}
