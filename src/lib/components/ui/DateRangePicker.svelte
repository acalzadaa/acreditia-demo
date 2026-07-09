<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	/* eslint-disable svelte/prefer-svelte-reactivity */
	/**
	 * DateRangePicker. —  5 component
	 *
	 * Props:
	 *   minDate         {Date|null}    — earliest selectable date (default: today)
	 *   maxDate         {Date|null}    — latest selectable date (default: null = no limit)
	 *   disabledDates   {Date[]|null}  — array of dates that cannot be selected (default: null)
	 *   firstDayOfWeek  {number}       — 0 = Sunday, 1 = Monday (default: 0)
	 *   style           {string}       — inline CSS string passed to the root element
	 *   class           {string}       — CSS class(es) passed to the root element
	 *   locale          {string}       — locale for date formatting (default: 'en-US')
	 *   singleMode      {boolean}      — single date picker mode (default: false)
	 *
	 * Bindable props (use bind:startDate / bind:endDate from parent):
	 *   startDate {Date|null}
	 *   endDate   {Date|null}
	 *
	 * Events:
	 *   onchange({ startDate, endDate })
	 *
	 * La lógica pura (matemática de fechas, grid, cache, formateo, validación)
	 * vive en ./DateRangePicker..js — este archivo solo maneja estado y template.
	 */

	import {
		CalendarGridCache,
		compareMonths,
		formatDisplayDate,
		getMonthLabel,
		getWeekdayLabels,
		isDateAfter,
		isDateBefore,
		isDateDisabled,
		isSameDay,
		normalizeToStartOfDay,
		validateDateRangePickerProps,
		type CalendarCell
	} from './DateRangePicker.svelte.js';
	import IconButton from './IconButton.svelte';

	let {
		minDate = new Date(new Date().setHours(0, 0, 0, 0)),
		maxDate = null,
		disabledDates = null,
		firstDayOfWeek = 0,
		style = '',
		class: className = '',
		locale = 'en-US',
		singleMode = false,
		onchange = null,
		startDate = $bindable<Date | null>(null),
		endDate = $bindable<Date | null>(null)
	} = $props();

	// ── Prop validation ──────────────────────────────────────────────────────
	// svelte-ignore state_referenced_locally
	({ minDate, maxDate, disabledDates, firstDayOfWeek } = validateDateRangePickerProps({
		minDate,
		maxDate,
		disabledDates,
		firstDayOfWeek
	}));

	// ── Calendar navigation state ────────────────────────────────────────────
	// El calendario IZQUIERDO es la fuente de verdad; el DERECHO siempre muestra el mes siguiente.
	const today = new Date();
	let leftYear = $state(today.getFullYear());
	let leftMonth = $state(today.getMonth()); // 0-indexed

	let rightYear = $derived(leftMonth === 11 ? leftYear + 1 : leftYear);
	let rightMonth = $derived(leftMonth === 11 ? 0 : leftMonth + 1);

	// ── Hover state (preview de rango) ───────────────────────────────────────
	let hoveredDate = $state<Date | null>(null);
	let hoveredCalendarIndex = $state<number | null>(null);

	// ── Derived: grids + labels (reactivos a locale / firstDayOfWeek) ───────
	const gridCache = new CalendarGridCache();
	onDestroy(() => gridCache.clear());

	let weekdayLabels = $derived(getWeekdayLabels(locale, firstDayOfWeek));

	let calendarPanels = $derived([
		{
			calendarIndex: 0,
			year: leftYear,
			month: leftMonth,
			grid: gridCache.get(leftYear, leftMonth, firstDayOfWeek),
			showPreviousControl: true,
			showNextControl: false
		},
		{
			calendarIndex: 1,
			year: rightYear,
			month: rightMonth,
			grid: gridCache.get(rightYear, rightMonth, firstDayOfWeek),
			showPreviousControl: false,
			showNextControl: true
		}
	]);

	// ── Date bounds helpers ──────────────────────────────────────────────────
	function isDisabled(date: CalendarCell) {
		return isDateDisabled(date, { minDate, maxDate, disabledDates });
	}

	/** true si `date` está estrictamente entre startDate y el fin de rango (real o previsualizado por hover) */
	function isInRange(date: CalendarCell, calendarIndex: number) {
		if (!date || !startDate || singleMode) return false;

		const previewEnd =
			hoveredCalendarIndex === null || hoveredCalendarIndex === calendarIndex ? hoveredDate : null;
		const rangeEnd = endDate ?? previewEnd;
		if (!rangeEnd) return false;

		const lowerBound = isDateBefore(startDate, rangeEnd) ? startDate : rangeEnd;
		const upperBound = isDateBefore(startDate, rangeEnd) ? rangeEnd : startDate;
		return isDateAfter(date, lowerBound) && isDateBefore(date, upperBound);
	}

	function getCellClassNames(date: CalendarCell, calendarMonth: number, calendarIndex: number) {
		if (!date) return 'drp-cell drp-empty';

		const classes = ['drp-cell'];
		if (date.getMonth() !== calendarMonth) classes.push('drp-outside');
		if (isDisabled(date)) classes.push('drp-disabled');
		if (isSameDay(date, startDate)) classes.push('drp-start');
		if (isSameDay(date, endDate)) classes.push('drp-end');
		if (isInRange(date, calendarIndex)) classes.push('drp-in-range');
		if (isSameDay(date, today)) classes.push('drp-today');

		return classes.join(' ');
	}

	// ── Selection ─────────────────────────────────────────────────────────────
	function emitChange() {
		onchange?.({ startDate, endDate });
	}

	function selectDate(date: CalendarCell) {
		if (!date || isDisabled(date)) return;
		const normalizedDate = normalizeToStartOfDay(date);

		if (singleMode) {
			startDate = isSameDay(normalizedDate, startDate) ? null : normalizedDate;
			endDate = null;
			emitChange();
			return;
		}

		const isStartingFreshRange = !startDate || (startDate && endDate);
		if (isStartingFreshRange) {
			startDate = normalizedDate;
			endDate = null;
			return;
		}

		if (isSameDay(normalizedDate, startDate)) {
			// Mismo día que el inicio: limpiar selección
			startDate = null;
			endDate = null;
		} else if (isDateBefore(normalizedDate, startDate)) {
			// Fecha anterior al inicio: invertir inicio/fin
			endDate = startDate;
			startDate = normalizedDate;
		} else {
			endDate = normalizedDate;
		}
		emitChange();
	}

	// ── Month navigation ──────────────────────────────────────────────────────
	function goToPreviousMonth() {
		if (leftMonth === 0) {
			leftMonth = 11;
			leftYear--;
		} else {
			leftMonth--;
		}
	}

	function goToNextMonth() {
		if (leftMonth === 11) {
			leftMonth = 0;
			leftYear++;
		} else {
			leftMonth++;
		}
	}

	// ── Keyboard navigation ───────────────────────────────────────────────────
	async function focusCell(date: Date) {
		await tick();
		const targetCell = document.querySelector<HTMLElement>(`[data-date="${date.toISOString()}"]`);
		targetCell?.focus();
	}

	async function moveFocusByDays(fromDate: Date, dayOffset: number, calendarIndex: number) {
		const targetDate = new Date(fromDate);
		targetDate.setDate(fromDate.getDate() + dayOffset);
		if (isDisabled(targetDate)) return;

		const targetMonth = targetDate.getMonth();
		const targetYear = targetDate.getFullYear();
		const referenceYear = calendarIndex === 0 ? leftYear : rightYear;
		const referenceMonth = calendarIndex === 0 ? leftMonth : rightMonth;

		if (compareMonths(targetYear, targetMonth, referenceYear, referenceMonth) !== 0) {
			// El calendario derecho siempre muestra leftMonth + 1, así que ajustamos leftMonth/leftYear
			const monthOffset = calendarIndex === 0 ? 0 : -1;
			const anchor = new Date(targetYear, targetMonth + monthOffset, 1);
			leftYear = anchor.getFullYear();
			leftMonth = anchor.getMonth();
		}

		await focusCell(targetDate);
	}

	async function moveFocusToMonthEdge(fromDate: Date, edge: 'start' | 'end') {
		const targetDate =
			edge === 'start'
				? new Date(fromDate.getFullYear(), fromDate.getMonth(), 1)
				: new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);

		if (isDisabled(targetDate)) return;
		selectDate(targetDate);
		await focusCell(targetDate);
	}

	function handleCellKeyDown(
		keyboardEvent: KeyboardEvent,
		date: CalendarCell,
		calendarIndex: number
	) {
		if (!date || isDisabled(date)) return;

		switch (keyboardEvent.key) {
			case 'Enter':
			case ' ':
				keyboardEvent.preventDefault();
				selectDate(date);
				break;
			case 'ArrowLeft':
				keyboardEvent.preventDefault();
				moveFocusByDays(date, -1, calendarIndex);
				break;
			case 'ArrowRight':
				keyboardEvent.preventDefault();
				moveFocusByDays(date, 1, calendarIndex);
				break;
			case 'ArrowUp':
				keyboardEvent.preventDefault();
				moveFocusByDays(date, -7, calendarIndex);
				break;
			case 'ArrowDown':
				keyboardEvent.preventDefault();
				moveFocusByDays(date, 7, calendarIndex);
				break;
			case 'Home':
				keyboardEvent.preventDefault();
				moveFocusToMonthEdge(date, 'start');
				break;
			case 'End':
				keyboardEvent.preventDefault();
				moveFocusToMonthEdge(date, 'end');
				break;
		}
	}

	// ── Mouse hover (preview de rango) ────────────────────────────────────────
	function handleCellMouseEnter(date: CalendarCell, calendarIndex: number) {
		if (singleMode || !date || !startDate || endDate) return;
		hoveredDate = normalizeToStartOfDay(date);
		hoveredCalendarIndex = calendarIndex;
	}

	function handleCellMouseLeave() {
		hoveredDate = null;
		hoveredCalendarIndex = null;
	}
