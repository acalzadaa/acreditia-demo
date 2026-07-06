<script lang="ts">
	import Button from '../Button.svelte';

	interface Props {
		label?: string;
		value: string;
		class?: string;
	}

	const { label, value, class: className = '' }: Props = $props();

	let expanded = $state(false);
	let isOverflowing = $state(false);
	let textEl: HTMLParagraphElement;

	function checkOverflow() {
		if (!textEl || expanded) return;
		isOverflowing = textEl.scrollHeight - textEl.clientHeight > 1;
	}

	$effect(() => {
		// re-chequear si cambia el valor (ej. item distinto reutilizando el nodo)
		checkOverflow();

		const ro = new ResizeObserver(() => checkOverflow());
		if (textEl) ro.observe(textEl);

		return () => ro.disconnect();
	});

	function toggle() {
		expanded = !expanded;
	}
</script>

<div class={['card-content-item', className]}>
	{#if label}
		<span class="card-content-item__label text-label">{label}</span>
	{/if}
	<p
		bind:this={textEl}
		class="card-content-item__text text-body"
		class:card-content-item__text--clamped={!expanded}
	>
		{value}
	</p>
	{#if isOverflowing || expanded}
		<div class="card-content-item__toggle text-body-small">
			<Button type="button" variant="link" onClick={toggle}>
				{expanded ? 'ver menos' : 'ver más'}
			</Button>
		</div>
	{/if}
</div>
