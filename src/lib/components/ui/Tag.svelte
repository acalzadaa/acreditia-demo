<script lang="ts">
	import type { Snippet } from 'svelte';

	export type TagStatus = 'info' | 'warning' | 'error' | 'success';

	interface Props {
		variant?: TagStatus;
		class?: string;
		children: Snippet;
		[key: string]: unknown;
	}

	const { variant = 'info', children, class: className = '', ...props }: Props = $props();
</script>

<span
	class={[
		'tag',
		className,
		{
			[`tag--variant-${variant}`]: true
		},
		props
	]}
>
	{@render children?.()}
</span>

<style>
	.tag {
		display: inline-block;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--border-radius-tag);
		color: var(--text-on-brand);
		background-color: var(--bg-overlay-brand);
		border-radius: var(--border-radius-button);
		padding: var(--space-1) var(--space-2);
		line-height: 1;
	}

	.tag--variant-success {
		background-color: var(--bg-success-subtle);
		color: var(--text-on-success);
	}

	.tag--variant-error {
		background-color: var(--bg-error-subtle);
		color: var(--text-on-error);
	}
	.tag--variant-warning {
		background-color: var(--bg-warning-subtle);
		color: var(--text-on-warning);
	}

	.tag--variant-info {
		background-color: var(--bg-info-subtle);
		color: var(--text-on-info);
	}
</style>
