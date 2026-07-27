<!--
@component
# AccordionHeaderButton
Variante de header: un `Button` de acción a la izquierda (icono+texto,
pasado como `children`, ej. "editar", "ver detalle") y un `IconButton`
chevron a la derecha que controla expand/collapse.

A diferencia de AccordionHeaderClickable, aquí el Button de la
izquierda NO hace toggle — es una acción independiente. Solo el
chevron lee/escribe `isVisible`, igual que AccordionHeaderClickable,
así que ambos pueden compartir el mismo `toggle` de
`createToggle()` y el mismo `id` con su AccordionContent asociado.

Ej.:
```svelte
<script>
	import { createToggle } from '$lib/utils/toggle.svelte';
	const sectionToggle = createToggle();
</script>

<AccordionHeaderButton
	id="acc-1"
	isVisible={sectionToggle.value}
	onToggle={sectionToggle.toggle}
>
	<Button variant="ghost" size="sm" name="edit" onClick={handleEdit}>
		Editar
	</Button>
</AccordionHeaderButton>
<AccordionContent isCollapsible id="acc-1" isVisible={sectionToggle.value}>
	...
</AccordionContent>
```
-->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import IconButton from '../IconButton.svelte';

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

		/** El Button de acción a la izquierda del header. */
		children: Snippet;
		class?: string;
	}

	const {
		id,
		isVisible,
		onToggle,
		toggleAriaLabel = 'Expandir/colapsar',
		title,
		subtitle,
		children,
		class: className = ''
	}: Props = $props();
</script>

<div class={['accordion-header', className]}>
	<div class="accordion-header__left">
		<div class="accordion-header__text">
			{#if subtitle}
				<div class="accordion-header__subtitle text-h6">
					{@render subtitle()}
				</div>
			{/if}
			{#if title}
				<div class="accordion-header__title text-h6">
					{@render title()}
				</div>
			{/if}
		</div>
		<div class="accordion-header__action">
			{@render children()}
		</div>
	</div>
	<IconButton
		name="chevron-down"
		variant="ghost"
		size="sm"
		ariaLabel={toggleAriaLabel}
		ariaExpanded={isVisible}
		ariaControls={id}
		iconRotate={isVisible ? 180 : 0}
		onClick={onToggle}
		class="accordion-header__chevron"
	/>
</div>
