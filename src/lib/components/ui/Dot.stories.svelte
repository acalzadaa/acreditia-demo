<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Dot from './Dot.svelte';

	const { Story } = defineMeta({
		title: 'ui/Dot',
		component: Dot,
		tags: ['autodocs'],
		args: {
			size: 'md',
			color: 'var(--bg-brand-primary)',
			borderColor: null
		},
		argTypes: {
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md', 'lg']
			},
			color: {
				control: { type: 'text' }
			},
			borderColor: {
				control: { type: 'text' }
			}
		}
	});
</script>

<!-- Tamaños -->
<Story name="XS" args={{ size: 'xs' }}>
	{#snippet template(args)}
		<Dot size={args.size} color={args.color} borderColor={args.borderColor} />
	{/snippet}
</Story>

<Story name="SM" args={{ size: 'sm' }}>
	{#snippet template(args)}
		<Dot size={args.size} color={args.color} borderColor={args.borderColor} />
	{/snippet}
</Story>

<Story name="MD" args={{ size: 'md' }}>
	{#snippet template(args)}
		<Dot size={args.size} color={args.color} borderColor={args.borderColor} />
	{/snippet}
</Story>

<Story name="LG" args={{ size: 'lg' }}>
	{#snippet template(args)}
		<Dot size={args.size} color={args.color} borderColor={args.borderColor} />
	{/snippet}
</Story>

<!-- Colores de estado -->
<Story name="Success" args={{ color: 'var(--bg-success-bold)' }}>
	{#snippet template(args)}
		<Dot size={args.size} color={args.color} borderColor={args.borderColor} />
	{/snippet}
</Story>

<Story name="Warning" args={{ color: 'var(--bg-warning-bold)' }}>
	{#snippet template(args)}
		<Dot size={args.size} color={args.color} borderColor={args.borderColor} />
	{/snippet}
</Story>

<Story name="Error" args={{ color: 'var(--bg-error-bold)' }}>
	{#snippet template(args)}
		<Dot size={args.size} color={args.color} borderColor={args.borderColor} />
	{/snippet}
</Story>

<!-- Con borde (ej. status dot sobre avatar) -->
<Story
	name="WithBorder"
	args={{ color: 'var(--bg-success-bold)', borderColor: 'var(--bg-sunken)' }}
>
	{#snippet template(args)}
		<div style="background: var(--bg-sunken); padding: 1rem; display: inline-block;">
			<Dot size={args.size} color={args.color} borderColor={args.borderColor} />
		</div>
	{/snippet}
</Story>

<!-- Todos los tamaños juntos, para comparar -->
<Story name="AllSizes">
	{#snippet template(args)}
		<div style="display: flex; align-items: center; gap: 1rem;">
			<Dot size="xs" color={args.color} />
			<Dot size="sm" color={args.color} />
			<Dot size="md" color={args.color} />
			<Dot size="lg" color={args.color} />
		</div>
	{/snippet}
</Story>