<script lang="ts">
	type Status = 'normal' | 'success' | 'error' | 'warning' | 'info';

	interface Props {
		name: string;
		label?: string;
		value: number | null | undefined;
		errors?: string | string[] | undefined;
		required?: boolean;
		placeholder?: string;
		status?: Status;
		disabled?: boolean;
		class?: string;
		min?: number;
		max?: number;
		step?: number;
		[key: string]: unknown;
	}

	let {
		name,
		label = '',
		value = $bindable(),
		errors = [],
		required = false,
		placeholder = '0',
		status = 'normal',
		disabled = false,
		class: className = '',
		min,
		max,
		step = 1,
		...props
	}: Props = $props();

	// Normalizar errors siempre a string[]
	const errorList = $derived(Array.isArray(errors) ? errors : errors ? [errors] : []);

	const hasErrors = $derived(errorList.length > 0);

	// El input type=number trabaja con strings internamente;
	// sincronizamos manualmente para mantener value como number | null.
	let stringValue = $derived(value != null && !isNaN(value) ? String(value) : '');

	function handleInput(e: Event) {
		const raw = (e.target as HTMLInputElement).value;
		stringValue = raw;

		if (raw === '') {
			value = null;
		} else {
			const num = Number(raw);
			if (!isNaN(num)) value = num;
		}
	}
</script>

<div
	class={[
		'form-field',
		className,
		{
			[`form-field--${status}`]: status !== 'normal'
		}
	]}
>
	{#if label}
		<label for={name} class="form-label text-caption">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}

	<input
		type="number"
		id={name}
		{name}
		class={['form-input', 'text-body']}
		value={stringValue}
		oninput={handleInput}
		{placeholder}
		{required}
		{disabled}
		{min}
		{max}
		{step}
		aria-invalid={hasErrors ? 'true' : undefined}
		aria-required={required}
		aria-describedby={hasErrors ? `${name}-error` : undefined}
		{...props}
	/>

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
