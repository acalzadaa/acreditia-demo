import { formatDate } from '$lib/helpers/dates';
import { type EvaluacionEtapaEjecucionStatus, type EvaluacionEtapaItem } from '$lib/schemas/evaluacionEtapa.schema';

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

export function getEtapaStatus(item: EvaluacionEtapaItem, currentDate: Date): EvaluacionEtapaEjecucionStatus {
	// Si no tiene fechas válidas, asumimos que está "antes" (pendiente)
	if (!isEvaluacionEtapaFechaReady(item)) {
		return 'pendiente';
	}

	const startDate = item.fechaInicio!;
	const endDate = getEffectiveEndDate(item);

	if (currentDate < startDate) {
		return 'pendiente';
	}

	if (currentDate >= startDate && currentDate <= endDate) {
		return 'activo'; // Dentro del rango
	}

	return 'finalizado'; // Después del rango
}

function getEffectiveEndDate(item: EvaluacionEtapaItem): Date {
	const hasExtraordinary =
		item.periodoExtraordinario && isEvaluacionEtapaFechaExtraordinariaReady(item);

	return hasExtraordinary ? item.periodoExtraordinarioFinal! : item.fechaFinal!;
}
