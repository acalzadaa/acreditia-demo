<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** titulo y/o subtitulo */
		title?: Snippet;
		subtitle?: Snippet;
		/** Ej. un <Badge> de estatus. */

		children?: Snippet;
		onClick?: () => void;
		class?: string;
	}

	const { subtitle, title, children, onClick, class: className = '' }: Props = $props();
</script>

<button
	type="button"
	class={['card-header', 'card-header--clickable', className]}
	aria-label="Navigate to detail"
	onclick={onClick}
>
	{#if title}
		<div class="card-header__title text-h6">
			{@render title()}
		</div>
	{/if}
	{#if subtitle}
		<div class="card-header__subtitle text-body">
			{@render subtitle()}
		</div>
	{/if}
	{#if children}
		<div class="card-header__metadata">
			{@render children()}
		</div>
	{/if}
</button>
