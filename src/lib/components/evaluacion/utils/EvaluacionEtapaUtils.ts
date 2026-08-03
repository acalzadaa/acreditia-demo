import { formatDate } from '$lib/helpers/dates';
import type { EvaluacionEtapaItem } from '$lib/schemas/evaluacionEtapa.schema';

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
