<script lang="ts">
	/**
	 * @component InputSelectSearch
	 *
	 * Select con panel de búsqueda. Por fuera se comporta y se ve como un
	 * `<select>` normal (mismo `.form-select`, con su chevron); al hacer click
	 * despliega un panel debajo con un input de búsqueda (ícono `search` a la
	 * izquierda, ícono `close` a la derecha para limpiar la selección) y,
	 * debajo de ese input, la lista filtrada de opciones. Click en una opción
	 * actualiza el valor y cierra el panel.
	 *
	 * El valor real (`value`, el id) viaja en un `<input type="hidden">` para
	 * que el componente siga funcionando dentro de un `<form>` nativo, igual
	 * que `InputSelect`.
	 *
	 * Nota sobre `required`: al no ser un `<select>` nativo, el navegador no
	 * puede validarlo por sí solo (los inputs `hidden` quedan fuera de la
	 * validación de constraints). `required` sigue agregando el asterisco al
	 * label y `aria-required`, pero la validación real debe resolverse por
	 * fuera (ej. mostrando `errors` desde el servidor o desde tu librería de
	 * formularios).
	 */
	import Icon, { type IconName } from '../Icon.svelte';
	import IconButton from '../IconButton.svelte';

	type Status = 'normal' | 'success' | 'error' | 'warning' | 'info';

	export type OptionData = {
		id: string;
		option: string;
	};

	interface Props {
		name: string;
		label?: string;
		value: string;
		nullOption?: string;
		errors?: string | string[];
		required?: boolean;
		/** Texto mostrado en el trigger cuando no hay valor seleccionado. */
		placeholder?: string;
		/** Placeholder del input de búsqueda dentro del panel. */
		searchPlaceholder?: string;
		/** Texto mostrado cuando el filtro no encuentra opciones. */
		noResultsText?: string;
		status?: Status;
		disabled?: boolean;
		optionsData: OptionData[];
		class?: string;
		onChange?: (value: string) => void;
		onFocus?: (e: FocusEvent) => void;
		onBlur?: (e: FocusEvent) => void;
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
		onChange,
		onFocus,
		onBlur,
		...props
	}: Props = $props();

	const errorList = $derived(Array.isArray(errors) ? errors : errors ? [errors] : []);
	const hasErrors = $derived(errorList.length > 0);

	// Lista completa de opciones, incluyendo la opción "ninguno" si existe
	const allOptions = $derived(
		nullOption !== undefined ? [{ id: '', option: nullOption }, ...optionsData] : optionsData
	);

	const selectedOption = $derived(allOptions.find((o) => o.id === value));

	let containerEl: HTMLDivElement | undefined = $state();
	let triggerEl: HTMLButtonElement | undefined = $state();
	let searchInputEl: HTMLInputElement | undefined = $state();
	let listboxEl: HTMLUListElement | undefined = $state();

	let isOpen = $state(false);
	let query = $state('');
	let activeIndex = $state(-1);

	const listboxId = `${name}-listbox`;
	const optionDomId = (id: string) => `${name}-option-${id || 'null'}`;

	function normalize(str: string) {
		return str
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase();
	}

	const filteredOptions = $derived(
		query.trim() === ''
			? allOptions
			: allOptions.filter((o) => normalize(o.option).includes(normalize(query)))
	);

	// El botón X limpia tanto el texto buscado como la selección actual
	const showClearButton = $derived(query.length > 0 || value !== '');

	function openPanel() {
		if (disabled) return;
		isOpen = true;
		query = '';
		const idx = allOptions.findIndex((o) => o.id === value);
		activeIndex = idx >= 0 ? idx : 0;
		requestAnimationFrame(() => searchInputEl?.focus());
	}

	function closePanel() {
		isOpen = false;
		query = '';
		activeIndex = -1;
	}

	function togglePanel() {
		if (isOpen) {
			closePanel();
		} else {
			openPanel();
		}
	}

	function selectOption(opt: OptionData) {
		value = opt.id;
		onChange?.(opt.id);
		closePanel();
		triggerEl?.focus();
	}

	function clearSelection(e: MouseEvent) {
		e.stopPropagation();
		value = '';
		query = '';
		activeIndex = 0;
		onChange?.('');
		searchInputEl?.focus();
	}

	function handleTriggerKeydown(e: KeyboardEvent) {
		if (disabled) return;
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			if (!isOpen) openPanel();
		}
	}

	function handleSearchInput(e: Event) {
		query = (e.target as HTMLInputElement).value;
		activeIndex = 0;
	}

	function scrollActiveIntoView() {
		requestAnimationFrame(() => {
			const activeEl = listboxEl?.querySelector('[data-active="true"]') as HTMLElement | null;
			activeEl?.scrollIntoView({ block: 'nearest' });
		});
	}

	function handleSearchKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				activeIndex = Math.min(activeIndex + 1, filteredOptions.length - 1);
				scrollActiveIntoView();
				break;
			case 'ArrowUp':
				e.preventDefault();
				activeIndex = Math.max(activeIndex - 1, 0);
				scrollActiveIntoView();
				break;
			case 'Enter':
				e.preventDefault();
				if (filteredOptions[activeIndex]) selectOption(filteredOptions[activeIndex]);
				break;
			case 'Escape':
				e.preventDefault();
				closePanel();
				triggerEl?.focus();
				break;
			case 'Tab':
				closePanel();
				break;
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (containerEl && !containerEl.contains(e.target as Node)) {
			closePanel();
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}
	});
