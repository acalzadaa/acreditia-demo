<script lang="ts">
	import OptionsList from './OptionsList.svelte';

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
		placeholder?: string;
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
		status = 'normal',
		disabled = false,
		optionsData,
		class: className = '',
		...props
	}: Props = $props();

	// Normalizar errors siempre a string[]
	const errorList = $derived(Array.isArray(errors) ? errors : errors ? [errors] : []);
	const hasErrors = $derived(errorList.length > 0);

	// nullOption se resuelve como una opción más (id: '') para que el listbox
	// la maneje igual que cualquier otra — nada de casos especiales al navegar.
	const allOptions = $derived(
		nullOption ? [{ id: '', option: nullOption }, ...optionsData] : optionsData
	);

	const selectedOption = $derived(allOptions.find((o) => o.id === value));

	const listboxId = `${name}-listbox`;
	const labelId = `${name}-label`;

	let open = $state(false);
	let wrapperEl: HTMLDivElement;
	let triggerEl: HTMLButtonElement;

	function toggleOpen() {
		if (disabled) return;
		open = !open;
	}

	function openList() {
		if (disabled || open) return;
		open = true;
	}

	function closeList(refocus = false) {
		open = false;
		if (refocus) triggerEl?.focus();
	}

	function handleSelect(id: string) {
		value = id;
		closeList(true);
	}

	// El trigger es un <button role="combobox">, no un <select>: hay que
	// replicar a mano lo que el navegador da gratis en el nativo
	// (abrir con flecha/enter/espacio, cerrar con escape, etc).
	function handleTriggerKeydown(e: KeyboardEvent) {
		if (disabled) return;
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openList();
		}
	}

	// Cerrar al hacer click fuera del wrapper (trigger + panel).
	// No hace falta un handler de click afuera separado para el panel:
	// wrapperEl envuelve a ambos.
	function handleWindowMousedown(e: MouseEvent) {
		if (!open) return;
		const target = e.target as Node;
		if (wrapperEl && !wrapperEl.contains(target)) {
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

	<!--
		select-wrapper es el ancestro position:relative del que cuelga
		el listbox (top:100%). Vive dentro de .form-field, así que el
		panel se posiciona respecto al campo, no respecto al .modal
		ni al viewport — igual que pediste.
	-->
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
			options={allOptions}
			{value}
			onSelect={handleSelect}
			onClose={() => closeList(true)}
		/>
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
