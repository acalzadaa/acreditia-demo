<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './Badge.svelte';

	const { Story } = defineMeta({
		title: 'ui/Badge',
		component: Badge,
		tags: ['autodocs'],
		args: {
			variant: 'success',
			shape: 'pill',
			children: 'test'
		},
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['info', 'success', 'warning', 'error']
			},
			shape: {
				control: { type: 'select' },
				options: ['pill', 'rectangle']
			},
			icon: {
				control: { type: 'text' },
				description: 'Nombre del icono opcional (mismo set que usa Button/Icon)'
			},
			iconPosition: {
				control: { type: 'select' },
				options: ['left', 'right'],
				description: 'Lado en el que se muestra el icono'
			},
			content: {
				control: { type: 'text' },
				description: 'Content to display inside the badge'
			}
		}
	});
</script>

<Story name="Info" args={{ variant: 'info' }}>
	{#snippet template(args)}
		<Badge variant={args.variant}>
			{args.children}
		</Badge>
	{/snippet}
</Story>

<Story name="Error" args={{ variant: 'error' }}>
	{#snippet template(args)}
		<Badge variant={args.variant}>
			{args.children}
		</Badge>
	{/snippet}
</Story>

<Story name="Warning" args={{ variant: 'warning' }}>
	{#snippet template(args)}
		<Badge variant={args.variant}>
			{args.children}
		</Badge>
	{/snippet}
</Story>

<Story name="Success">
	{#snippet template(args)}
		<Badge variant={args.variant}>
			{args.children}
		</Badge>
	{/snippet}
</Story>

<Story name="With Icon Left" args={{ variant: 'success', icon: 'check', iconPosition: 'left', children: 'Completado' }}>
	{#snippet template(args)}
		<Badge variant={args.variant} icon={args.icon} iconPosition={args.iconPosition}>
			{args.children}
		</Badge>
	{/snippet}
</Story>

<Story
	name="With Icon Right"
	args={{ variant: 'error', icon: 'alert-triangle', iconPosition: 'right', children: 'Fallido' }}
>
	{#snippet template(args)}
		<Badge variant={args.variant} icon={args.icon} iconPosition={args.iconPosition}>
			{args.children}
		</Badge>
	{/snippet}
</Story>

<Story name="Rectangle Shape" args={{ variant: 'info', shape: 'rectangle', icon: 'info', children: 'Info' }}>
	{#snippet template(args)}
		<Badge variant={args.variant} shape={args.shape} icon={args.icon}>
			{args.children}
		</Badge>
	{/snippet}
</Story>

<Story name="All Variants With Icon">
	{#snippet template()}
		<div style="display: flex; gap: 8px; flex-wrap: wrap;">
			<Badge variant="info" icon="info">Info</Badge>
			<Badge variant="success" icon="check">Success</Badge>
			<Badge variant="warning" icon="warning">Warning</Badge>
			<Badge variant="error" icon="close">Error</Badge>
		</div>
	{/snippet}
</Story>