<script lang="ts">
	type Status = 'normal' | 'success' | 'error' | 'warning' | 'info';

	interface Props {
		name: string;
		label?: string;
		value: string;
		errors?: string | string[];
		required?: boolean;
		placeholder?: string;
		status?: Status;
		disabled?: boolean;
		rows?: number;
		maxLength?: number;
		showCounter?: boolean;
		class?: string;
		[key: string]: unknown;
	}

	let {
		name,
		label = '',
		value = $bindable(''),
		errors = [],
		required = false,
		placeholder = 'Descripción...',
		status = 'normal',
		disabled = false,
		rows = 4,
		maxLength = 200,
		showCounter = true,
		class: className = '',
		...props
	}: Props = $props();

	// Normalizar errors siempre a string[]
	const errorList = $derived(Array.isArray(errors) ? errors : errors ? [errors] : []);

	const hasErrors = $derived(errorList.length > 0);
	const charCount = $derived(value.length);
	let isNearLimit = $derived(charCount > maxLength * 0.9);
	let isOverLimit = $derived(charCount > maxLength);

	// Handle input to respect max length and sync with bindable value
	function handleInput(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		value = target.value.length > maxLength ? target.value.slice(0, maxLength) : target.value;

		// Mantener el cursor al final si se truncó
		if (target.value.length > maxLength) {
			target.value = value;
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

	<textarea
		id={name}
		{name}
		class={['form-textarea', 'text-body']}
		oninput={handleInput}
		{value}
		{placeholder}
		{rows}
		{required}
		{disabled}
		aria-invalid={errors.length > 0 ? 'true' : undefined}
		aria-required={required}
		aria-describedby={errors.length > 0 ? `${name}-error` : undefined}
		{...props}
	></textarea>

	{#if showCounter}
		<div
			class={[
				'form-counter',
				'text-body-small',
				{
					[`form-feedback--warning`]: isNearLimit && !isOverLimit,
					[`form-feedback--error`]: isNearLimit && isOverLimit
				}
			]}
			aria-live="polite"
		>
			{charCount}/{maxLength}
		</div>
	{/if}

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

<style>
	.form-counter {
		display: flex;
		justify-content: flex-end;
		margin-top: 0.25rem;
	}
</style>
