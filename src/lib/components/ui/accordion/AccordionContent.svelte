<!--
@component
# AccordionContent
Wrapper de la lista de AccordionContentItem, opcionalmente colapsable.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		isCollapsible?: boolean;
		isVisible?: boolean;
		class?: string;
		children: Snippet;
	}

	const {
		isCollapsible = false,
		isVisible = true,
		class: className = '',
		children
	}: Props = $props();
</script>

{#if isCollapsible}
	<div class={['accordion-content-wrapper', { 'is-open': isVisible }]}>
		<div class="accordion-content-inner">
			<div class={['accordion-content', className]}>
				{@render children()}
			</div>
		</div>
	</div>
{:else}
	<div class={['accordion-content', className]}>
		{@render children()}
	</div>
{/if}