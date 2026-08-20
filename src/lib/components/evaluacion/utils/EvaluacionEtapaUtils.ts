import type { BadgeStatus } from '$lib/components/ui/Badge.svelte';
import type { IconName } from '$lib/components/ui/Icon.svelte';
import { formatDate } from '$lib/helpers/dates';
import {  type EvaluacionEtapaItem, type EvaluacionEtapaStatus } from '$lib/schemas/evaluacionEtapa.schema';

export function formatEtapaDateRange(
	startDate?: Date | null | undefined,
	endDate?: Date | null | undefined
) {
	const formattedStartDate = formatDate(startDate);
	const formattedEndDate = formatDate(endDate);
	const etapaDateRangeText = `Del ${formattedStartDate} al ${formattedEndDate}`;
	return etapaDateRangeText;
}

export function isEtapaDateRange(startDate?: unknown, endDate?: unknown) {
	if (startDate && endDate) {
		return true;
	}
	return false;
}

export function formatEtapaHeader(item: EvaluacionEtapaItem) {
	return `Etapa ${item.etapa.order} - ${item.etapa.name}`;
}

export function formatEtapaContentItem(date: Date | null | undefined) {
	if (!date) {
		return 'Agregar fecha';
	} else {
		return formatDate(date);
	}
}

export function isEvalucionEtapaPlaneacionReady(item: EvaluacionEtapaItem): boolean {
	if (isEvaluacionEtapaFechaExtraordinariaReady(item) && isEvaluacionEtapaFechaReady(item)) {
		return true;
	}
	return false;
}

function isEvaluacionEtapaFechaExtraordinariaReady(item: EvaluacionEtapaItem): boolean {
	if (
		item.periodoExtraordinario &&
		(!item.periodoExtraordinarioFinal || !item.periodoExtraordinarioInicio)
	) {
		return false;
	}
	return true;
}

function isEvaluacionEtapaFechaReady(item: EvaluacionEtapaItem): boolean {
	if (!item.fechaInicio || !item.fechaFinal) {
		return false;
	}
	return true;
}

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
		label: 'Planeando'
	},
	ready: {
		evaluacionStatus: 'ready',
		badgeStatus: 'success',
		icon: 'check',
		label: 'Planeación completa'
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

export function convertEvaluacionEtapaStatusToBadgeVariant(status: EvaluacionEtapaStatus): {
	evaluacionStatus: EvaluacionEtapaStatus;
	badgeStatus: BadgeStatus;
	icon: IconName;
	label: string;
} {
	return EVALUACION_ETAPA_STATUS_TO_BADGE_CONFIG[status];
}
