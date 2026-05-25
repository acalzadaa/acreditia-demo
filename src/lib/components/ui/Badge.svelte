<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant: 'info' | 'success' | 'warning' | 'error';
		class?: string;
		children: Snippet;
		[key: string]: any;
	}

	const { variant, children, class: className = '' }: Props = $props();
</script>

<span
	class={[
		'status-badge',
		'text-caption',
		className,
		{
			[`status-badge--variant-${variant}`]: true
		}
	]}
>
	{@render children?.()}
</span>

<style>
	.status-badge {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		border-radius: 9999px;
		text-transform: capitalize;
	}

	.status-badge--variant-success {
		background-color: var(--bg-success-subtle);
		color: var(--text-on-success);
		border: var(--border-width-thin) solid var(--border-success-strong);
	}

	.status-badge--variant-error {
		background-color: var(--bg-error-subtle);
		color: var(--text-on-error);
		border: var(--border-width-thin) solid var(--border-error-strong);
	}

	.status-badge--variant-warning {
		background-color: var(--bg-warning-subtle);
		color: var(--text-on-warning);
		border: var(--border-width-thin) solid var(--border-warning-strong);
	}

	.status-badge--variant-info {
		background-color: var(--bg-info-subtle);
		color: var(--text-on-info);
		border: var(--border-width-thin) solid var(--border-info-strong);
	}
</style>
