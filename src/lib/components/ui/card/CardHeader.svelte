<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		subtitle?: string;
		title: string;
		/** Ej. un <Badge> de estatus. */
		
		children?: Snippet;
		class?: string;
	}

	const { subtitle, title, children, class: className = '' }: Props = $props();
</script>

<header class={['card-header', className]}>
	{#if subtitle}
		<span class="card-header__subtitle text-caption">{subtitle}</span>
	{/if}
	<h3 class="card-header__title text-body-strong">{title}</h3>
	{#if children}
		<div class="card-header__metadata">
			{@render children()}
		</div>
	{/if}
</header>