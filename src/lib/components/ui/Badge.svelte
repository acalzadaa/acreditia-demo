<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon, { type IconName } from './Icon.svelte';

	export type BadgeStatus = 'info' | 'warning' | 'error' | 'success';
	export type BadgeShape = 'rectangle' | 'pill';
	export type BadgeIconPosition = 'left' | 'right';

	interface Props {
		variant: BadgeStatus;
		shape?: BadgeShape;
		icon?: IconName;
		iconPosition?: BadgeIconPosition;
		iconRotate?: number;
		class?: string;
		children: Snippet;
		[key: string]: unknown;
	}

	const {
		variant,
		shape = 'pill',
		icon,
		iconPosition = 'left',
		iconRotate = 0,
		children,
		class: className = '',
		...props
	}: Props = $props();

	const hasIcon = $derived(!!icon);
</script>

<span
	class={[
		'status-badge',
		'text-caption',
		className,
		{
			[`status-badge--variant-${variant}`]: true,
			[`status-badge--shape-${shape}`]: true,
			'status-badge--with-icon': hasIcon,
			[`status-badge--icon-${iconPosition}`]: hasIcon
		}
	]}
	{...props}
>
	{#if icon && iconPosition === 'left'}
		<span class="status-badge--icon">
			<Icon name={icon} rotate={iconRotate} size="sm" color="currentColor" />
		</span>
	{/if}

	{@render children?.()}

	{#if icon && iconPosition === 'right'}
		<span class="status-badge--icon">
			<Icon name={icon} rotate={iconRotate} size="sm" color="currentColor" />
		</span>
	{/if}
</span>

<style>
	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		padding: var(--space-1) var(--space-3);
		border-radius: 9999px;
		text-transform: capitalize;
	}

	.status-badge--shape-pill {
		border-radius: 9999px;
	}

	.status-badge--shape-rectangle {
		border-radius: 4px;
	}

	.status-badge--icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		flex-shrink: 0;
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