<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** titulo y/o subtitulo */
		title?: Snippet;
		subtitle?: Snippet;
		/** Ej. un <Badge> de estatus. */

		children?: Snippet;
		class?: string;
	}

	const { subtitle, title, children, class: className = '' }: Props = $props();
</script>

<header class={['card-header', className]}>
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
</header>
