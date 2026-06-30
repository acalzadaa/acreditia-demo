<script lang="ts">
	import type { IconName } from "../Icon.svelte";
	import Icon from "../Icon.svelte";


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
		iconName?: IconName;
		iconPosition?: 'left' | 'right';
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
		iconName,
		iconPosition = 'left',
		...props
	}: Props = $props();

	const hasIcon = $derived(!!iconName);

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
	<div class="form-input-group">
		{#if hasIcon && iconPosition === 'left'}
			<span class="form-input-icon form-input-icon--left">
				<Icon name={iconName as IconName} size="sm" />
			</span>
		{/if}
		<input
			{type}
			id={name}
			{name}
			class={[
				'form-input',
				'text-body',
				{
					'form-input--with-icon-left': hasIcon && iconPosition === 'left',
					'form-input--with-icon-right': hasIcon && iconPosition === 'right'
				}
			]}
			bind:value
			{placeholder}
			{required}
			{disabled}
			aria-invalid={hasErrors ? 'true' : undefined}
			aria-required={required}
			aria-describedby={hasErrors ? `${name}-error` : undefined}
			{...props}
		/>
		{#if hasIcon && iconPosition === 'right'}
			<span class="form-input-icon form-input-icon--right">
				<Icon name={iconName as IconName} size="sm" />
			</span>
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