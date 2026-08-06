import type { BadgeStatus } from '$lib/components/ui/Badge.svelte';
import type { IconName } from '$lib/components/ui/Icon.svelte';
import type {
	EvaluacionEtapaEjecucionStatus,
	EvaluacionEtapaItem
} from '$lib/schemas/evaluacionEtapa.schema';
import { getEtapaStatus } from './EvaluacionEtapaUtils';

const EVALUACION_ETAPA_EJECUCION_STATUS_TO_BADGE_CONFIG: Record<
	EvaluacionEtapaEjecucionStatus,
	{
		evaluacionStatus: EvaluacionEtapaEjecucionStatus;
		badgeStatus: BadgeStatus;
		icon: IconName;
		label: string;
	}
> = {
	pendiente: {
		evaluacionStatus: 'pendiente',
		badgeStatus: 'info',
		icon: 'close',
		label: 'Pendiente'
	},
	activo: { evaluacionStatus: 'activo', badgeStatus: 'success', icon: 'check', label: 'En curso' },
	finalizado: {
		evaluacionStatus: 'finalizado',
		badgeStatus: 'warning',
		icon: 'check',
		label: 'Finalizado'
	}
};

export function convertStatusToBadgeVariant(status: EvaluacionEtapaEjecucionStatus): {
	evaluacionStatus: EvaluacionEtapaEjecucionStatus;
	badgeStatus: BadgeStatus;
    icon: IconName;
	label: string;
} {
	return EVALUACION_ETAPA_EJECUCION_STATUS_TO_BADGE_CONFIG[status];
}

export function convertDateRangeToBadgeVariant(item: EvaluacionEtapaItem, currentDate: Date) {
	return convertStatusToBadgeVariant(getEtapaStatus(item, currentDate));
}
