<script lang="ts">
	type Status = 'normal' | 'success' | 'error' | 'warning' | 'info';

	export type OptionData = {
		id: string;
		option: string;
	};
	interface Props {
		name: string;
		label?: string;
		value: string;
		errors?: string | string[];
		required?: boolean;
		placeholder?: string;
		status?: Status;
		disabled?: boolean;
		optionsData: OptionData[];
		class?: string;
		[key: string]: any;
	}
	let {
		name,
		label = '',
		value = $bindable(''),
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
</script>

<div class={['form-field', className, { [`form-field--${status}`]: status !== 'normal' }]}>
	{#if label}
		<label for={name} class="form-label text-caption">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}

	<select
		id={name}
		{name}
		class="form-select text-body"
		bind:value
		{required}
		{disabled}
		aria-invalid={hasErrors ? 'true' : undefined}
		aria-required={required}
		aria-describedby={hasErrors ? `${name}-error` : undefined}
		{...props}
	>
		<option value="" disabled selected={!value}>
			{placeholder}
		</option>

		{#each optionsData as { id, option }}
			<option value={id}>
				{option}
			</option>
		{/each}
	</select>
	{#if hasErrors}
		<div class="form-feedback-container" id="{name}-error" role="alert">
			{#each errorList as err}
				<span class="form-feedback form-feedback--{status} text-body-small">
					{err}
				</span>
			{/each}
		</div>
	{/if}
</div>
