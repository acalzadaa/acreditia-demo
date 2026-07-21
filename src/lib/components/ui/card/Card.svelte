<!--
@component
# Card - componente
- Es un componente que sirve para mostra datos fijos esta organizado en 5 elementos:

## Elementos
- Card es un wrapper general de un card.
- CardColumn (lista vertical) y CardGrid (ajustado en cuadricula de forma automatica) administran el layout
- CardContent es un wrapper para ordenar el contenido del card
- CardContentItem es un agrupador de un dato, en la forma de label (opcional) y value
- CardFooter es un wrapper opcional donde se agrupan IconButtons
- todos los aspectos visuales estan configurados en card.css
## Variantes
Se tiene una variante A, donde: 
- header contiene texto, 
- content tiene una lista de datos
- footer contiene IconButtons
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	const { class: className = '', children }: Props = $props();
</script>

<article class={['card', className]}>
	{@render children()}
</article>