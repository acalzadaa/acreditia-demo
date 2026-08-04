<script lang="ts">
	type Status = 'normal' | 'success' | 'error' | 'warning' | 'info';

	interface Props {
		name: string;
		label?: string;
		checked?: boolean;
		group?: unknown[];
		value?: unknown;
		errors?: string | string[];
		required?: boolean;
		status?: Status;
		disabled?: boolean;
		onChange?: ()=> void;
		class?: string;
		[key: string]: unknown;
	}
	let {
		name,
		label = '',
		checked = $bindable(false),
		group = $bindable(undefined),
		value,
		errors = [],
		required = false,
		status = 'normal',
		disabled = false,
		onChange,
		class: className = '',
		...props
	}: Props = $props();

	// Normalizar errors siempre a string[]
	const errorList = $derived(Array.isArray(errors) ? errors : errors ? [errors] : []);

	const hasErrors = $derived(errorList.length > 0);
</script>

<div class={['form-field', className]}>
	<label
		for={name}
		class={[
			'form-check',
			{
				'form-check--disabled': disabled
			}
		]}
	>
		<input
			type="checkbox"
			id={name}
			{name}
			class="form-check-input"
			{value}
			bind:checked
			bind:group
			{required}
			{disabled}
			onchange={onChange}
			aria-invalid={hasErrors ? 'true' : undefined}
			aria-required={required}
			aria-describedby={hasErrors ? `${name}-error` : undefined}
			{...props}
		/>

		{#if label}
			<span
				class={[
					'form-check-label',
					'text-body',
					{
						'form-check-label--disabled': disabled
					}
				]}
			>
				{label}
				{#if required}
					<span class="required">*</span>
				{/if}
			</span>
		{/if}
	</label>

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
