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
			maxWidth ? `--navigation-column-max-width: ${maxWidth}` : '',
			minWidth ? `--navigation-column-min-width: ${minWidth}` : ''
		]
			.filter(Boolean)
			.join('; ')
	);
</script>

<div class={['navigation-column', className]} style={style || undefined}>
	{@render children()}
</div>