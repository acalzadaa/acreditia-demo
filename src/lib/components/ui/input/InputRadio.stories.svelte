<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InputRadio from './InputRadio.svelte';

	const { Story } = defineMeta({
		title: 'ui/InputRadio',
		component: InputRadio,
		tags: ['autodocs'],
		args: {
			name: 'radio',
			label: 'Opción A',
			value: 'a',
			group: undefined,
			errors: [],
			required: false,
			status: 'normal',
			disabled: false
		},
		argTypes: {
			status: {
				control: { type: 'select' },
				options: ['normal', 'success', 'error', 'warning', 'info']
			},
			errors: {
				control: { type: 'object' }
			},
			required: {
				control: { type: 'boolean' }
			},
			disabled: {
				control: { type: 'boolean' }
			}
		}
	});
</script>

<script lang="ts">
	// Estado local para las stories de grupo de radios
	let planSelected: string = $state('basic');
	let statusSelected: string = $state('warning');
	let disabledSelected: string = $state('option2');
</script>

<!-- Basic Variants -->
<Story name="Default">
	{#snippet template(args)}
		<InputRadio
			name={args.name}
			label={args.label}
			value={args.value}
			group={args.group}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story name="Selected" args={{ group: 'a' }}>
	{#snippet template(args)}
		<InputRadio
			name={args.name}
			label={args.label}
			value={args.value}
			group={args.group}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story name="Without Label" args={{ label: '' }}>
	{#snippet template(args)}
		<InputRadio
			name={args.name}
			label={args.label}
			value={args.value}
			group={args.group}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story name="Required" args={{ label: 'Selecciona un plan', required: true }}>
	{#snippet template(args)}
		<InputRadio
			name={args.name}
			label={args.label}
			value={args.value}
			group={args.group}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<!-- Status Variants -->
<Story name="Success Status" args={{ status: 'success', group: 'a', label: 'Confirmado' }}>
	{#snippet template(args)}
		<InputRadio
			name={args.name}
			label={args.label}
			value={args.value}
			group={args.group}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story name="Warning Status" args={{ status: 'warning', label: 'Revisa esta opción' }}>
	{#snippet template(args)}
		<InputRadio
			name={args.name}
			label={args.label}
			value={args.value}
			group={args.group}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story name="Info Status" args={{ status: 'info', label: 'Opción informativa' }}>
	{#snippet template(args)}
		<InputRadio
			name={args.name}
			label={args.label}
			value={args.value}
			group={args.group}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<!-- Error Messages -->
<Story
	name="With Single Error"
	args={{
		status: 'error',
		errors: ['Debes seleccionar una opción para continuar'],
		label: 'Opción A',
		required: true
	}}
>
	{#snippet template(args)}
		<InputRadio
			name={args.name}
			label={args.label}
			value={args.value}
			group={args.group}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story
	name="With Multiple Errors"
	args={{
		status: 'error',
		errors: ['Este campo es obligatorio', 'Debes elegir una opción válida'],
		label: 'Confirmo mi elección'
	}}
>
	{#snippet template(args)}
		<InputRadio
			name={args.name}
			label={args.label}
			value={args.value}
			group={args.group}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<!-- Disabled State -->
<Story name="Disabled" args={{ disabled: true, label: 'Opción no disponible' }}>
	{#snippet template(args)}
		<InputRadio
			name={args.name}
			label={args.label}
			value={args.value}
			group={args.group}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story
	name="Disabled Selected"
	args={{ disabled: true, group: 'a', label: 'Ya seleccionada' }}
>
	{#snippet template(args)}
		<InputRadio
			name={args.name}
			label={args.label}
			value={args.value}
			group={args.group}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<!-- Group Example (uso natural: varios radios, un solo valor seleccionado) -->
<Story name="Group">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<InputRadio name="plan" label="Básico" value="basic" bind:group={planSelected} />
			<InputRadio name="plan" label="Pro" value="pro" bind:group={planSelected} />
			<InputRadio name="plan" label="Enterprise" value="enterprise" bind:group={planSelected} />
		</div>
		<p style="margin-top: 8px; font-size: 12px; color: var(--text-muted);">
			Seleccionado: {planSelected || '(ninguno)'}
		</p>
	{/snippet}
</Story>

<!-- Group with status (ej. respuesta requerida que aún no fue enviada) -->
<Story name="Group With Warning">
	{#snippet template()}
		<fieldset class="form-check-group">
			<legend>¿Aceptas los nuevos términos?</legend>
			<InputRadio
				name="terms-response"
				label="Sí, acepto"
				value="yes"
				status="warning"
				bind:group={statusSelected}
			/>
			<InputRadio
				name="terms-response"
				label="No, todavía no"
				value="no"
				status="warning"
				bind:group={statusSelected}
			/>
		</fieldset>
	{/snippet}
</Story>

<!-- Group with one disabled option -->
<Story name="Group With Disabled Option">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<InputRadio
				name="shipping"
				label="Estándar"
				value="option1"
				bind:group={disabledSelected}
			/>
			<InputRadio
				name="shipping"
				label="Express (no disponible en tu zona)"
				value="option2"
				disabled
				bind:group={disabledSelected}
			/>
			<InputRadio
				name="shipping"
				label="Recoger en tienda"
				value="option3"
				bind:group={disabledSelected}
			/>
		</div>
	{/snippet}
</Story>