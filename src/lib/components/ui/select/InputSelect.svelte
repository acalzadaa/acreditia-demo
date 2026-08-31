<script lang="ts">
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
		status?: Status;
		disabled?: boolean;
		optionsData: OptionData[];
		class?: string;
		/**
		 * Se dispara cuando el usuario elige una opción (no en cada render,
		 * solo en la interacción). Pensado para efectos secundarios —
		 * analytics, fetch dependiente, etc. — sin depender de que el padre
		 * arme un $effect sobre `value`. Distinto de un `onchange` nativo:
		 * como el trigger es un <button>, pasar `onchange` por props no
		 * hace nada (los botones no emiten evento `change`).
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
		status = 'normal',
		disabled = false,
		optionsData,
		class: className = '',
		onValueChange,
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

	const select = createSelectState({ name, disabled: () => disabled });

	function handleSelect(id: string) {
		value = id;
		onValueChange?.(id);
		select.closeList(true);
	}
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

	<!--
		select-wrapper ya no es el contenedor position:relative del que
		"cuelga" el panel: el panel (OptionsList) se portea afuera del
		modal/overflow y se posiciona con position:fixed calculado desde
		el getBoundingClientRect de este wrapper (ver anchorEl). Así el
		ancho y la posición siguen atados visualmente a este campo, pero
		el panel puede pintarse por encima de todo, modal incluido.
	-->
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
			onclick={select.toggleOpen}
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
			options={allOptions}
			{value}
			anchorEl={select.wrapperEl}
			onSelect={handleSelect}
			onClose={() => select.closeList(true)}
		/>
	</div>

	<!--
		Sin esto, el valor de este campo nunca viaja en un submit nativo /
		FormData: el trigger es un <button>, no un <select>, así que el
		browser no lo incluye por su cuenta. Necesario para progressive
		enhancement (ej. form actions de SvelteKit) o cualquier <form
		method="post"> plano.
	-->
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