<script lang="ts">
	type Status = 'normal' | 'success' | 'error' | 'warning' | 'info';

	interface Props {
		name: string;
		type?: 'text' | 'password' | 'email' | 'url' | 'search';
		label?: string;
		value: string;
		errors?: string | string[];
		required?: boolean;
		placeholder?: string;
		status?: Status;
		disabled?: boolean;
		class?: string;
		[key: string]: unknown;
	}
	let {
		name,
		type = 'text',
		label = '',
		value = $bindable(''),
		errors = [],
		required = false,
		placeholder = 'Texto',
		status = 'normal',
		disabled = false,
		class: className = '',
		...props
	}: Props = $props();

	// Normalizar errors siempre a string[]
	const errorList = $derived(Array.isArray(errors) ? errors : errors ? [errors] : []);

	const hasErrors = $derived(errorList.length > 0);
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
		{type}
		id={name}
		{name}
		class={['form-input', 'text-body']}
		bind:value
		{placeholder}
		{required}
		{disabled}
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
