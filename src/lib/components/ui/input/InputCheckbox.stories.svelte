<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InputCheckbox from './InputCheckbox.svelte';

	const { Story } = defineMeta({
		title: 'ui/InputCheckbox',
		component: InputCheckbox,
		tags: ['autodocs'],
		args: {
			name: 'checkbox',
			label: 'Acepto los términos y condiciones',
			checked: false,
			value: undefined,
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
			checked: {
				control: { type: 'boolean' }
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
	// Estado local para la story de grupo de checkboxes
	let groupSelected: string[] = $state([]);
</script>

<!-- Basic Variants -->
<Story name="Default">
	{#snippet template(args)}
		<InputCheckbox
			name={args.name}
			label={args.label}
			checked={args.checked}
			value={args.value}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story name="Checked" args={{ checked: true }}>
	{#snippet template(args)}
		<InputCheckbox
			name={args.name}
			label={args.label}
			checked={args.checked}
			value={args.value}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story name="Without Label" args={{ label: '' }}>
	{#snippet template(args)}
		<InputCheckbox
			name={args.name}
			label={args.label}
			checked={args.checked}
			value={args.value}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story name="Required" args={{ label: 'Acepto recibir comunicaciones', required: true }}>
	{#snippet template(args)}
		<InputCheckbox
			name={args.name}
			label={args.label}
			checked={args.checked}
			value={args.value}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<!-- Status Variants -->
<Story name="Success Status" args={{ status: 'success', checked: true, label: 'Confirmado' }}>
	{#snippet template(args)}
		<InputCheckbox
			name={args.name}
			label={args.label}
			checked={args.checked}
			value={args.value}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story name="Warning Status" args={{ status: 'warning', label: 'Revisa esta opción' }}>
	{#snippet template(args)}
		<InputCheckbox
			name={args.name}
			label={args.label}
			checked={args.checked}
			value={args.value}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story name="Info Status" args={{ status: 'info', label: 'Opción informativa' }}>
	{#snippet template(args)}
		<InputCheckbox
			name={args.name}
			label={args.label}
			checked={args.checked}
			value={args.value}
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
		errors: ['Debes aceptar los términos para continuar'],
		label: 'Acepto los términos y condiciones',
		required: true
	}}
>
	{#snippet template(args)}
		<InputCheckbox
			name={args.name}
			label={args.label}
			checked={args.checked}
			value={args.value}
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
		errors: ['Este campo es obligatorio', 'Debes marcarlo para continuar'],
		label: 'Confirmo mis datos'
	}}
>
	{#snippet template(args)}
		<InputCheckbox
			name={args.name}
			label={args.label}
			checked={args.checked}
			value={args.value}
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
		<InputCheckbox
			name={args.name}
			label={args.label}
			checked={args.checked}
			value={args.value}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<Story name="Disabled Checked" args={{ disabled: true, checked: true, label: 'Ya confirmado' }}>
	{#snippet template(args)}
		<InputCheckbox
			name={args.name}
			label={args.label}
			checked={args.checked}
			value={args.value}
			errors={args.errors}
			required={args.required}
			status={args.status}
			disabled={args.disabled}
		/>
	{/snippet}
</Story>

<!-- Group Example (checkbox group with shared array) -->
<Story name="Group">
	{#snippet template()}
		<div style="display: flex; flex-direction: column; gap: 8px;">
			<InputCheckbox name="fruit" label="Manzana" value="apple" bind:group={groupSelected} />
			<InputCheckbox name="fruit" label="Plátano" value="banana" bind:group={groupSelected} />
			<InputCheckbox name="fruit" label="Naranja" value="orange" bind:group={groupSelected} />
		</div>
		<p style="margin-top: 8px; font-size: 12px; color: var(--text-muted);">
			Seleccionados: {groupSelected.join(', ') || '(ninguno)'}
		</p>
	{/snippet}
</Story>