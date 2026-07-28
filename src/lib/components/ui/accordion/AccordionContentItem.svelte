<!--
@component
# AccordionContentItem
Label + value con clamp a 2 renglones y "ver más"/"ver menos", con un
IconButton opcional a la derecha (ej. eliminar el registro).
-->

<script lang="ts">
	import { createToggle } from '$lib/utils/toggle.svelte';
	import Button from '../Button.svelte';
	import type { IconName } from '../Icon.svelte';
	import IconButton from '../IconButton.svelte';

	interface Props {
		label: string;
		value?: string;
		/** Si se pasa, se muestra un IconButton a la derecha del item. */
		onRemove?: () => void;
		removeIcon?: IconName;
		removeAriaLabel?: string;
		class?: string;
	}

	const {
		label,
		value = '',
		onRemove,
		removeIcon = 'delete',
		removeAriaLabel = 'Eliminar',
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

<div class={['accordion-content-item', className]}>
	<div class="accordion-content-item__body">
		{#if label}
			<span class="accordion-content-item__label text-label">{label}</span>
		{/if}
		<p
			bind:this={textEl}
			class="accordion-content-item__text text-body"
			class:accordion-content-item__text--clamped={!expandedToggle.value}
		>
			{value}
		</p>
		{#if isOverflowing || expandedToggle.value}
			<div class="accordion-content-item__toggle text-body-small">
				<Button type="button" variant="link" onClick={expandedToggle.toggle}>
					{expandedToggle.value ? 'ver menos' : 'ver más'}
				</Button>
			</div>
		{/if}
	</div>
	{#if onRemove}
		<div class="accordion-content-item__remove">
			<IconButton
				name={removeIcon}
				variant="ghost"
				size="sm"
				ariaLabel={removeAriaLabel}
				onClick={onRemove}
			/>
		</div>
	{/if}
</div>
