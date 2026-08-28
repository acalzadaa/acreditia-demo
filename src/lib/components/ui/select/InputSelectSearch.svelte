<script lang="ts">
	/**
	 * @component InputSelectSearch
	 *
	 * Select con filtro de búsqueda. Es `InputSelectCustom` + un input de
	 * búsqueda: reutiliza el mismo `OptionsList` (portal, posicionamiento
	 * fixed calculado con getBoundingClientRect, navegación con flechas,
	 * Home/End/Escape/Tab) pasándole `options={filteredOptions}` y un
	 * `header` con el input de búsqueda (ícono `search` a la izquierda,
	 * ícono `close` a la derecha para limpiar).
	 *
	 * Como el input de búsqueda vive DENTRO del mismo div porteado que
	 * escucha `onkeydown` en OptionsList, las flechas tecleadas ahí
	 * también mueven el foco entre opciones sin código extra (event
	 * bubbling) — por eso acá no hace falta reimplementar navegación,
	 * solo evitar que OptionsList le robe el foco al input al abrir
	 * (`autofocusOption={false}`).
	 */
	import Icon, { type IconName } from '../Icon.svelte';
	import IconButton from '../IconButton.svelte';
	import OptionsList from './OptionsList.svelte';
	import { createSelectState } from './stores/inputSelect.svelte';
	import type { OptionData } from './utils/inputSelect';

	type Status = 'normal' | 'success' | 'error' | 'warning' | 'info';

	interface Props {
		name: string;
		label?: string;
		value: string;
		nullOption?: string;
		errors?: string | string[];
		required?: boolean;
		placeholder?: string;
		/** Placeholder del input de búsqueda dentro del panel. */
		searchPlaceholder?: string;
		/** Texto mostrado cuando el filtro no encuentra opciones. */
		noResultsText?: string;
		status?: Status;
		disabled?: boolean;
		optionsData: OptionData[];
		class?: string;
		/**
		 * Se dispara cuando el usuario elige una opción. Ver la misma nota
		 * en InputSelectCustom: no es un `onchange` nativo, es explícito
		 * porque el trigger es un <button> y no emite `change`.
		 */
		onValueChange?: (id: string) => void;
		[key: string]: unknown;
	}

	let {
		name,
		label = '',
		value = $bindable(''),
		nullOption = undefined,
		errors = [],
		required = false,
		placeholder = 'Selecciona una opción',
		searchPlaceholder = 'Buscar...',
		noResultsText = 'Sin resultados',
		status = 'normal',
		disabled = false,
		optionsData,
		class: className = '',
		onValueChange,
		...props
	}: Props = $props();

	const errorList = $derived(Array.isArray(errors) ? errors : errors ? [errors] : []);
	const hasErrors = $derived(errorList.length > 0);

	// nullOption se resuelve como una opción más (id: '') — igual que en
	// InputSelectCustom, para que el listbox no necesite casos especiales.
	const allOptions = $derived(
		nullOption ? [{ id: '', option: nullOption }, ...optionsData] : optionsData
	);

	const selectedOption = $derived(allOptions.find((o) => o.id === value));

	function normalize(str: string) {
		return str
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase();
	}

	let query = $state('');

	const filteredOptions = $derived(
		query.trim() === ''
			? allOptions
			: allOptions.filter((o) => normalize(o.option).includes(normalize(query)))
	);

	// El botón X limpia tanto el texto buscado como la selección actual
	const showClearButton = $derived(query.length > 0 || value !== '');

	let searchInputEl: HTMLInputElement | undefined = $state();

	const select = createSelectState({ name, disabled: () => disabled });

	// Envolvemos open/close para además resetear `query`, sin duplicar el
	// resto de la lógica de apertura/cierre (eso vive en createSelectState).
	function toggleOpen() {
		const wasOpen = select.open;
		select.toggleOpen();
		if (!wasOpen) query = '';
	}

	function closeList(refocus = false) {
		select.closeList(refocus);
		query = '';
	}

	function handleSelect(id: string) {
		value = id;
		onValueChange?.(id);
		closeList(true);
	}

	function clearSelection(e: MouseEvent) {
		e.stopPropagation();
		value = '';
		onValueChange?.('');
		query = '';
		searchInputEl?.focus();
	}

	// OptionsList no le roba el foco al input (autofocusOption={false}),
	// así que acá lo enfocamos nosotros apenas se abre. Mismo motivo que
	// en OptionsList: rAF, no directo, para esperar a que el panel
	// porteado ya esté en el DOM.
	$effect(() => {
		if (select.open) {
			const raf = requestAnimationFrame(() => searchInputEl?.focus());
			return () => cancelAnimationFrame(raf);
		}
	});
</script>

<svelte:window onpointerdown={select.handleWindowPointerdown} />

<div class={['form-field', className, { [`form-field--${status}`]: status !== 'normal' }]}>
	{#if label}
		<label id={select.labelId} for={name} class="form-label text-caption">
			{label}
			{#if required}
				<span class="required" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<div class="select-wrapper text-body" bind:this={select.wrapperEl}>
		<button
			type="button"
			bind:this={select.triggerEl}
			id={name}
			class="form-select text-body"
			role="combobox"
			aria-haspopup="listbox"
			aria-expanded={select.open}
			aria-controls={select.listboxId}
			aria-labelledby={label ? select.labelId : undefined}
			aria-invalid={hasErrors ? 'true' : undefined}
			aria-required={required}
			aria-describedby={hasErrors ? `${name}-error` : undefined}
			{disabled}
			onclick={toggleOpen}
			onkeydown={select.handleTriggerKeydown}
			{...props}
		>
			<span class="form-select__value" class:form-select__placeholder={!selectedOption}>
				{selectedOption ? selectedOption.option : placeholder}
			</span>
			<svg
				class="form-select__chevron"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<polyline points="6 9 12 15 18 9" />
			</svg>
		</button>

		<OptionsList
			id={select.listboxId}
			labelledBy={label ? select.labelId : undefined}
			show={select.open}
			options={filteredOptions}
			{value}
			anchorEl={select.wrapperEl}
			onSelect={handleSelect}
			onClose={() => closeList(true)}
			emptyMessage={noResultsText}
			autofocusOption={false}
		>
			{#snippet header()}
				<div class="select-combobox-search">
					<span class="form-input-icon form-input-icon--left">
						<Icon name={'search' as IconName} size="sm" />
					</span>
					<input
						bind:this={searchInputEl}
						type="text"
						class="form-input text-body form-input--with-icon-left"
						bind:value={query}
						placeholder={searchPlaceholder}
						autocomplete="off"
						spellcheck="false"
						aria-label={label ? `Buscar en ${label}` : 'Buscar opción'}
						aria-controls={select.listboxId}
					/>
					{#if showClearButton}
						<IconButton
							name="close"
							size="sm"
							variant="ghost"
							ariaLabel="Limpiar selección"
							class="select-combobox-clear-btn"
							onClick={clearSelection}
						/>
					{/if}
				</div>
			{/snippet}
		</OptionsList>
	</div>

	<!-- Ver la misma nota en InputSelectCustom: necesario para que el valor
		viaje en un submit nativo / FormData. -->
	<input type="hidden" {name} {value} />

	{#if hasErrors}
		<div class="form-feedback-container" id="{name}-error" role="alert">
			{#each errorList as err (err)}
				<span class="form-feedback form-feedback--{status} text-body-small">
					{err}
				</span>
			{/each}
		</div>
	{/if}
</div>