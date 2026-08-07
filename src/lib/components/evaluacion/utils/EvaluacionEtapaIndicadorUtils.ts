import type { BadgeStatus } from '$lib/components/ui/Badge.svelte';
import type { IconName } from '$lib/components/ui/Icon.svelte';
import { isEtapaMetadataOfCode, type EtapaMetadataByCode } from '$lib/schemas/etapaMetadata.schema';
import type { EvaluacionEtapaIndicadorItem, EvaluacionEtapaIndicadorItemFor, EvaluacionEtapaIndicadorStatus } from '$lib/schemas/evaluacionEtapaIndicador.schema';

const EVALUACION_ETAPA_INDICADOR_STATUS_TO_BADGE_CONFIG: Record<
	EvaluacionEtapaIndicadorStatus,
	{
		evaluacionStatus: EvaluacionEtapaIndicadorStatus;
		badgeStatus: BadgeStatus;
		icon: IconName;
		label: string;
	}
> = {
	pending: {
		evaluacionStatus: 'pending',
		badgeStatus: 'info',
		icon: 'close',
		label: 'Creado'
	},
	in_process: {
		evaluacionStatus: 'in_process',
		badgeStatus: 'info',
		icon: 'check',
		label: 'En proceso'
	},
	completed: {
		evaluacionStatus: 'completed',
		badgeStatus: 'success',
		icon: 'check',
		label: 'Completado'
	},
	not_applicable: {
		evaluacionStatus: 'not_applicable',
		badgeStatus: 'warning',
		icon: 'check',
		label: 'Peticion de no aplica'
	},
	forced_in_process: {
		evaluacionStatus: 'forced_in_process',
		badgeStatus: 'error',
		icon: 'close',
		label: 'En proceso obligatorio'
	},
	excluded: {
		evaluacionStatus: 'excluded',
		badgeStatus: 'success',
		icon: 'check',
		label: 'Excluido'
	}
};

export function convertEvaluacionEtapaIndicadorStatusToBadgeVariant(status: EvaluacionEtapaIndicadorStatus): {
	evaluacionStatus: EvaluacionEtapaIndicadorStatus;
	badgeStatus: BadgeStatus;
	icon: IconName;
	label: string;
} {
	return EVALUACION_ETAPA_INDICADOR_STATUS_TO_BADGE_CONFIG[status];
}

/**
 * Filtra items por etapaCode y devuelve SOLO sus metadata, ya
 * estrechados al tipo concreto (ej. EtapaMetaItem[] si code='meta').
 */
export function extractEtapaMetadata<T extends EtapaMetadataByCode[keyof EtapaMetadataByCode]['code']>(
	items: EvaluacionEtapaIndicadorItem[],
	etapaCode: T
): EtapaMetadataByCode[T][] {
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
	return items.filter(
		(item): item is EvaluacionEtapaIndicadorItemFor<T> => isEtapaMetadataOfCode(item.metadata, etapaCode)
	);
}








