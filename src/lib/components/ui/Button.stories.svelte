<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'ui/Button',
		component: Button,
		tags: ['autodocs'],
		args: {
			children: 'button',
			onClick: fn(),
			onKeyDown: fn()
		},
		argTypes: {
			type: {
				control: { type: 'select' },
				options: ['button', 'submit', 'reset']
			},
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'ghost', 'link', 'text']
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg']
			}
		}
	});
</script>

<!-- Variantes -->
<Story name="Primary" args={{ variant: 'primary' }}>
	{#snippet template(args)}
		<Button
			variant={args.variant}
			onClick={args['onClick']}
			onKeyDown={args['onKeyboardHandler']}
		>
			{args.children}
		</Button>
	{/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }}>
	{#snippet template(args)}
		<Button
			variant={args.variant}
			onClick={args['onClick']}
			onKeyDown={args['onKeyboardHandler']}
		>
			{args.children}
		</Button>
	{/snippet}
</Story>

<Story name="Outline" args={{ variant: 'outline' }}>
	{#snippet template(args)}
		<Button
			variant={args.variant}
			onClick={args['onClick']}
			onKeyDown={args['onKeyboardHandler']}
		>
			{args.children}
		</Button>
	{/snippet}
</Story>

<Story name="Ghost" args={{ variant: 'ghost' }}>
	{#snippet template(args)}
		<Button
			variant={args.variant}
			onClick={args['onClick']}
			onKeyDown={args['onKeyboardHandler']}
		>
			{args.children}
		</Button>
	{/snippet}
</Story>

<Story name="Critical" args={{ variant: 'critical' }}>
	{#snippet template(args)}
		<Button
			variant={args.variant}
			onClick={args['onClick']}
			onKeyDown={args['onKeyboardHandler']}
		>
			{args.children}
		</Button>
	{/snippet}
</Story>

<Story name="Link" args={{ variant: 'link' }}>
	{#snippet template(args)}
		<Button
			variant={args.variant}
			onClick={args['onClick']}
			onKeyDown={args['onKeyboardHandler']}
		>
			{args.children}
		</Button>
	{/snippet}
</Story>

