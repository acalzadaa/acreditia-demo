<!--
@component
# Accordion - componente
Wrapper general de un accordion. Independiente de Card: no comparte
clases ni tokens con card.css.

## Elementos
- Accordion es el wrapper general de un accordion.
- AccordionColumn administra el layout (siempre 1 accordion por renglón).
- AccordionHeaderClickable / AccordionHeaderButton son las 2 variantes
  de header, ambas controlan expand/collapse: la primera es un header-
  botón completo (título/subtítulo + chevron), la segunda tiene un
  Button de acción a la izquierda y un IconButton chevron a la derecha
  que hace el toggle. (Un header estático sin toggle se movió fuera de
  Accordion — vivirá en un futuro componente Panel.)
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