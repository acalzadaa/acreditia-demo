<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		code?: string;
		name: string;
		/** Ej. un <Badge> de estatus. */
		children?: Snippet;
		class?: string;
	}

	const { code, name, children, class: className = '' }: Props = $props();
</script>

<header class={['card-header', className]}>
	{#if code}
		<span class="card-header__code text-caption">{code}</span>
	{/if}
	<h3 class="card-header__name text-body-strong">{name}</h3>
	{#if children}
		<div class="card-header__status">
			{@render children()}
		</div>
	{/if}
</header>