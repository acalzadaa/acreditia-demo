<script lang="ts">
	/**
	 * DatePickerInput.svelte — Svelte 5
	 *
	 * Props:
	 *   name           {string}
	 *   label          {string}
	 *   singleMode     {boolean}      — fecha simple (true) o rango (false, default)
	 *   placeholder    {string}
	 *   required       {boolean}
	 *   disabled       {boolean}
	 *   errors         {string | string[]}
	 *   status         {'normal'|'success'|'error'|'warning'|'info'}
	 *   minDate        {Date | null}
	 *   maxDate        {Date | null}
	 *   disabledDates  {Date[] | null}
	 *   firstDayOfWeek {number}       — 0=Dom, 1=Lun
	 *   locale         {string}       — ej. 'es-MX'
	 *   class          {string}
	 *
	 * Bindable:
	 *   startDate  {Date | null}
	 *   endDate    {Date | null}   — siempre null en singleMode
	 *
	 * Events:
	 *   onchange({ startDate, endDate })
	 */

	import { tick } from 'svelte';
	import IconButton from '../IconButton.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import DateRangePicker from '../DateRangePicker.svelte';

	type Status = 'normal' | 'success' | 'error' | 'warning' | 'info';

	interface Props {
		name: string;
		label?: string;
		singleMode?: boolean;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		errors?: string | string[];
		status?: Status;
		minDate?: Date | null;
		maxDate?: Date | null;
		disabledDates?: Date[] | null;
		firstDayOfWeek?: number;
		locale?: string;
		class?: string;
		startDate?: Date | null;
		endDate?: Date | null;
		onchange?: (payload: { startDate: Date | null; endDate: Date | null }) => void;
		[key: string]: unknown;
	}

	let {
		name,
		label = '',
		singleMode = false,
		placeholder = '',
		required = false,
		disabled = false,
		errors = [],
		status = 'normal' as Status,
		minDate = null,
		maxDate = null,
		disabledDates = null,
		firstDayOfWeek = 1,
		locale = 'es-MX',
		class: className = '',
		startDate = $bindable(null),
		endDate = $bindable(null),
		onchange = null,
		...restProps
	}: Props = $props();

	// ── State ────────────────────────────────────────────────────────────────
	let isOpen = $state(false);
	let anchorEl: HTMLDivElement | null = $state(null);

	// Posición calculada del popover (se actualiza al abrir)
	let popoverStyle = $state('');

	// ── Formato DD/MM/AAAA ───────────────────────────────────────────────────
	function fmt(d: Date | null): string {
		if (!d) return '';
		const dd = String(d.getDate()).padStart(2, '0');
		const mm = String(d.getMonth() + 1).padStart(2, '0');
		return `${dd}/${mm}/${d.getFullYear()}`;
	}

	const displayValue = $derived(
		!startDate
			? ''
			: singleMode || !endDate
				? fmt(startDate)
				: `${fmt(startDate)} - ${fmt(endDate)}`
	);

	const errorList = $derived(Array.isArray(errors) ? errors : errors ? [errors] : []);
	const hasErrors = $derived(errorList.length > 0);

	const effectivePlaceholder = $derived(
		placeholder || (singleMode ? 'DD/MM/AAAA' : 'DD/MM/AAAA - DD/MM/AAAA')
	);

	// ── Abrir: calcular posición del anchor ──────────────────────────────────
	async function openPicker() {
		if (disabled) return;

		if (anchorEl) {
			const rect = anchorEl.getBoundingClientRect();
			const scrollY = window.scrollY;
			const scrollX = window.scrollX;
			popoverStyle = [
				`position: fixed`,
				`top: ${rect.bottom + 6}px`,
				`left: ${rect.left}px`,
				`min-width: ${rect.width}px`,
				`z-index: 9999`
			].join('; ');
		}

		isOpen = true;
	}

	function togglePicker(e: MouseEvent) {
		e.stopPropagation();
		if (isOpen) {
			isOpen = false;
		} else {
			openPicker();
		}
	}

	// ── Callback del DateRangePicker ─────────────────────────────────────────
	function handlePickerChange(payload: { startDate: Date | null; endDate: Date | null }) {
		startDate = payload.startDate;
		endDate = payload.endDate;

		const complete = singleMode ? !!startDate : !!(startDate && endDate);
		if (complete) {
			setTimeout(() => {
				isOpen = false;
			}, 180);
		}

		if (typeof onchange === 'function') {
			onchange({ startDate, endDate });
		}
	}
