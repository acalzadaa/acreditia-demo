<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		maxWidth?: string;
		minWidth?: string;
		class?: string;
		children: Snippet;
	}

	const { maxWidth, minWidth, class: className = '', children }: Props = $props();

	const style = $derived(
		[
			maxWidth ? `--card-column-max-width: ${maxWidth}` : '',
			minWidth ? `--card-column-min-width: ${minWidth}` : ''
		]
			.filter(Boolean)
			.join('; ')
	);
</script>

<div class={['card-column', className]} style={style || undefined}>
	{@render children()}
</div>