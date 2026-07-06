<script lang="ts">
	import { tooltip, type TooltipPosition } from '$lib/actions/tooltip';
	import Icon, { type IconName } from './Icon.svelte';

	interface Props {
		name: IconName;
		variant?: 'ghost' | 'solid' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		shape?: 'round' | 'square';
		isActive?: boolean;
		isDisabled?: boolean;
		type?: 'button' | 'submit' | 'reset';

		tooltipLabel?: string;
		tooltipDirection?: TooltipPosition;

		ariaLabel?: string;
		ariaExpanded?: boolean;
		ariaControls?: string;
		
		class?: string;
		onClick: (e: MouseEvent) => void;
		onKeydown?: (e: KeyboardEvent) => void;
		[key: string]: unknown;
	}

	const {
		name,
		variant = 'ghost',
		size = 'md',
		shape = 'round',
		isActive = false,
		isDisabled = false,
		type = 'button',

		tooltipLabel = '',
		tooltipDirection = 'top',

		ariaLabel,
		ariaExpanded,
		ariaControls,

		class: className = '',
		onClick,
		onKeydown,
		...restProps
	}: Props = $props();

	let tooltipActive = $derived(tooltipLabel.length > 0 ? true : false);

	function handleKeyDown(e: KeyboardEvent) {
		if (onKeydown && (e.key === 'Enter' || e.key === ' ')) {
			onKeydown(e);
		}
	}
</script>

<button
	use:tooltip={{
		active: tooltipActive,
		content: tooltipLabel,
		position: tooltipDirection
	}}
	class={[
		'button',
		'icon-button',
		className,
		{
			[`icon-button--size-${size}`]: true,
			[`icon-button--variant-${variant}`]: true,
			[`icon-button--shape-${shape}`]: true,
			'icon-button--disabled': isDisabled,
			'icon-button--active': isActive
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
	<Icon {name} {size} isFilled={variant === 'solid' && isActive} />
</button>
