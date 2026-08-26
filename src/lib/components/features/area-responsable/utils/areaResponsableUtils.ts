import type { TagStatus } from '$lib/components/ui/Tag.svelte';
import type { AreaResponsableTotalPuestosItem } from '$lib/schemas/areaResponsable.schema';
import type { AreaResponsableEvidenciaItem } from '$lib/schemas/areaResponsableEvidencia.schema';

export function formatEvidenciaSubtitleMessage(items: AreaResponsableEvidenciaItem[]): {
	variant: TagStatus;
	label: string;
} {
	if (items.length == 0) {
		return { variant: 'warning', label: 'Falta por agregar una evidencia' };
	}
	return { variant: 'success', label: 'Total de evidencias: ' + items.length };
}

export function formatPuestoSubtitleMessage(item: AreaResponsableTotalPuestosItem): {
	variant: TagStatus;
	label: string;
} {
	if (item.total == 0) {
		return { variant: 'error', label: 'Faltan por agregar dos puestos' };
	} else if (item.operativo === 0) {
		return { variant: 'warning', label: 'Falta por agregar un puesto operativo' };
	} else if (item.directivo === 0) {
		return { variant: 'warning', label: 'Falta por agregar un puesto directivo' };
	}
	return { variant: 'success', label: 'Total de puestos: ' + item.total };
}
