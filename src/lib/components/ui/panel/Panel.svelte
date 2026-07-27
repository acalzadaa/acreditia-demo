<!--
@component
# Panel
Wrapper general de un panel estático (no colapsable, sin footer).
Es el componente al que hacía referencia el comentario en
accordion.css: "El header estático no-clickeable, sin toggle, se
movió fuera de Accordion — vivirá en un futuro componente Panel."

Reutiliza a propósito las mismas clases visuales de accordion.css
(.accordion, .accordion-content, .accordion-content-item) porque
Panel es, visualmente, un Accordion sin toggle y sin footer — no
amerita duplicar tokens ni CSS nuevo.

## Elementos
- Panel — este wrapper (equivalente a Accordion.svelte).
- AccordionHeader (ya existente) — se reutiliza tal cual para el
  título + subtítulo opcional, ya que ya es estático/no-clickeable.
- PanelContent — lista de items (equivalente a AccordionContent sin
  la rama colapsable).
- PanelListItemButton — variante A: el renglón completo es un botón.
- PanelListItem — variante B: snippet de texto + botón de acción
  opcional a la derecha.

## Ejemplo
```svelte
<script lang="ts">
	import Panel from '$lib/components/ui/Panel.svelte';
	import PanelContent from '$lib/components/ui/PanelContent.svelte';
	import PanelListItemButton from '$lib/components/ui/PanelListItemButton.svelte';
	import PanelHeader from '$lib/components/ui/PanelHeader.svelte';
</script>

<Panel>
	<PanelHeader title="Complementos" subtitle="Agregar" />
	<PanelContent>
		{#each items as item (item.id)}
			<PanelListItemButton onClick={() => navigateTo(item.url)}>
				{item.name}
			</PanelListItemButton>
		{/each}
	</PanelContent>
</Panel>
```
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	const { class: className = '', children }: Props = $props();
</script>

<section class={['panel', className]}>
	{@render children()}
</section>