</script>

<div class="drp-root {className}" {style}>
	<!-- Summary bar -->
	<div class="drp-summary">
		<div class="drp-summary-item">
			<span class="drp-label">Start</span>
			<span class="drp-value" class:drp-placeholder={!startDate}>
				{formatDisplayDate(startDate, locale)}
			</span>
		</div>
		{#if !singleMode}
			<div class="drp-arrow">→</div>
			<div class="drp-summary-item">
				<span class="drp-label">End</span>
				<span class="drp-value" class:drp-placeholder={!endDate}>
					{formatDisplayDate(endDate, locale)}
				</span>
			</div>
		{/if}
	</div>

	<!-- Calendars -->
	<div class="drp-calendars">
		{#each calendarPanels as panel (panel.calendarIndex)}
			<div class="drp-calendar">
				<!-- Header -->
				<div class="drp-cal-header">
					{#if panel.showPreviousControl}
						<IconButton
							name="chevron-right"
							class="drp-nav drp-nav-prev"
							size="sm"
							onClick={goToPreviousMonth}
							ariaLabel="Previous month"
						/>
					{:else}
						<span class="drp-nav-spacer"></span>
					{/if}

					<span class="drp-month-label">
						{getMonthLabel(locale, panel.year, panel.month)}
						{panel.year}
					</span>

					{#if panel.showNextControl}
						<IconButton
							name="chevron-right"
							class="drp-nav"
							size="sm"
							onClick={goToNextMonth}
							ariaLabel="Next month"
						/>
					{:else}
						<span class="drp-nav-spacer"></span>
					{/if}
				</div>

				<!-- Day-of-week headers -->
				<div class="drp-grid">
					{#each weekdayLabels as dayName, dayIndex (dayIndex)}
						<div class="drp-dow">{dayName}</div>
					{/each}

					<!-- Date cells -->
					{#each panel.grid as date, cellIndex (cellIndex)}
						<button
							class={getCellClassNames(date, panel.month, panel.calendarIndex)}
							disabled={!date || isDisabled(date)}
							onclick={() => selectDate(date)}
							onmouseenter={() => handleCellMouseEnter(date, panel.calendarIndex)}
							onmouseleave={handleCellMouseLeave}
							onkeydown={(keyboardEvent) => handleCellKeyDown(keyboardEvent, date, panel.calendarIndex)}
							aria-label={date ? date.toDateString() : ''}
							data-date={date ? date.toISOString() : ''}
							type="button"
						>
							{#if date}
								<span class="drp-day-num">{date.getDate()}</span>
								{#if isInRange(date, panel.calendarIndex)}
									<span class="drp-range-bg"></span>
								{/if}
							{/if}
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	/* ── Root ──────────────────────────────────────────────────────────────── */
	.drp-root {
		display: inline-flex;
		flex-direction: column;
		background: var(--bg-overlay);
		border: var(--border-card);
		border-radius: var(--border-radius-card);
		box-shadow: var(--shadow-dropdown);
		font-family: var(--font-body);
		color: var(--text-primary);
		overflow: hidden;
		user-select: none;
	}

	/* ── Summary bar ──────────────────────────────────────────────────────── */
	.drp-summary {
		display: flex;
		align-items: center;
		gap: var(--stack-xs);
		padding: var(--inset-sm) var(--inset-lg);
		border-bottom: var(--divider);
		background: var(--bg-raised);
	}

	.drp-summary-item {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 110px;
	}

	.drp-label {
		font-family: var(--text-label-font);
		font-size: var(--text-label-size);
		font-weight: var(--text-label-weight);
		letter-spacing: var(--text-label-spacing);
		text-transform: var(--text-label-transform);
		color: var(--text-secondary);
	}

	.drp-value {
		font-family: var(--text-body-strong-font);
		font-size: var(--text-body-strong-size);
		font-weight: var(--text-body-strong-weight);
		color: var(--text-primary);
	}

	.drp-value.drp-placeholder {
		color: var(--text-placeholder);
		font-style: italic;
	}

	.drp-arrow {
		color: var(--text-secondary);
		flex: 1;
		text-align: center;
	}

	/* ── Calendars wrapper ────────────────────────────────────────────────── */
	.drp-calendars {
		display: flex;
	}

	.drp-calendar {
		flex: 1;
		padding: var(--inset-md) var(--inset-lg) var(--inset-lg);
	}

	.drp-calendar + .drp-calendar {
		border-left: var(--divider);
	}

	/* ── Calendar header ──────────────────────────────────────────────────── */
	.drp-cal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--stack-xs);
	}

	.drp-month-label {
		font-family: var(--text-body-strong-font);
		font-size: var(--text-body-strong-size);
		font-weight: var(--text-body-strong-weight);
	}

	/* El set de iconos no incluye "chevron-left": reutilizamos chevron-right rotado */
	:global(.drp-nav-prev svg) {
		transform: rotate(180deg);
	}

	.drp-nav-spacer {
		width: 2.25em;
		display: inline-block;
	}

	/* ── Grid ─────────────────────────────────────────────────────────────── */
	.drp-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 2px;
	}

	.drp-dow {
		text-align: center;
		font-family: var(--text-caption-small-font);
		font-size: var(--text-caption-small-size);
		font-weight: var(--text-label-weight);
		color: var(--text-secondary);
		padding: var(--inset-sm) 0 4px;
	}

	/* ── Cells ────────────────────────────────────────────────────────────── */
	.drp-cell {
		position: relative;
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: transparent;
		border-radius: var(--border-radius-button);
		font-family: var(--text-body-small-font);
		font-size: var(--text-body-small-size);
		cursor: pointer;
		color: var(--text-primary);
		transition:
			background 0.12s,
			color 0.12s;
		padding: 0;
		overflow: hidden;
	}

	.drp-cell:hover:not(:disabled):not(.drp-start):not(.drp-end) {
		background: var(--bg-overlay-hover);
	}

	.drp-cell:focus-visible {
		z-index: 1;
	}

	.drp-day-num {
		position: relative;
		z-index: 2;
	}

	.drp-empty {
		cursor: default;
		pointer-events: none;
	}

	.drp-outside {
		color: var(--text-on-surface-subtle);
	}

	.drp-disabled {
		color: var(--text-disabled);
		cursor: not-allowed;
		opacity: 0.5;
	}

	/* Anillo del día de hoy */
	.drp-today .drp-day-num::after {
		content: '';
		position: absolute;
		inset: -3px;
		border-radius: 50%;
		border: var(--border-width-regular, 2px) solid var(--border-brand);
		opacity: 0.35;
	}

	/* Relleno de rango */
	.drp-in-range {
		border-radius: 0;
		background: var(--bg-overlay-brand);
	}

	.drp-range-bg {
		position: absolute;
		inset: 0;
		background: var(--bg-overlay-brand);
		z-index: 0;
		border-radius: 0;
	}

	/* Extremos de inicio / fin */
	.drp-start,
	.drp-end {
		background: var(--bg-brand-primary) !important;
		color: var(--text-on-brand-primary) !important;
		border-radius: var(--border-radius-button);
		z-index: 2;
	}

	/* ── Responsive ───────────────────────────────────────────────────────── */
	@media (max-width: 640px) {
		.drp-root {
			width: 100%;
		}

		.drp-calendars {
			flex-direction: column;
		}

		.drp-calendar + .drp-calendar {
			border-left: none;
			border-top: var(--divider);
		}

		.drp-summary {
			padding: var(--inset-sm) var(--inset-md);
		}

		.drp-summary-item {
			min-width: 80px;
		}

		.drp-calendar {
			padding: var(--inset-md);
		}
	}
</style>