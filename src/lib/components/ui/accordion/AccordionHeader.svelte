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

<header class={['accordion-header accordion-header__left', className]}>
	{#if title}
		<div class="accordion-header__title text-h6">
			{@render title()}
		</div>
	{/if}
	{#if subtitle}
		<div class="accordion-header__subtitle text-body">
			{@render subtitle()}
		</div>
	{/if}
	{#if children}
		<div class="accordion-header__metadata">
			{@render children()}
		</div>
	{/if}
</header>
