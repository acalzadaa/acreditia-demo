/* eslint-disable svelte/prefer-svelte-reactivity */
/**
 * DateRangePicker..ts
 *
 * Lógica pura y sin estado de  para DateRangePicker.:
 *   - Matemática de fechas (comparaciones, normalización)
 *   - Construcción del grid de calendario
 *   - Cache LRU de grids
 *   - Formateo / i18n
 *   - Validación de props
 *
 * Nada en este archivo depende de $state/$derived: son funciones puras,
 * fáciles de testear de forma aislada del componente.
 */

export type CalendarCell = Date | null;

export interface DateRangePickerBounds {
	minDate: Date;
	maxDate: Date | null;
	disabledDates: Date[] | null;
}

// ── Date math ──────────────────────────────────────────────────────────────

/** Devuelve una copia de `date` con la hora fijada a 00:00:00.000 */
export function normalizeToStartOfDay(date: Date): Date {
	const normalized = new Date(date);
	normalized.setHours(0, 0, 0, 0);
	return normalized;
}

/** true si dos fechas caen el mismo día (ignora hora) */
export function isSameDay(dateA?: Date | null, dateB?: Date | null): boolean {
	if (!dateA || !dateB) return false;
	return (
		dateA.getFullYear() === dateB.getFullYear() &&
		dateA.getMonth() === dateB.getMonth() &&
		dateA.getDate() === dateB.getDate()
	);
}

export function isDateBefore(dateA: Date, dateB: Date): boolean {
	return dateA < dateB;
}

export function isDateAfter(dateA: Date, dateB: Date): boolean {
	return dateA > dateB;
}

/** -1 si (year1, month1) es anterior, 1 si es posterior, 0 si es el mismo mes */
export function compareMonths(year1: number, month1: number, year2: number, month2: number): number {
	if (year1 !== year2) return year1 < year2 ? -1 : 1;
	if (month1 !== month2) return month1 < month2 ? -1 : 1;
	return 0;
}

/** true si `date` está fuera de [minDate, maxDate] o dentro de disabledDates */
export function isDateDisabled(date: Date | null | undefined, bounds: DateRangePickerBounds): boolean {
	if (!date) return true;
	const normalizedDate = normalizeToStartOfDay(date);

	if (isDateBefore(normalizedDate, normalizeToStartOfDay(bounds.minDate))) return true;
	if (bounds.maxDate && isDateAfter(normalizedDate, normalizeToStartOfDay(bounds.maxDate))) return true;

	if (bounds.disabledDates?.length) {
		return bounds.disabledDates.some(
			(disabledDate) => disabledDate && isSameDay(normalizedDate, normalizeToStartOfDay(disabledDate))
		);
	}

	return false;
}

// ── Calendar grid ────────────────────────────────────────────────────────────

/** Construye el grid de un mes (6 filas x 7 columnas, con `null` de relleno) */
export function buildCalendarGrid(year: number, month: number, firstDayOfWeek: number): CalendarCell[] {
	const firstDayOfMonth = new Date(year, month, 1);
	let leadingEmptyCells = firstDayOfMonth.getDay(); // 0 = domingo

	if (firstDayOfWeek > 0) {
		leadingEmptyCells = (leadingEmptyCells - firstDayOfWeek + 7) % 7;
	}

	const cells: CalendarCell[] = new Array(leadingEmptyCells).fill(null);

	const daysInMonth = new Date(year, month + 1, 0).getDate();
	for (let day = 1; day <= daysInMonth; day++) {
		cells.push(new Date(year, month, day));
	}

	while (cells.length < 42) cells.push(null);
	return cells;
}

const CALENDAR_GRID_CACHE_LIMIT = 24; // ~2 años de meses

/** Cache LRU de grids de calendario, evita reconstruir el mismo mes repetidamente */
export class CalendarGridCache {
	#entries = new Map<string, CalendarCell[]>();

	get(year: number, month: number, firstDayOfWeek: number): CalendarCell[] {
		const key = `${year}-${month}-${firstDayOfWeek}`;

		const cached = this.#entries.get(key);
		if (cached) {
			// Mover al final para mantener el orden LRU
			this.#entries.delete(key);
			this.#entries.set(key, cached);
			return cached;
		}

		const grid = buildCalendarGrid(year, month, firstDayOfWeek);
		if (this.#entries.size >= CALENDAR_GRID_CACHE_LIMIT) {
			const oldestKey = this.#entries.keys().next().value;
			if (oldestKey !== undefined) this.#entries.delete(oldestKey);
		}
		this.#entries.set(key, grid);
		return grid;
	}

	clear() {
		this.#entries.clear();
	}
}

// ── Formatting / i18n ────────────────────────────────────────────────────────

/** Nombres cortos de los días de la semana, rotados según firstDayOfWeek */
export function getWeekdayLabels(locale: string, firstDayOfWeek: number): string[] {
	const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
	const baseSunday = new Date(2024, 0, 7); // referencia: un domingo conocido

	const labels: string[] = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date(baseSunday);
		date.setDate(baseSunday.getDate() + i);
		labels.push(weekdayFormatter.format(date));
	}

	if (firstDayOfWeek === 0) return labels;
	return labels.map((_, i) => labels[(i + firstDayOfWeek) % 7]);
}

export function getMonthLabel(locale: string, year: number, month: number): string {
	const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long' });
	return monthFormatter.format(new Date(year, month, 1));
}

export function formatDisplayDate(date: Date | null, locale: string): string {
	if (!date) return '—';
	if (isNaN(date.getTime())) {
		console.warn('DateRangePicker: fecha inválida para formatear');
		return 'Invalid date';
	}
	return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Prop validation ──────────────────────────────────────────────────────────

export interface RawDateRangePickerProps {
	minDate: unknown;
	maxDate: unknown;
	disabledDates: unknown;
	firstDayOfWeek: unknown;
}

export interface ValidatedDateRangePickerProps {
	minDate: Date;
	maxDate: Date | null;
	disabledDates: Date[] | null;
	firstDayOfWeek: number;
}

/** Sanea las props de entrada, cayendo a defaults seguros con un warning si son inválidas */
export function validateDateRangePickerProps(
	props: RawDateRangePickerProps
): ValidatedDateRangePickerProps {
	const todayStartOfDay = normalizeToStartOfDay(new Date());

	let { minDate, maxDate, disabledDates, firstDayOfWeek } = props;

	if (!(minDate instanceof Date) || isNaN(minDate.getTime())) {
		console.warn('DateRangePicker: minDate inválido, usando hoy');
		minDate = todayStartOfDay;
	}

	if (maxDate && (!(maxDate instanceof Date) || isNaN((maxDate as Date).getTime()))) {
		console.warn('DateRangePicker: maxDate inválido, usando null');
		maxDate = null;
	}

	if (disabledDates && !Array.isArray(disabledDates)) {
		console.warn('DateRangePicker: disabledDates debe ser un array o null');
		disabledDates = null;
	}

	if (typeof firstDayOfWeek !== 'number' || firstDayOfWeek < 0 || firstDayOfWeek > 6) {
		console.warn('DateRangePicker: firstDayOfWeek debe ser 0-6, usando 0');
		firstDayOfWeek = 0;
	}

	return {
		minDate: minDate as Date,
		maxDate: maxDate as Date | null,
		disabledDates: disabledDates as Date[] | null,
		firstDayOfWeek: firstDayOfWeek as number
	};
}