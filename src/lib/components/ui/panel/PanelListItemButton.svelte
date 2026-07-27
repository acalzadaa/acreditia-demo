<!--
@component
# PanelListItemButton
Variante A de item de lista para PanelContent: todo el renglón es un
`<button>`. Recibe un snippet libre para el texto/contenido.

Reutiliza el hover y el layout de `.panel-content-item`; solo
agrega el reset propio de `<button>` (panel.css).

## Ejemplo
```svelte
<PanelListItemButton onClick={() => navigateTo(item.url)}>
	{item.name}
</PanelListItemButton>
```
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onClick: (e: MouseEvent) => void;
		isDisabled?: boolean;
		class?: string;
		children: Snippet;
	}

	const { onClick, isDisabled = false, class: className = '', children }: Props = $props();
</script>

<button
	type="button"
	class={['panel-content-item', 'panel-list-item--button', className]}
	onclick={onClick}
	disabled={isDisabled}
>
	{@render children()}
</button>