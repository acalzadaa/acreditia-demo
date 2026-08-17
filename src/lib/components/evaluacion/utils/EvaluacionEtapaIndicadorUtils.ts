import type { BadgeStatus } from '$lib/components/ui/Badge.svelte';
import type { IconName } from '$lib/components/ui/Icon.svelte';
import { isEtapaMetadataOfCode, type EtapaMetadataByCode } from '$lib/schemas/etapaMetadata.schema';
import type {
	EvaluacionEtapaIndicadorItem,
	EvaluacionEtapaIndicadorItemFor,
	EvaluacionEtapaIndicadorStatus
} from '$lib/schemas/evaluacionEtapaIndicador.schema';

const EVALUACION_ETAPA_INDICADOR_STATUS_TO_BADGE_CONFIG: Record<
	EvaluacionEtapaIndicadorStatus,
	{
		evaluacionStatus: EvaluacionEtapaIndicadorStatus;
		badgeStatus: BadgeStatus;
		icon?: IconName;
		label: string;
	}
> = {
	pending: {
		evaluacionStatus: 'pending',
		badgeStatus: 'info',
		label: 'Creado'
	},
	in_process: {
		evaluacionStatus: 'in_process',
		badgeStatus: 'info',
		label: 'En proceso'
	},
	ready: {
		evaluacionStatus: 'ready',
		badgeStatus: 'info',
		icon: 'check',
		label: 'Listo para enviar'
	},
	completed: {
		evaluacionStatus: 'completed',
		badgeStatus: 'success',
		icon: 'check',
		label: 'Completado'
	},
	invalidate_request: {
		evaluacionStatus: 'invalidate_request',
		badgeStatus: 'warning',
		label: 'Peticion de invalidacion'
	},
	forced_in_process: {
		evaluacionStatus: 'forced_in_process',
		badgeStatus: 'warning',
		label: 'En proceso obligatorio'
	},
	forced_ready: {
		evaluacionStatus: 'forced_ready',
		badgeStatus: 'info',
		icon: 'check',
		label: 'Listo para enviar'
	},
	feedback_ready: {
		evaluacionStatus: 'ready',
		badgeStatus: 'info',
		icon: 'check',
		label: 'Listo para enviar'
	},
	feedback_in_progress: {
		evaluacionStatus: 'in_process',
		badgeStatus: 'info',
		label: 'Retroalimentacion en proceso'
	}
};

export function convertEvaluacionEtapaIndicadorStatusToBadgeVariant(
	status: EvaluacionEtapaIndicadorStatus
): {
	evaluacionStatus: EvaluacionEtapaIndicadorStatus;
	badgeStatus: BadgeStatus;
	icon?: IconName;
	label: string;
} {
	return EVALUACION_ETAPA_INDICADOR_STATUS_TO_BADGE_CONFIG[status];
}

/**
 * Filtra items por etapaCode y devuelve todo el objeto
 */
export function extractEtapaItems<T extends EtapaMetadataByCode[keyof EtapaMetadataByCode]['code']>(
	items: EvaluacionEtapaIndicadorItem[],
	etapaCode: T
): EvaluacionEtapaIndicadorItemFor<T>[] {
	return items.filter((item): item is EvaluacionEtapaIndicadorItemFor<T> =>
		isEtapaMetadataOfCode(item.metadata, etapaCode)
	);
}

// Definir transiciones válidas
type TransitionMap = {
	[K in EvaluacionEtapaIndicadorStatus]?: EvaluacionEtapaIndicadorStatus[];
};

const TRANSITIONS: TransitionMap = {
	pending: ['in_process'],
	in_process: ['ready', 'invalidate_request'],
	ready: ['completed', 'feedback_in_progress'],
	invalidate_request: ['completed', 'forced_in_process'],
	forced_in_process: ['forced_ready'],
	forced_ready: ['completed'],
	feedback_in_progress: ['feedback_ready'],
	feedback_ready: ['completed'],
	completed: []
};

export function canTransition(
	current: EvaluacionEtapaIndicadorStatus,
	next: EvaluacionEtapaIndicadorStatus
): boolean {
	const allowed = TRANSITIONS[current] || [];
	return allowed.includes(next);
}

export function getAvailableActions(status: EvaluacionEtapaIndicadorStatus): EvaluacionAction[] {
	const actionMap: Record<EvaluacionEtapaIndicadorStatus, EvaluacionAction[]> = {
		pending: [],
		in_process: ['edit', 'invalidate'],
		ready: ['edit', 'upload', 'invalidate'],
		completed: [],
		invalidate_request: ['accept', 'reject'],
		forced_in_process: ['edit'],
		forced_ready: ['upload'],
		feedback_in_progress: ['edit_feedback'],
		feedback_ready: ['edit_feedback', 'upload']
	};

	return actionMap[status] || [];
}

export type EvaluacionAction =
	'edit_feedback' | 'edit' | 'upload' | 'invalidate' | 'accept' | 'reject';

export function isEvaluacionEtapaIndicadorActionDisabled(
	item: EvaluacionEtapaIndicadorStatus,
	action: EvaluacionAction
): { visible: boolean; disabled: boolean } {
	switch (action) {
		case 'edit_feedback': {
			return {
				visible: true,
				disabled: !getAvailableActions(item).includes('edit_feedback')
			};
		}
		case 'edit': {
			return {
				visible: item !== 'invalidate_request',
				disabled: !getAvailableActions(item).includes('edit')
			};
		}

		case 'upload': {
			return {
				visible: item !== 'invalidate_request',
				disabled: !getAvailableActions(item).includes('upload')
			};
		}

		case 'invalidate': {
			return {
				visible: item !== 'invalidate_request',
				disabled: !getAvailableActions(item).includes('invalidate')
			};
		}

		case 'accept': {
			return {
				visible: item === 'invalidate_request',
				disabled: !getAvailableActions(item).includes('accept')
			};
		}

		case 'reject': {
			return {
				visible: item === 'invalidate_request',
				disabled: !getAvailableActions(item).includes('reject')
			};
		}

		default:
			return {
				visible: true,
				disabled: false
			};
	}
}

export function formatNumberOfElementsAndText(
	value: unknown[] | null | undefined,
	singular: string,
	plural: string
) {
	const count = Array.isArray(value) ? value.length : 0;

	if (count === 1) {
		return `${count} ${singular}`;
	}
	return `${count} ${plural}`;
}
