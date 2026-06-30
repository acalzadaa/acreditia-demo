<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './Badge.svelte';

	const { Story } = defineMeta({
		title: 'ui/Badge',
		component: Badge,
		tags: ['autodocs'],
		args: {
			variant: 'success',
			children: 'test'
		},
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['info', 'success', 'warning', 'error']
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
