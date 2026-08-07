<!--
@component
# AccordionHeaderClickable
Variante 3 del header de accordion: todo el bloque es un <button> que
controla el expand/collapse. Recibe el `toggle` (de `createToggle()`)
creado y manejado en +page.svelte, y lo comparte con el
AccordionContent asociado — así ambos leen el mismo estado sin
sincronizar props por separado.

Ej.:
```svelte
<script>
	import { createToggle } from '$lib/utils/toggle.svelte';
	const sectionToggle = createToggle();
</script>

<AccordionHeaderClickable title="Sección" toggle={sectionToggle} id="acc-1" />
<AccordionContent id="acc-1" toggle={sectionToggle}>
	...
</AccordionContent>
```
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '../Icon.svelte';

	interface Props {
		/** Id compartido con el AccordionContent asociado (aria-controls). */
		id?: string;
		isVisible: boolean;
		onToggle: () => void;
		toggleAriaLabel?: string;

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
		id,
		isVisible,
		onToggle,
		toggleAriaLabel = 'Expandir/colapsar',
		children,
		class: className = ''
	}: Props = $props();
</script>

<button
	type="button"
	class={['accordion-header', 'accordion-header--clickable', { 'is-open': isVisible }, className]}
	aria-expanded={isVisible}
	aria-controls={id}
	aria-label={toggleAriaLabel}
	onclick={onToggle}
>
	<div class="accordion-header__left">
		{#if title}
			<div class="accordion-header__title text-h6">
				{@render title()}
			</div>
		{/if}
		{#if subtitle}
			<div class="accordion-header__subtitle text-body">
				{@render subtitle()}
			</div>
		{/if}
		{#if children}
			<div class="accordion-header__metadata">
				{@render children()}
			</div>
		{/if}
	</div>
	<Icon name="chevron-down" class="accordion-header__chevron" rotate={isVisible ? 180 : 0} />
</button>