</script>

<div
	class={['dpi-root', className, { [`form-field--${status}`]: status !== 'normal' }]}
	{...restProps}
>
	<!-- Label -->
	{#if label}
		<label for={name} class="form-label text-caption">
			{label}
			{#if required}<span class="dpi-required">*</span>{/if}
		</label>
	{/if}

	<!-- Input + botón icono -->
	<div
		bind:this={anchorEl}
		class={[
			'dpi-input-wrap',
			{ 'dpi-input-wrap--open': isOpen, 'dpi-input-wrap--disabled': disabled }
		]}
	>
		<input
			id={name}
			{name}
			type="text"
			class="form-input text-body dpi-input"
			readonly
			{required}
			{disabled}
			value={displayValue}
			placeholder={effectivePlaceholder}
			aria-haspopup="dialog"
			aria-invalid={hasErrors ? 'true' : undefined}
			aria-describedby={hasErrors ? `${name}-error` : undefined}
			onclick={openPicker}
		/>

		<div class="dpi-icon-wrap">
			<IconButton
				name="calendar"
tooltipLabel="Modificar fechas"
				size="sm"
				variant="ghost"
				isActive={isOpen}
				{disabled}
				ariaLabel="Abrir calendario"
				ariaExpanded={isOpen}
				ariaControls="{name}-picker"
				onClick={togglePicker}
				onKeydown={(e: KeyboardEvent) => {
					if (e.key === 'Enter' || e.key === ' ') togglePicker(e as unknown as MouseEvent);
				}}
			/>
		</div>
	</div>

	<!-- Errores -->
	{#if hasErrors}
		<div class="form-feedback-container" id="{name}-error" role="alert">
			{#each errorList as err (err)}
				<span class="form-feedback form-feedback--{status} text-body-small">{err}</span>
			{/each}
		</div>
	{/if}
</div>

<!-- Modal: backdrop + Escape manejados por el componente nativo -->
<Modal
	bind:open={isOpen}
	closeOnEscape={true}
	closeOnBackdropClick={true}
	id="{name}-picker"
	aria-label={singleMode ? 'Seleccionar fecha' : 'Seleccionar rango de fechas'}
	style={popoverStyle}
	class="dpi-modal"
>
	<DateRangePicker
		{singleMode}
		{minDate}
		{maxDate}
		{disabledDates}
		{firstDayOfWeek}
		{locale}
		bind:startDate
		bind:endDate
		onchange={handlePickerChange}
	/>
</Modal>

<style>
	.dpi-root {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	/* ── Input wrapper ──────────────────────────────────────────────────── */
	.dpi-input-wrap {
		position: relative;
		display: flex;
		align-items: center;
	}

	.dpi-input {
		width: 100%;
		cursor: pointer;
		padding-right: 2.5rem !important;
	}

	.dpi-input:read-only {
		cursor: pointer;
	}

	.dpi-input-wrap--disabled .dpi-input {
		cursor: not-allowed;
	}

	.dpi-input-wrap--open .dpi-input {
		outline: 2px solid var(--color-primary, #4f46e5);
		outline-offset: -1px;
	}

	/* ── Icono ───────────────────────────────────────────────────────────── */
	.dpi-icon-wrap {
		position: absolute;
		right: 4px;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
	}

	/* ── Modal posicionado como popover ─────────────────────────────────── */
	/*
    El <dialog> recibe el `style` calculado con getBoundingClientRect(),
    así que sólo necesitamos asegurarnos de que no tenga margen auto
    (que es lo que centraría el dialog por defecto).
  */
	:global(dialog.dpi-modal) {
		margin: 0 !important;
	}

	/* ── Misc ────────────────────────────────────────────────────────────── */
	.dpi-required {
		color: var(--color-error, #ef4444);
		margin-left: 2px;
	}
</style>
