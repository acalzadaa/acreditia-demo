<script lang="ts">
	import { createToggle } from '$lib/utils/toggle.svelte';
	import Button from '../Button.svelte';

	interface Props {
		label: string;
		value?: string;
		class?: string;
	}

	const { label, value = '', class: className = '' }: Props = $props();

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

<div class={['card-content-item', className]}>
	{#if label}
		<span class="card-content-item__label text-label">{label}</span>
	{/if}
	<p
		bind:this={textEl}
		class="card-content-item__text text-body"
		class:card-content-item__text--clamped={!expandedToggle.value}
	>
		{value}
	</p>
	{#if isOverflowing || expandedToggle.value}
		<div class="card-content-item__toggle text-body-small">
			<Button type="button" variant="link" onClick={expandedToggle.toggle}>
				{expandedToggle.value ? 'ver menos' : 'ver más'}
			</Button>
		</div>
	{/if}
</div>
