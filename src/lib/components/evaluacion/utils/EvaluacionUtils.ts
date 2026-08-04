import { type EvaluacionItem, type EvaluacionStatus } from '$lib/schemas/evaluacion.schema';
import type { BadgeStatus } from '../../ui/Badge.svelte';

const STATUS_TO_BADGE_CONFIG: Record<
	EvaluacionStatus,
	{ evaluacionStatus: EvaluacionStatus; badgeStatus: BadgeStatus; label: string }
> = {
	planning: { evaluacionStatus: 'planning', badgeStatus: 'info', label: 'En planeacion' },
	ready: { evaluacionStatus: 'ready', badgeStatus: 'success', label: 'Listo' },
	running: { evaluacionStatus: 'running', badgeStatus: 'success', label: 'En ejecucion' },
	completed: { evaluacionStatus: 'completed', badgeStatus: 'warning', label: 'Completado' }
};

export function convertStatusToBadgeVariant(status: EvaluacionStatus): {
	evaluacionStatus: EvaluacionStatus;
	badgeStatus: BadgeStatus;
	label: string;
} {
	return STATUS_TO_BADGE_CONFIG[status];
}

export type EvaluacionAction = 'execute' | 'detail' | 'edit' | 'delete' | 'restore';

export function isActionDisabled(item: EvaluacionItem, action: EvaluacionAction) {
	switch (action) {
		/* DELETED debe estar desactivada si: 
		la evaluacion esta borrada: item.isDeleted === true
		la evaluacion esta o estuvo en ejecucion: item.startedAt !== null
		la evaluacion no tiene estatus PLANNING
		*/
		case 'delete': {
			return item.isDeleted || item.startedAt !== null || item.status !== 'planning';
		}

		/* DETAIL debe estar desactivada si: 
		la evaluacion esta borrada: item.isDeleted === true
		*/
		case 'detail': {
			return item.isDeleted;
		}

		/* EDIT debe estar desactivada si: 
		la evaluacion esta borrada: item.isDeleted === true
		la evaluacion no esta en ejecucion: item.startedAt !== null
		la evaluacion no tiene estatus PLANNING
		*/
		case 'edit': {
			return item.isDeleted || item.status !== 'planning' || item.startedAt !== null;
		}

		/* RESTORE debe estar desactivada si: 
		la evaluacion esta activa: item.isDeleted === false
		la evaluacion no esta en ejecucion: item.startedAt !== null
		la evaluacion no tiene estatus PLANNING
		*/
		case 'restore': {
			return !item.isDeleted || item.startedAt !== null || item.status !== 'planning';
		}

		/* EXECUTE debe estar desactivada si: 
		la evaluacion esta borrada: item.isDeleted === true
		la evaluacion no esta en ejecucion: item.startedAt !== null
		la evaluacion tiene estatus PLANNING
		*/
		case 'execute': {
			return item.isDeleted || item.startedAt !== null || item.status === 'planning';
		}

		default:
			return false;
	}
}

/**
 * Este wrapper de NavigateTo modifica la funcion del detail dependiendo el status de item.
 * Si item.status = ['planning', 'ready'] el goto /{item.code}/planeacion
 * Si item.status = ['executing', 'completed'] el goto /{item.code}/etapa
 * @param item
 */
export function getEvaluacionEtapaUrl(item: EvaluacionItem) {
	if (item.status === 'planning' || item.status === 'ready') {
		return item.code + '/planning';
	}
	return item.code + '/etapa';
}
