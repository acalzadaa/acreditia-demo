<script lang="ts">
	import { fly } from 'svelte/transition';
	import Icon, { type IconName } from './Icon.svelte';
	import IconButton from './IconButton.svelte';

	type ToastVariant = 'success' | 'critical' | 'info' | 'warning';

	interface Props {
		variant: ToastVariant;
		label: string;
		dismissible?: boolean;
		ondismiss?: () => void;
		class?: string;
		[key: string]: unknown;
	}

	const {
		variant,
		label,
		dismissible = true,
		ondismiss,
		class: className = '',
		...restProps
	}: Props = $props();

	const iconMap: Record<ToastVariant, IconName> = {
		success: 'check',
		critical: 'close',
		warning: 'warning',
		info: 'info'
	};

	const icon = $derived(iconMap[variant]);
</script>

<div
	class={['toast', `toast--variant-${variant}`, className]}
	role={variant === 'critical' ? 'alert' : 'status'}
	aria-live={variant === 'critical' ? 'assertive' : 'polite'}
	aria-atomic="true"
	transition:fly={{ y: 12, duration: 200 }}
	{...restProps}
>
	<Icon name={icon} size="sm" />

	<span class="toast__label text-body">{label}</span>

	{#if dismissible}
		<IconButton
			name="close"
			size="sm"
			variant="ghost"
			ariaLabel="Cerrar notificación"
			onClick={() => ondismiss?.()}
			onKeydown={(e) => e.key === 'Enter' && ondismiss?.()}
			class="toast__close"
		/>
	{/if}
</div>

<style>
	.toast {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		width: 22rem;
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-md);
		border: var(--border-width-thin) solid;
		box-shadow: var(--shadow-md);
	}

	.toast--variant-success {
		background-color: var(--bg-success-subtle);
		border-color: var(--border-success-strong);
		color: var(--text-on-success);
	}

	.toast--variant-critical {
		background-color: var(--bg-error-subtle);
		border-color: var(--border-error-strong);
		color: var(--text-on-error);
	}

	.toast--variant-warning {
		background-color: var(--bg-warning-subtle);
		border-color: var(--border-warning-strong);
		color: var(--text-on-warning);
	}

	.toast--variant-info {
		background-color: var(--bg-info-subtle);
		border-color: var(--border-info-strong);
		color: var(--text-on-info);
	}

	.toast__label {
		flex: 1;
	}

	.toast__close {
		flex-shrink: 0;
	}
</style>
