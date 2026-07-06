<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Ancho mínimo de cada card antes de que el grid agregue/quite columnas. */
		minWidth?: string;
		class?: string;
		children: Snippet;
	}

	const { minWidth, class: className = '', children }: Props = $props();
</script>

<div
	class={['card-grid', className]}
	style={minWidth ? `--card-min-width: ${minWidth}` : undefined}
>
	{@render children()}
</div>