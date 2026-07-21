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
		subtitle?: string;
		title: string;
		/** Id compartido con el AccordionContent asociado (aria-controls). */
		id?: string;
		isVisible: boolean;
		onClick: () => void;

		/** Ej. un <Badge> de estatus, debajo del título. */
		children?: Snippet;
		class?: string;
	}

	const {
		subtitle,
		title,
		id,
		isVisible,
		onClick,
		children,
		class: className = ''
	}: Props = $props();
</script>

<button
	type="button"
	class={['accordion-header', 'accordion-header--clickable', className]}
	aria-expanded={isVisible}
	aria-controls={id}
	onclick={onClick}
>
	<div class="accordion-header__text">
		{#if subtitle}
			<span class="accordion-header__subtitle text-caption">{subtitle}</span>
		{/if}
		<h3 class="accordion-header__title text-body-strong">{title}</h3>
		{#if children}
			<div class="accordion-header__metadata">
				{@render children()}
			</div>
		{/if}
	</div>
	<Icon name="chevron-down" class="accordion-header__chevron" rotate={isVisible ? 180 : 0} />
</button>