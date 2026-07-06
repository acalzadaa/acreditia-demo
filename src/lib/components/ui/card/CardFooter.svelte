<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	const { class: className = '', children }: Props = $props();
</script>

<footer class={['card-footer', className]}>
	{@render children()}
</footer>