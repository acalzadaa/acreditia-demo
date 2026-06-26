<script lang='ts'>
  /**
   * DateRangePicker.svelte — Svelte 5 component
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
   */

  import { tick, onDestroy } from 'svelte';
	import { SvelteDate } from 'svelte/reactivity';
  
  let {
    minDate = new Date(new SvelteDate().setHours(0, 0, 0, 0)),
    maxDate = null,
    disabledDates = null,
    firstDayOfWeek = 0,
    style = '',
    class: className = '',
    locale = 'en-US',
    singleMode = false,
    onchange = null,
    startDate = $bindable(null),
    endDate = $bindable(null),
  } = $props();

  // ── Validación de props ──────────────────────────────────────────────────────
  if (!(minDate instanceof Date) || isNaN(minDate)) {
    console.warn('DateRangePicker: minDate inválido, usando hoy');
    minDate = new Date(new SvelteDate().setHours(0, 0, 0, 0));
  }

  if (maxDate && (!(maxDate instanceof Date) || isNaN(maxDate))) {
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

  // ── State ────────────────────────────────────────────────────────────────────
  // Which month/year is the LEFT calendar showing
  const currentDate = new Date();
  let leftCalendarYear = $state(currentDate.getFullYear());
  let leftCalendarMonth = $state(currentDate.getMonth()); // 0-based

  // Hover state for range preview
  let hoveredDate = $state(null);
  let hoveredCalendarIndex = $state(null);

  // ── Derived ──────────────────────────────────────────────────────────────────
  // Right calendar is always one month after left
  let rightCalendarMonth = $derived(leftCalendarMonth === 11 ? 0 : leftCalendarMonth + 1);
  let rightCalendarYear = $derived(leftCalendarMonth === 11 ? leftCalendarYear + 1 : leftCalendarYear);

  // Formateadores internacionalizados
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long' });
  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });

  // Obtener días de semana en el locale correcto respetando firstDayOfWeek
  const weekDays = (() => {
    // Usar un domingo como referencia base
    const baseSunday = new Date(2024, 0, 7);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new SvelteDate(baseSunday);
      date.setDate(baseSunday.getDate() + i);
      days.push(weekdayFormatter.format(date));
    }
    
    // Rotar según firstDayOfWeek
    if (firstDayOfWeek > 0) {
      const rotatedDays = [...days];
      for (let i = 0; i < 7; i++) {
        rotatedDays[i] = days[(i + firstDayOfWeek) % 7];
      }
      return rotatedDays;
    }
    return days;
  })();

  // ── Helpers ──────────────────────────────────────────────────────────────────
  function normalizeToStartOfDay(date : Date) {
    const normalizedDate = new SvelteDate(date);
    normalizedDate.setHours(0, 0, 0, 0);
    return normalizedDate;
  }

  function isSameDay(dateA: Date, dateB: Date) {
    if (!dateA || !dateB) return false;
    return dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate();
  }

  function isDateBefore(dateA: Date, dateB: Date) { 
    return dateA < dateB; 
  }
  
  function isDateAfter(dateA : Date, dateB: Date) { 
    return dateA > dateB; 
  }

  function compareMonths(year1, month1, year2, month2) {
    if (year1 !== year2) return year1 < year2 ? -1 : 1;
    if (month1 !== month2) return month1 < month2 ? -1 : 1;
    return 0;
  }

  function isDateDisabled(dateToCheck) {
    if (!dateToCheck) return true;
    const normalizedDate = normalizeToStartOfDay(dateToCheck);

    // Min/Max validation
    if (isDateBefore(normalizedDate, normalizeToStartOfDay(minDate))) return true;
    if (maxDate && isDateAfter(normalizedDate, normalizeToStartOfDay(maxDate))) return true;

    // Disabled dates array validation
    if (disabledDates && Array.isArray(disabledDates)) {
      return disabledDates.some(disabledDate => {
        if (!disabledDate) return false;
        return isSameDay(normalizedDate, normalizeToStartOfDay(disabledDate));
      });
    }

    return false;
  }

  /** True if dateToCheck is strictly between startDate and endDate (exclusive) */
  function isDateInRange(dateToCheck, calendarIndex = null) {
    if (!startDate) return false;

    // En singleMode, no hay rango
    if (singleMode) return false;

    const rangeStart = startDate;
    // Solo mostrar preview hover si el cursor está en el mismo calendario
    const activeHover = (hoveredCalendarIndex === null || calendarIndex === null || hoveredCalendarIndex === calendarIndex)
      ? hoveredDate
      : null;
    const rangeEnd = endDate ?? activeHover;

    if (!rangeEnd) return false;

    const lowerBound = isDateBefore(rangeStart, rangeEnd) ? rangeStart : rangeEnd;
    const upperBound = isDateBefore(rangeStart, rangeEnd) ? rangeEnd : rangeStart;
    return isDateAfter(dateToCheck, lowerBound) && isDateBefore(dateToCheck, upperBound);
  }

  /** Build the grid of Date objects for a given month/year (6 rows × 7 cols) */
  function buildCalendarGrid(year, month) {
    // Ajustar el primer día del mes según firstDayOfWeek
    const firstDayOfMonth = new Date(year, month, 1);
    let leadingEmptyCells = firstDayOfMonth.getDay(); // 0=Sunday
    
    // Ajuste por firstDayOfWeek
    if (firstDayOfWeek > 0) {
      leadingEmptyCells = (leadingEmptyCells - firstDayOfWeek + 7) % 7;
    }
    
    const calendarDays = [];

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < leadingEmptyCells; i++) {
      calendarDays.push(null);
    }

    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= lastDayOfMonth; day++) {
      calendarDays.push(new Date(year, month, day));
    }

    // Pad to full 6 rows (42 cells total)
    while (calendarDays.length < 42) calendarDays.push(null);
    return calendarDays;
  }

  // Cache para grids de calendario — límite de 24 entradas (2 años de meses)
  const CALENDAR_GRID_CACHE_LIMIT = 24;
  const calendarGridCache = new Map();

  function getCachedCalendarGrid(year, month) {
    const cacheKey = `${year}-${month}-${firstDayOfWeek}`;
    if (calendarGridCache.has(cacheKey)) {
      // Mover al final para mantener orden LRU
      const value = calendarGridCache.get(cacheKey);
      calendarGridCache.delete(cacheKey);
      calendarGridCache.set(cacheKey, value);
      return value;
    }
    const grid = buildCalendarGrid(year, month);
    if (calendarGridCache.size >= CALENDAR_GRID_CACHE_LIMIT) {
      // Eliminar la entrada más antigua (primera del Map)
      const oldestKey = calendarGridCache.keys().next().value;
      calendarGridCache.delete(oldestKey);
    }
    calendarGridCache.set(cacheKey, grid);
    return grid;
  }

  let leftCalendarGrid = $derived(getCachedCalendarGrid(leftCalendarYear, leftCalendarMonth));
  let rightCalendarGrid = $derived(getCachedCalendarGrid(rightCalendarYear, rightCalendarMonth));

  // Cleanup on destroy
  onDestroy(() => {
    calendarGridCache.clear();
  });

  // ── Event handlers ─────────────────────────────────────────────────────────────
  function emitDateRangeChange() {
    if (typeof onchange === 'function') {
      onchange({ startDate, endDate });
    }
  }

  function selectDate(dateToSelect) {
    if (!dateToSelect || isDateDisabled(dateToSelect)) return;
    const normalizedDate = normalizeToStartOfDay(dateToSelect);

    // Single mode
    if (singleMode) {
      if (isSameDay(normalizedDate, startDate)) {
        startDate = null;
      } else {
        startDate = normalizedDate;
      }
      endDate = null;
      emitDateRangeChange();
      return;
    }

    // Range mode
    if (!startDate || (startDate && endDate)) {
      // Fresh pick - start new range
      startDate = normalizedDate;
      endDate = null;
    } else {
      // Second pick - complete the range
      if (isSameDay(normalizedDate, startDate)) {
        // Clicked same date - clear selection
        startDate = null;
        endDate = null;
        emitDateRangeChange();
      } else if (isDateBefore(normalizedDate, startDate)) {
        // Selected date is before start date - swap them
        endDate = startDate;
        startDate = normalizedDate;
        emitDateRangeChange();
      } else {
        // Selected date is after start date - normal range
        endDate = normalizedDate;
        emitDateRangeChange();
      }
    }
  }

  // ── Calendar navigation ────────────────────────────────────────────────────────
  function goToPreviousMonth() {
    if (leftCalendarMonth === 0) {
      leftCalendarMonth = 11;
      leftCalendarYear--;
    } else {
      leftCalendarMonth--;
    }
  }

  function goToNextMonth() {
    if (leftCalendarMonth === 11) {
      leftCalendarMonth = 0;
      leftCalendarYear++;
    } else {
      leftCalendarMonth++;
    }
  }

  // ── Keyboard navigation ──────────────────────────────────────────────────────
  function handleCellKeyDown(keyboardEvent: KeyboardEvent, dateObject, cellIndex, calendarIndex) {
    if (!dateObject || isDateDisabled(dateObject)) return;

    switch (keyboardEvent.key) {
      case 'Enter':
      case ' ':
        keyboardEvent.preventDefault();
        selectDate(dateObject);
        break;
      case 'ArrowLeft':
        keyboardEvent.preventDefault();
        navigateToAdjacentDate(dateObject, -1, cellIndex, calendarIndex);
        break;
      case 'ArrowRight':
        keyboardEvent.preventDefault();
        navigateToAdjacentDate(dateObject, 1, cellIndex, calendarIndex);
        break;
      case 'ArrowUp':
        keyboardEvent.preventDefault();
        navigateToAdjacentDate(dateObject, -7, cellIndex, calendarIndex);
        break;
      case 'ArrowDown':
        keyboardEvent.preventDefault();
        navigateToAdjacentDate(dateObject, 7, cellIndex, calendarIndex);
        break;
      case 'Home':
        keyboardEvent.preventDefault();
        navigateToFirstDayOfMonth(dateObject, calendarIndex);
        break;
      case 'End':
        keyboardEvent.preventDefault();
        navigateToLastDayOfMonth(dateObject, calendarIndex);
        break;
    }
  }

  async function navigateToAdjacentDate(currentDate, dayOffset, currentCellIndex, calendarIndex) {
    const newDate = new SvelteDate(currentDate);
    newDate.setDate(currentDate.getDate() + dayOffset);

    if (isDateDisabled(newDate)) return;

    const newMonth = newDate.getMonth();
    const newYear = newDate.getFullYear();

    if (calendarIndex === 0) {
      // Left calendar: si el nuevo mes salió del mes actual del left, ajustar
      if (compareMonths(newYear, newMonth, leftCalendarYear, leftCalendarMonth) !== 0) {
        leftCalendarYear = newYear;
        leftCalendarMonth = newMonth;
      }
    } else {
      // Right calendar: si el nuevo mes salió del mes actual del right, ajustar
      // (right es siempre leftMonth+1, así que movemos left en consecuencia)
      if (compareMonths(newYear, newMonth, rightCalendarYear, rightCalendarMonth) !== 0) {
        // El right debe mostrar newMonth, por tanto left = newMonth - 1
        const targetLeft = new Date(newYear, newMonth - 1, 1);
        leftCalendarYear = targetLeft.getFullYear();
        leftCalendarMonth = targetLeft.getMonth();
      }
    }

    // Focus the new date cell after Svelte updates the DOM
    await tick();
    const targetCell = document.querySelector(`[data-date="${newDate.toISOString()}"]`);
    if (targetCell) targetCell.focus();
  }

  async function navigateToFirstDayOfMonth(currentDate, calendarIndex) {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    if (!isDateDisabled(firstDayOfMonth)) {
      selectDate(firstDayOfMonth);
      await tick();
      const targetCell = document.querySelector(`[data-date="${firstDayOfMonth.toISOString()}"]`);
      if (targetCell) targetCell.focus();
    }
  }

  async function navigateToLastDayOfMonth(currentDate, calendarIndex) {
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    if (!isDateDisabled(lastDayOfMonth)) {
      selectDate(lastDayOfMonth);
      await tick();
      const targetCell = document.querySelector(`[data-date="${lastDayOfMonth.toISOString()}"]`);
      if (targetCell) targetCell.focus();
    }
  }

  // ── Cell styling logic ─────────────────────────────────────────────────────────
  function getCellClassName(dateObject, calendarMonth, calendarIndex) {
    if (!dateObject) return 'drp-cell drp-empty';
    
    const cssClasses = ['drp-cell'];
    
    if (dateObject.getMonth() !== calendarMonth) {
      cssClasses.push('drp-outside');
    }
    
    if (isDateDisabled(dateObject)) {
      cssClasses.push('drp-disabled');
    }
    
    if (isSameDay(dateObject, startDate)) {
      cssClasses.push('drp-start');
    }
    
    if (isSameDay(dateObject, endDate)) {
      cssClasses.push('drp-end');
    }
    
    if (isDateInRange(dateObject, calendarIndex)) {
      cssClasses.push('drp-in-range');
    }
    
    if (isSameDay(dateObject, new Date())) {
      cssClasses.push('drp-today');
    }
    
    if ((isSameDay(dateObject, startDate) && endDate) ||
        (isSameDay(dateObject, endDate) && startDate)) {
      cssClasses.push('drp-cap');
    }
    
    return cssClasses.join(' ');
  }

  // ── Date formatting ────────────────────────────────────────────────────────────────
  function formatDate(dateToFormat) {
    if (!dateToFormat) return '—';
    if (!(dateToFormat instanceof Date) || isNaN(dateToFormat)) {
      console.warn('DateRangePicker: fecha inválida para formatear');
      return 'Invalid date';
    }
    return dateToFormat.toLocaleDateString(locale, { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  function getLocalizedMonthName(year, month) {
    const date = new Date(year, month, 1);
    return monthFormatter.format(date);
  }

  // ── Mouse hover handlers ──────────────────────────────────────────────────────────
  function handleCellMouseEnter(dateObject, calendarIndex) {
    if (!singleMode && dateObject && startDate && !endDate) {
      hoveredDate = normalizeToStartOfDay(dateObject);
      hoveredCalendarIndex = calendarIndex;
    }
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
        {formatDate(startDate)}
      </span>
    </div>
    {#if !singleMode}
      <div class="drp-arrow">→</div>
      <div class="drp-summary-item">
        <span class="drp-label">End</span>
        <span class="drp-value" class:drp-placeholder={!endDate}>
          {formatDate(endDate)}
        </span>
      </div>
    {/if}
  </div>

  <!-- Calendars -->
  <div class="drp-calendars">
    {#each [
      { 
        grid: leftCalendarGrid, 
        year: leftCalendarYear, 
        month: leftCalendarMonth, 
        calendarIndex: 0 
      },
      { 
        grid: rightCalendarGrid, 
        year: rightCalendarYear, 
        month: rightCalendarMonth, 
        calendarIndex: 1 
      },
    ] as calendar, calendarPosition} 
      <div class="drp-calendar">
        <!-- Header -->
        <div class="drp-cal-header">
          {#if calendarPosition === 0}
            <button
              class="drp-nav"
              onclick={goToPreviousMonth}
              aria-label="Previous month"
              type="button"
            >
              ‹
            </button>
          {:else}
            <span class="drp-nav-spacer"></span>
          {/if}
          
          <span class="drp-month-label">
            {getLocalizedMonthName(calendar.year, calendar.month)} {calendar.year}
          </span>
          
          {#if calendarPosition === 1}
            <button
              class="drp-nav"
              onclick={goToNextMonth}
              aria-label="Next month"
              type="button"
            >
              ›
            </button>
          {:else}
            <span class="drp-nav-spacer"></span>
          {/if}
        </div>

        <!-- Day-of-week headers -->
        <div class="drp-grid">
          {#each weekDays as dayName}
            <div class="drp-dow">{dayName}</div>
          {/each}

          <!-- Date cells -->
          {#each calendar.grid as dateObject, cellIndex}
            <button
              class={getCellClassName(dateObject, calendar.month, calendar.calendarIndex)}
              disabled={!dateObject || isDateDisabled(dateObject)}
              onclick={() => selectDate(dateObject)}
              onmouseenter={() => handleCellMouseEnter(dateObject, calendar.calendarIndex)}
              onmouseleave={handleCellMouseLeave}
              onkeydown={(keyboardEvent) => 
                handleCellKeyDown(keyboardEvent, dateObject, cellIndex, calendar.calendarIndex)
              }
              aria-label={dateObject ? dateObject.toDateString() : ''}
              data-date={dateObject ? dateObject.toISOString() : ''}
              type="button"
            >
              {#if dateObject}
                <span class="drp-day-num">{dateObject.getDate()}</span>
                {#if isDateInRange(dateObject, calendar.calendarIndex)}
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
    --drp-bg: #ffffff;
    --drp-border: #e2e8f0;
    --drp-radius: 12px;
    --drp-accent: #4f46e5;
    --drp-accent-fg: #ffffff;
    --drp-range-bg: #ede9fe;
    --drp-text: #1e293b;
    --drp-muted: #94a3b8;
    --drp-hover: #f1f5f9;
    --drp-disabled: #cbd5e1;
    --drp-today-ring: #4f46e5;
    --drp-font: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    --drp-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

    display: inline-flex;
    flex-direction: column;
    gap: 0;
    background: var(--drp-bg);
    border: 1px solid var(--drp-border);
    border-radius: var(--drp-radius);
    box-shadow: var(--drp-shadow);
    font-family: var(--drp-font);
    color: var(--drp-text);
    overflow: hidden;
    user-select: none;
  }

  /* ── Summary bar ──────────────────────────────────────────────────────── */
  .drp-summary {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 24px;
    border-bottom: 1px solid var(--drp-border);
    background: #fafafa;
  }

  .drp-summary-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 110px;
  }

  .drp-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--drp-muted);
  }

  .drp-value {
    font-size: 14px;
    font-weight: 500;
    color: var(--drp-text);
  }

  .drp-value.drp-placeholder {
    color: var(--drp-muted);
    font-style: italic;
  }

  .drp-arrow {
    color: var(--drp-muted);
    font-size: 16px;
    flex: 1;
    text-align: center;
  }

  /* ── Calendars wrapper ────────────────────────────────────────────────── */
  .drp-calendars {
    display: flex;
    gap: 0;
  }

  .drp-calendar {
    flex: 1;
    padding: 16px 20px 20px;
  }

  .drp-calendar + .drp-calendar {
    border-left: 1px solid var(--drp-border);
  }

  /* ── Calendar header ──────────────────────────────────────────────────── */
  .drp-cal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .drp-month-label {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .drp-nav {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: var(--drp-muted);
    line-height: 1;
    padding: 2px 6px;
    border-radius: 6px;
    transition: background 0.15s, color 0.15s;
  }

  .drp-nav:hover {
    background: var(--drp-hover);
    color: var(--drp-text);
  }

  .drp-nav:focus-visible {
    outline: 2px solid var(--drp-accent);
    outline-offset: 2px;
  }

  .drp-nav-spacer {
    width: 28px;
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
    font-size: 11px;
    font-weight: 600;
    color: var(--drp-muted);
    padding: 4px 0 6px;
    letter-spacing: 0.06em;
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
    border-radius: 8px;
    font-size: 13px;
    cursor: pointer;
    color: var(--drp-text);
    transition: background 0.12s, color 0.12s;
    padding: 0;
    overflow: hidden;
  }

  .drp-cell:hover:not(:disabled):not(.drp-start):not(.drp-end) {
    background: var(--drp-hover);
  }

  .drp-cell:focus-visible {
    outline: 2px solid var(--drp-accent);
    outline-offset: 2px;
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
    color: var(--drp-muted);
  }

  .drp-disabled {
    color: var(--drp-disabled);
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Today ring */
  .drp-today .drp-day-num::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 2px solid var(--drp-today-ring);
    opacity: 0.35;
  }

  /* Range fill */
  .drp-in-range {
    border-radius: 0;
    background: var(--drp-range-bg);
  }

  .drp-range-bg {
    position: absolute;
    inset: 0;
    background: var(--drp-range-bg);
    z-index: 0;
    border-radius: 0;
  }

  /* Start / End caps */
  .drp-start,
  .drp-end {
    background: var(--drp-accent) !important;
    color: var(--drp-accent-fg) !important;
    border-radius: 8px;
    z-index: 2;
  }

  /* ── Responsive design ────────────────────────────────────────────────── */
  @media (max-width: 640px) {
    .drp-root {
      width: 100%;
    }

    .drp-calendars {
      flex-direction: column;
    }

    .drp-calendar + .drp-calendar {
      border-left: none;
      border-top: 1px solid var(--drp-border);
    }

    .drp-summary {
      padding: 10px 16px;
    }

    .drp-summary-item {
      min-width: 80px;
    }

    .drp-calendar {
      padding: 12px;
    }
  }

</style>
