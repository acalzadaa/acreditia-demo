<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon, { type IconName } from './Icon.svelte';
	import type { ButtonSize, ButtonVariant } from '$lib/types/button.types';
	import { tooltip, type TooltipPosition } from '$lib/actions/tooltip';

	interface Props {
		type?: 'button' | 'submit' | 'reset';
		variant?: ButtonVariant;
		size?: ButtonSize;
		name?: IconName;
		iconPosition?: 'left' | 'right';
		fullWidth?: boolean;

		isActive?: boolean;
		isDisabled?: boolean;
		class?: string;
		onClick?: (e: MouseEvent) => void;
		onKeyDown?: (e: KeyboardEvent) => void;

		tooltipActive?: boolean;
		tooltipLabel?: string;
		tooltipDirection?: TooltipPosition;

		ariaLabel?: string;
		ariaExpanded?: boolean;
		ariaControls?: string;

		children?: Snippet;

		[key: string]: unknown;
	}

	const {
		type = 'button',
		variant = 'primary',
		size = 'md',
		name,
		iconPosition = 'left',
		fullWidth = false,

		isActive = false,
		isDisabled = false,

		class: className = '',

		onClick,
		onKeyDown,

		tooltipLabel = '',
		tooltipDirection = 'top',
		ariaLabel,
		ariaExpanded,
		ariaControls,

		children,
		...restProps
	}: Props = $props();

	let tooltipActive = $derived(tooltipLabel.length > 0 ? true : false);

	function handleKeyDown(e: KeyboardEvent) {
		if (onKeyDown && (e.key === 'Enter' || e.key === ' ')) {
			onKeyDown(e);
		}
	}

	const hasIcon = $derived(!!name);
</script>

<button
	use:tooltip={{
		active: tooltipActive,
		content: tooltipLabel,
		position: tooltipDirection
	}}
	class={[
		'button',
		className,
		{
			[`button--variant-${variant}`]: true,
			[`button--size-${size}`]: true,
			[`button--icon-${iconPosition}`]: hasIcon,
			'button--full-width': fullWidth,
			'button--with-icon': hasIcon,
			'button--disabled': isDisabled,
			'button--active': isActive
		}
	]}
	disabled={isDisabled}
	{type}
	onclick={onClick}
	onkeydown={handleKeyDown}
	aria-label={ariaLabel || name}
	aria-expanded={ariaExpanded}
	aria-controls={ariaControls}
	{...restProps}
>
	{#if name && iconPosition === 'left'}
		<span class="button__icon" style="padding-right: 5px;">
			<Icon {name} size={size === 'xs' || size === 'sm' ? 'sm' : 'md'} color="currentColor" />
		</span>
	{/if}

	<span class="button__text">
		{@render children?.()}
	</span>

	{#if name && iconPosition === 'right'}
		<span class="button__icon" style="padding-left: 5px;">
			<Icon {name} size={size === 'xs' || size === 'sm' ? 'sm' : 'md'} color="currentColor" />
		</span>
	{/if}
</button>
