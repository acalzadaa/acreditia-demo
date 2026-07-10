<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon, { type IconName } from './Icon.svelte';
	import { tooltip, type TooltipPosition } from '$lib/actions/tooltip';

	export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'critical' | 'ghost' | 'link';

	export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	interface Props {
		type?: 'button' | 'submit' | 'reset';
		variant?: ButtonVariant;
		size?: ButtonSize;
		name?: IconName;
		iconPosition?: 'left' | 'right';
		iconRotate?: number;
		mobileVersion?: boolean;

		isActive?: boolean;
		isDisabled?: boolean;
		class?: string;
		onClick?: (e: MouseEvent) => void;
		onKeyDown?: (e: KeyboardEvent) => void;

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
		iconRotate = 0,
		mobileVersion = false,

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
			'button--full-width': mobileVersion,
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
		<span class="button--icon" style="padding-right: 5px;">
			<Icon
				rotate={iconRotate}
				{name}
				size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
				color="currentColor"
			/>
		</span>
	{/if}

	<span>
		{@render children?.()}
	</span>

	{#if name && iconPosition === 'right'}
		<span class="button--icon" style="padding-left: 5px;">
			<Icon
				rotate={iconRotate}
				{name}
				size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
				color="currentColor"
			/>
		</span>
	{/if}
</button>
