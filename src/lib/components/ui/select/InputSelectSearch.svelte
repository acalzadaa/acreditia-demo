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
	import type { OptionData } from './utils/select';

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

	const listboxId = `${name}-listbox`;
	const labelId = `${name}-label`;

	let open = $state(false);
	let wrapperEl: HTMLDivElement;
	let triggerEl: HTMLButtonElement;
	let searchInputEl: HTMLInputElement | undefined = $state();

	function toggleOpen() {
		if (disabled) return;
		open = !open;
		if (open) query = '';
	}

	function openList() {
		if (disabled || open) return;
		open = true;
		query = '';
	}

	function closeList(refocus = false) {
		open = false;
		query = '';
		if (refocus) triggerEl?.focus();
	}

	function handleSelect(id: string) {
		value = id;
		closeList(true);
	}

	function clearSelection(e: MouseEvent) {
		e.stopPropagation();
		value = '';
		query = '';
		searchInputEl?.focus();
	}

	function handleSearchInput(e: Event) {
		query = (e.target as HTMLInputElement).value;
	}

	function handleTriggerKeydown(e: KeyboardEvent) {
		if (disabled) return;
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openList();
		}
	}

	// OptionsList no le roba el foco al input (autofocusOption={false}),
	// así que acá lo enfocamos nosotros apenas se abre. Mismo motivo que
	// en OptionsList: rAF, no directo, para esperar a que el panel
	// porteado ya esté en el DOM.
	$effect(() => {
		if (open) {
			const raf = requestAnimationFrame(() => searchInputEl?.focus());
			return () => cancelAnimationFrame(raf);
		}
	});

	// Cerrar al hacer click fuera del trigger y fuera del panel porteado
	// (mismo mecanismo que InputSelectCustom).
	function handleWindowMousedown(e: MouseEvent) {
		if (!open) return;
		const target = e.target as Node;
		const panelEl = document.getElementById(listboxId);
		const insideTrigger = wrapperEl?.contains(target);
		const insidePanel = panelEl?.contains(target);
		if (!insideTrigger && !insidePanel) {
			closeList();
		}
	}
</script>

<svelte:window onmousedown={handleWindowMousedown} />

<div class={['form-field', className, { [`form-field--${status}`]: status !== 'normal' }]}>
	{#if label}
		<label id={labelId} for={name} class="form-label text-caption">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}

	<div class="select-wrapper text-body" bind:this={wrapperEl}>
		<button
			type="button"
			bind:this={triggerEl}
			id={name}
			class="form-select text-body"
			role="combobox"
			aria-haspopup="listbox"
			aria-expanded={open}
			aria-controls={listboxId}
			aria-labelledby={label ? labelId : undefined}
			aria-invalid={hasErrors ? 'true' : undefined}
			aria-required={required}
			aria-describedby={hasErrors ? `${name}-error` : undefined}
			{disabled}
			onclick={toggleOpen}
			onkeydown={handleTriggerKeydown}
			{...props}
		>
			<span class="form-select__value" class:form-select__placeholder={!selectedOption}>
				{selectedOption ? selectedOption.option : placeholder}
			</span>
		</button>

		<OptionsList
			id={listboxId}
			labelledBy={label ? labelId : undefined}
			show={open}
			options={filteredOptions}
			{value}
			anchorEl={wrapperEl}
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
						value={query}
						placeholder={searchPlaceholder}
						autocomplete="off"
						spellcheck="false"
						aria-label={label ? `Buscar en ${label}` : 'Buscar opción'}
						aria-controls={listboxId}
						oninput={handleSearchInput}
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