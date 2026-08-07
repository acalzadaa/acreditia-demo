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
	invalidate_confirmed: {
		evaluacionStatus: 'invalidate_confirmed',
		badgeStatus: 'error',
		icon: 'check',
		label: 'Invalidado'
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
 * OBSOLETO!! Utiliza extractEtapaItems.
 * Filtra items por etapaCode y devuelve SOLO sus metadata, ya
 * estrechados al tipo concreto (ej. EtapaMetaItem[] si code='meta').
 */
export function extractEtapaMetadata<
	T extends EtapaMetadataByCode[keyof EtapaMetadataByCode]['code']
>(items: EvaluacionEtapaIndicadorItem[], etapaCode: T): EtapaMetadataByCode[T][] {
	return items
		.map((item) => item.metadata)
		.filter((metadata): metadata is EtapaMetadataByCode[T] =>
			isEtapaMetadataOfCode(metadata, etapaCode)
		);
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
