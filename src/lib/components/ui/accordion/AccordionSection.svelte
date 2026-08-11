<!--
@component
# AccordionSection
Agrupa un AccordionHeaderButton + su AccordionContent asociado como
una sola unidad visual dentro de Accordion, cuando hay más de un par
header/content (ej. "Archivos", "Urls"). Da separación/borde entre
secciones sin que HeaderButton/Content necesiten saberlo.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	const { class: className = '', children }: Props = $props();
</script>

<div class={['accordion-section', className]}>
	{@render children()}
</div>