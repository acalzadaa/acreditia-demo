import { type EvaluacionItem, type EvaluacionStatus } from '$lib/schemas/evaluacion.schema';
import type { BadgeStatus } from '../../ui/Badge.svelte';

const STATUS_TO_BADGE_CONFIG: Record<
	EvaluacionStatus,
	{ evaluacionStatus: EvaluacionStatus; badgeStatus: BadgeStatus; label: string }
> = {
	planning: { evaluacionStatus: 'planning', badgeStatus: 'info', label: 'En planeacion' },
	ready: { evaluacionStatus: 'ready', badgeStatus: 'success', label: 'Listo para iniciar ciclo' },
	running: { evaluacionStatus: 'running', badgeStatus: 'success', label: 'En ejecucion' },
	completed: { evaluacionStatus: 'completed', badgeStatus: 'warning', label: 'Completado' }
};

export function convertEvaluacionStatusToBadgeVariant(status: EvaluacionStatus): {
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
