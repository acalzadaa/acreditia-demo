import type { BadgeStatus } from '$lib/components/ui/Badge.svelte';
import type { IconName } from '$lib/components/ui/Icon.svelte';
import type {
	EvaluacionEtapaStatus
} from '$lib/schemas/evaluacionEtapa.schema';

const EVALUACION_ETAPA_STATUS_TO_BADGE_CONFIG: Record<
	EvaluacionEtapaStatus,
	{
		evaluacionStatus: EvaluacionEtapaStatus;
		badgeStatus: BadgeStatus;
		icon: IconName;
		label: string;
	}
> = {
	planning: {
		evaluacionStatus: 'planning',
		badgeStatus: 'info',
		icon: 'close',
		label: 'Planeando fechas'
	},
	ready: {
		evaluacionStatus: 'ready',
		badgeStatus: 'success',
		icon: 'check',
		label: 'Planeacion completa'
	},
	pending: { evaluacionStatus: 'pending', badgeStatus: 'info', icon: 'check', label: 'En espera' },
	active: {
		evaluacionStatus: 'active',
		badgeStatus: 'success',
		icon: 'check',
		label: 'En proceso'
	},
	completed: {
		evaluacionStatus: 'completed',
		badgeStatus: 'warning',
		icon: 'check',
		label: 'Finalizado'
	}
};

export function convertStatusToBadgeVariant(status: EvaluacionEtapaStatus): {
	evaluacionStatus: EvaluacionEtapaStatus;
	badgeStatus: BadgeStatus;
	icon: IconName;
	label: string;
} {
	return EVALUACION_ETAPA_STATUS_TO_BADGE_CONFIG[status];
}
