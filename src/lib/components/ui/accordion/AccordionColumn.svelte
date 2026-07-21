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
			maxWidth ? `--accordion-column-max-width: ${maxWidth}` : '',
			minWidth ? `--accordion-column-min-width: ${minWidth}` : ''
		]
			.filter(Boolean)
			.join('; ')
	);
</script>

<div class={['accordion-column', className]} style={style || undefined}>
	{@render children()}
</div>