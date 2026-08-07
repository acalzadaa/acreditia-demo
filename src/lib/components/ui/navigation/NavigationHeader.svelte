<!--
@component
# NavigationHeaderClickable
Variante 3 del header de navigation: todo el bloque es un <button> que
controla el expand/collapse. Recibe el `toggle` (de `createToggle()`)
creado y manejado en +page.svelte, y lo comparte con el
NavigationContent asociado — así ambos leen el mismo estado sin
sincronizar props por separado.

Ej.:
```svelte
<script>
	import { createToggle } from '$lib/utils/toggle.svelte';
	const sectionToggle = createToggle();
</script>

<NavigationHeaderClickable title="Sección" toggle={sectionToggle} id="acc-1" />
<NavigationContent id="acc-1" toggle={sectionToggle}>
	...
</NavigationContent>
```
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onClickNavigate: () => void;
		ariaLabel?: string;

		/** titulo y/o subtitulo */
		title?: Snippet;
		subtitle?: Snippet;

		/** badge opcional */
		/** Ej. un <Badge> de estatus, debajo del título. */
		children?: Snippet;
		class?: string;
	}

	const {
		subtitle,
		title,
		onClickNavigate,
		ariaLabel = 'Navigate',
		children,
		class: className = ''
	}: Props = $props();
</script>

<button
	type="button"
	class={['navigation-header', 'navigation-header--clickable', className]}
	aria-label={ariaLabel}
	onclick={onClickNavigate}
>
	<div class="navigation-header__left">
		{#if title}
			<div class="navigation-header__title text-h6">
				{@render title()}
			</div>
		{/if}
		{#if subtitle}
			<div class="navigation-header__subtitle text-body">
				{@render subtitle()}
			</div>
		{/if}
		{#if children}
			<div class="navigation-header__metadata">
				{@render children()}
			</div>
		{/if}
	</div>
</button>
