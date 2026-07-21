<!--
@component
# Accordion - componente
Wrapper general de un accordion. Independiente de Card: no comparte
clases ni tokens con card.css.

## Elementos
- Accordion es el wrapper general de un accordion.
- AccordionColumn administra el layout (siempre 1 accordion por renglón).
- AccordionHeader / AccordionHeaderClickable son las 3 variantes de header
  (solo texto, texto + acción, o header-botón clickeable para expand/collapse).
- AccordionContent es el wrapper colapsable de la lista de items.
- AccordionContentItem es un item de esa lista (label/value + IconButton
  de eliminar opcional).
- AccordionFooter es un wrapper opcional donde se agrupan IconButtons.
- Todos los aspectos visuales están en accordion.css.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	const { class: className = '', children }: Props = $props();
</script>

<article class={['accordion', className]}>
	{@render children()}
</article>