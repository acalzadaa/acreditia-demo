<script lang="ts">
	import { tooltip, type TooltipPosition } from '$lib/components/common/utils/tooltip';
	import Icon, { type IconName } from './Icon.svelte';

	interface Props {
		name: IconName;
		variant?: 'ghost' | 'solid' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		color?: string;
		shape?: 'circle' | 'square';
		iconRotate?: number;
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
		/**
		 * Hook opcional para teclas adicionales (p. ej. Escape).
		 * Enter/Space NO pasan por acá: al ser un <button> nativo, el navegador
		 * ya dispara `click` automáticamente con esas teclas, así que `onClick`
		 * se encarga solo. Si `onKeydown` reimplementara esa misma acción,
		 * se ejecutaría dos veces (una por acá, otra por el click nativo).
		 */
		onKeydown?: (e: KeyboardEvent) => void;
		[key: string]: unknown;
	}

	const {
		name,
		variant = 'ghost',
		size = 'md',
		color = 'currentColor',
		shape = 'circle',
		iconRotate = 0,
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
</script>

<button
	use:tooltip={{
		active: tooltipActive,
		content: tooltipLabel,
		position: tooltipDirection
	}}
	class={[
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
	onkeydown={onKeydown}
	aria-label={ariaLabel || name}
	aria-expanded={ariaExpanded}
	aria-controls={ariaControls}
	{...restProps}
>
	<Icon {color} {name} {size} rotate={iconRotate} isFilled={variant === 'solid' && isActive} />
</button>
