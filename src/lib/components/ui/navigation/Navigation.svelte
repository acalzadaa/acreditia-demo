<!--
@component
# Navigation - componente
Wrapper general de un navigation. Independiente de Card: no comparte
clases ni tokens con card.css.

## Elementos
- Navigation es el wrapper general de un navigation.
- NavigationColumn administra el layout (siempre 1 navigation por renglón).
- NavigationHeaderClickable / NavigationHeaderButton son las 2 variantes
  de header, ambas controlan expand/collapse: la primera es un header-
  botón completo (título/subtítulo + chevron), la segunda tiene un
  Button de acción a la izquierda y un IconButton chevron a la derecha
  que hace el toggle. (Un header estático sin toggle se movió fuera de
  Navigation — vivirá en un futuro componente Panel.)
- NavigationContent es el wrapper colapsable de la lista de items.
- NavigationContentItem es un item de esa lista (label/value + IconButton
  de eliminar opcional).
- NavigationFooter es un wrapper opcional donde se agrupan IconButtons.
- Todos los aspectos visuales están en navigation.css.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	const { class: className = '', children }: Props = $props();
</script>

<article class={['navigation', className]}>
	{@render children()}
</article>