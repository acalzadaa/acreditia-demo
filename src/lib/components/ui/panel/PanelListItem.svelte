<!--
@component
# PanelListItem
Variante B de item de lista para PanelContent: el renglón no es
clickeable como bloque. Recibe un snippet libre de texto/contenido a
la izquierda y, opcionalmente, un snippet `action` a la derecha (ej.
un IconButton o Button independiente del resto del renglón).

Es la versión "genérica" de PanelContentItem: mismo hover/layout
(`.panel-content-item`), pero sin label/value/clamp — el
contenido es libre vía snippet.

## Ejemplo
```svelte
<PanelListItem>
	{item.name}
	{#snippet action()}
		<IconButton name="external-link" variant="ghost" size="sm"
			ariaLabel="Abrir" onClick={() => navigateTo(item.url)} />
	{/snippet}
</PanelListItem>
```
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		action?: Snippet;
		class?: string;
		children: Snippet;
	}

	const { action, class: className = '', children }: Props = $props();
</script>

<div class={['panel-content-item', className]}>
	<div class="panel-content-item__body panel-list-item__text text-body">
		{@render children()}
	</div>
	{#if action}
		<div class="panel-list-item__action">
			{@render action()}
		</div>
	{/if}
</div>