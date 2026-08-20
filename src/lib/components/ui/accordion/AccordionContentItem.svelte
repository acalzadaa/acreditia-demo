<!--
@component
# AccordionContentItem
Label + value con clamp a 2 renglones y "ver más"/"ver menos", con un
IconButton opcional a la derecha (ej. eliminar el registro).

isVisible (optional, default=false) activa activa hover si AccordionContent isVisible={true}
Esto funciona para cuando se desea crear un AccordionContent a manera de subheader.
)
-->

<script lang="ts">
	import { createToggle } from '$lib/utils/toggle.svelte';
	import type { Snippet } from 'svelte';
	import Button from '../Button.svelte';
	import type { IconName } from '../Icon.svelte';
	import IconButton from '../IconButton.svelte';
	import Dot from '../Dot.svelte';

	interface Props {
		label?: string;
		value?: string;
		children?: Snippet;
		/** (opcional) usar el valor de isVisible de AccordionContent,
		 * esta opcion apaga :hover si no es visible por default */
		isVisible?: boolean;
		/** presenta una viñeta al inicio del item */
		dot?: boolean;
		/** Si se pasa, se muestra un IconButton a la derecha del item. */
		onAction?: () => void;
		actionIcon?: IconName;
		actionAriaLabel?: string;
		class?: string;
	}

	const {
		label,
		value,
		children,
		isVisible = false,
		dot = true,
		onAction,
		actionIcon = 'check',
		actionAriaLabel = 'Action',
		class: className = ''
	}: Props = $props();

	let isOverflowing = $state(false);
	let textEl: HTMLParagraphElement;
	let expandedToggle = createToggle();

	function checkOverflow() {
		if (!textEl || expandedToggle.value) return;
		isOverflowing = textEl.scrollHeight - textEl.clientHeight > 1;
	}

	$effect(() => {
		// re-chequear si cambia el valor (ej. item distinto reutilizando el nodo)
		checkOverflow();

		const ro = new ResizeObserver(() => checkOverflow());
		if (textEl) ro.observe(textEl);

		return () => ro.disconnect();
	});
</script>

<div class={['accordion-content-item', { 'is-open': isVisible }, className]}>
	{#if dot}
		<Dot size="sm" />
	{/if}
	<div class="accordion-content-item__body">
		{#if label}
			<span class="accordion-content-item__label text-label">{label}</span>
		{/if}
		<p
			bind:this={textEl}
			class="accordion-content-item__text text-body"
			class:accordion-content-item__text--clamped={!expandedToggle.value}
		>
			{#if children}
				{@render children?.()}
			{:else}
				{value}
			{/if}
		</p>
		{#if isOverflowing || expandedToggle.value}
			<div class="accordion-content-item__toggle text-body-small">
				<Button type="button" variant="link" onClick={expandedToggle.toggle}>
					{expandedToggle.value ? 'ver menos' : 'ver más'}
				</Button>
			</div>
		{/if}
	</div>
	{#if onAction}
		<div class="accordion-content-item__action">
			<IconButton
				name={actionIcon}
				variant="ghost"
				size="sm"
				ariaLabel={actionAriaLabel}
				onClick={onAction}
			/>
		</div>
	{/if}
</div>
