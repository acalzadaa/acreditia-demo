<script lang="ts">
	import { type TooltipPosition } from '$lib/components/common/utils/tooltip';
	import IconButton from './IconButton.svelte';
	import Badge, { type BadgeStatus } from './Badge.svelte';
	import type { IconName } from './Icon.svelte';

	interface Props {
		name: IconName;
		variant?: 'ghost' | 'solid' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		shape?: 'circle' | 'square';
		isActive?: boolean;
		isDisabled?: boolean;
		type?: 'button' | 'submit' | 'reset';

		/** Color semántico del badge (reusa las variantes de Badge) */
		badgeColor?: BadgeStatus;
		/**
		 * Cantidad a mostrar.
		 * 0 = no se pinta el badge
		 * 1-99 = se muestra el número
		 * >=100 = se muestra "99+"
		 */
		count?: number;
		/** Color del "anillo" que separa el badge del fondo (debe matchear el bg donde vive el botón) */
		ringColor?: string;

		tooltipLabel?: string;
		tooltipDirection?: TooltipPosition;

		ariaLabel?: string;
		ariaExpanded?: boolean;
		ariaControls?: string;

		class?: string;
		onClick: (e: MouseEvent) => void;
		[key: string]: unknown;
	}

	const {
		name,
		variant = 'ghost',
		size = 'md',
		shape = 'circle',
		isActive = false,
		isDisabled = false,
		type = 'button',

		badgeColor = 'error',
		count = 0,
		ringColor = 'var(--bg-overlay)',

		tooltipLabel = '',
		tooltipDirection = 'top',

		ariaLabel,
		ariaExpanded,
		ariaControls,

		class: className = '',
		onClick,
		...restProps
	}: Props = $props();

	// 0 -> no se pinta | 1-99 -> número tal cual | 100+ -> "99+"
	const badgeText = $derived(count <= 0 ? null : count > 99 ? '99+' : String(count));

	// El badge visual es aria-hidden; el conteo real se anuncia acá.
	const computedAriaLabel = $derived(
		badgeText ? `${ariaLabel || name} (${count} notificaciones sin leer)` : ariaLabel
	);
</script>

<div class={['badged-icon-button', className]} style:--badge-ring-color={ringColor}>
	<IconButton
		{name}
		{variant}
		{size}
		{shape}
		{isActive}
		{isDisabled}
		{type}
		{tooltipLabel}
		{tooltipDirection}
		ariaLabel={computedAriaLabel}
		{ariaExpanded}
		{ariaControls}
		{onClick}
		{...restProps}
	/>

	{#if badgeText}
		<Badge variant={badgeColor} shape="pill" aria-hidden="true">
			{badgeText}
		</Badge>
	{/if}
</div>

<style>
	.badged-icon-button {
		position: relative;
		display: inline-flex;
	}

	/* Se pisa el padding/tamaño default de .status-badge (pensado para tags de texto)
	   para convertirlo en un badge compacto tipo notificación. El selector descendiente
	   (.badged-icon-button :global(.status-badge)) tiene mayor especificidad que el
	   .status-badge definido dentro de Badge.svelte, así que gana sin usar !important. */
	.badged-icon-button :global(.status-badge) {
		position: absolute;
		top: -2px;
		right: -3px;

		display: flex;
		align-items: center;
		justify-content: center;

		min-width: 1.25em;
		height: 1.25em;
		padding: 0 var(--space-1);

		line-height: 1;
		text-transform: none;

		box-shadow: 0 0 0 2px var(--badge-ring-color);
		pointer-events: none;
	}
</style>