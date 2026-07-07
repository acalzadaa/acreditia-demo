<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toast from './Toast.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'ui/Toast',
		component: Toast,
		tags: ['autodocs'],
		args: {
			variant: 'info',
			label: 'Esta es una notificación',
			dismissible: true,
			ondismiss: fn()
		},
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['success', 'critical', 'info', 'warning']
			},
			label: {
				control: { type: 'text' }
			},
			dismissible: {
				control: { type: 'boolean' }
			}
		}
	});
</script>

<!-- Variants -->
<Story name="Success" args={{ variant: 'success', label: 'Los cambios se guardaron correctamente' }}>
	{#snippet template(args)}
		<Toast
			variant={args.variant}
			label={args.label}
			dismissible={args.dismissible}
			ondismiss={args.ondismiss}
		/>
	{/snippet}
</Story>

<Story name="Critical" args={{ variant: 'critical', label: 'Ocurrió un error al procesar la solicitud' }}>
	{#snippet template(args)}
		<Toast
			variant={args.variant}
			label={args.label}
			dismissible={args.dismissible}
			ondismiss={args.ondismiss}
		/>
	{/snippet}
</Story>

<Story name="Warning" args={{ variant: 'warning', label: 'Esta acción no se puede deshacer' }}>
	{#snippet template(args)}
		<Toast
			variant={args.variant}
			label={args.label}
			dismissible={args.dismissible}
			ondismiss={args.ondismiss}
		/>
	{/snippet}
</Story>

<Story name="Info" args={{ variant: 'info', label: 'Tienes una nueva actualización disponible' }}>
	{#snippet template(args)}
		<Toast
			variant={args.variant}
			label={args.label}
			dismissible={args.dismissible}
			ondismiss={args.ondismiss}
		/>
	{/snippet}
</Story>

<!-- Dismissible variants -->
<Story name="Non Dismissible" args={{ dismissible: false }}>
	{#snippet template(args)}
		<Toast
			variant={args.variant}
			label={args.label}
			dismissible={args.dismissible}
			ondismiss={args.ondismiss}
		/>
	{/snippet}
</Story>

<!-- Content variants -->
<Story
	name="Long Label"
	args={{
		label:
			'Este es un mensaje de notificación considerablemente más largo para verificar cómo se comporta el layout del toast'
	}}
>
	{#snippet template(args)}
		<Toast
			variant={args.variant}
			label={args.label}
			dismissible={args.dismissible}
			ondismiss={args.ondismiss}
		/>
	{/snippet}
</Story>

<!-- All variants side by side -->
<Story name="All Variants">
	{#snippet template(args)}
		<div style="display: flex; flex-direction: column; gap: 12px;">
			<Toast variant="success" label="Operación exitosa" ondismiss={args.ondismiss} />
			<Toast variant="critical" label="Ocurrió un error crítico" ondismiss={args.ondismiss} />
			<Toast variant="warning" label="Advertencia importante" ondismiss={args.ondismiss} />
			<Toast variant="info" label="Información relevante" ondismiss={args.ondismiss} />
		</div>
	{/snippet}
</Story>