</script>

<div
	class={['form-field', className, { [`form-field--${status}`]: status !== 'normal' }]}
	bind:this={containerEl}
>
	{#if label}
		<label for={name} class="form-label text-caption">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}

	<div class="form-combobox">
		<button
			{...props}
			bind:this={triggerEl}
			id={name}
			type="button"
			class="form-select text-body form-combobox-trigger"
			class:form-combobox-trigger--placeholder={!selectedOption}
			{disabled}
			aria-haspopup="listbox"
			aria-expanded={isOpen}
			aria-controls={listboxId}
			aria-describedby={hasErrors ? `${name}-error` : undefined}
			onclick={togglePanel}
			onkeydown={handleTriggerKeydown}
		>
			{selectedOption ? selectedOption.option : placeholder}
		</button>

		<!-- Input real que viaja con el <form>: guarda el id, no el texto de búsqueda -->
		<input type="hidden" {name} {value} {required} />

		{#if isOpen}
			<div class="form-combobox-panel">
				<div class="form-combobox-search">
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
						aria-activedescendant={filteredOptions[activeIndex]
							? optionDomId(filteredOptions[activeIndex].id)
							: undefined}
						oninput={handleSearchInput}
						onkeydown={handleSearchKeydown}
						onfocus={onFocus}
						onblur={onBlur}
					/>
					{#if showClearButton}
						<IconButton
							name="close"
							size="sm"
							variant="ghost"
							ariaLabel="Limpiar selección"
							class="form-combobox-clear-btn"
							onClick={clearSelection}
						/>
					{/if}
				</div>

				<ul class="form-combobox-listbox" role="listbox" id={listboxId} bind:this={listboxEl}>
					{#if filteredOptions.length === 0}
						<li class="form-combobox-empty text-body-small">{noResultsText}</li>
					{:else}
						{#each filteredOptions as opt, i (opt.id || 'null')}
							<li
								id={optionDomId(opt.id)}
								role="option"
								aria-selected={opt.id === value}
								data-active={i === activeIndex}
								class="form-combobox-option text-body"
								class:form-combobox-option--active={i === activeIndex}
								class:form-combobox-option--selected={opt.id === value}
								onclick={() => selectOption(opt)}
								onkeydown={() => {}}
								onmouseenter={() => (activeIndex = i)}
							>
								{opt.option}
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		{/if}
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
