<script lang="ts">
	/**
	 * CollapsibleList (controlado)
	 *
	 * El padre define el header completo (chevron, título, subtítulo,
	 * iconos — lo que sea) via el snippet `header`, y también es dueño
	 * del estado abierto/cerrado: este componente NUNCA muta `open` por
	 * su cuenta, solo avisa con `onToggle` cuando se hace click/Enter/
	 * Espacio en el header.
	 *
	 * `header` recibe `{ open }` como parámetro del snippet para que
	 * puedas rotar tu propio chevron, cambiar el aria-label, etc.
	 *
	 * El contenido sigue el mismo patrón que antes: se renderizan
	 * `children` (desktop) y `mobileContent` (<=640px) y el CSS decide
	 * cuál mostrar.
	 */
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		open: boolean;
		onToggle: (nextOpen: boolean) => void;

		header: Snippet<[{ open: boolean }]>;
		children: Snippet;
		mobileContent?: Snippet;

		/** Alto máximo del contenido antes de mostrar scroll interno. */
		maxHeight?: string;

		class?: string;
		id?: string;
		[key: string]: unknown;
	}

	let {
		open,
		onToggle,
		header,
		children,
		mobileContent,
		maxHeight = '480px',
		class: className = '',
		id,
		...restProps
	}: Props = $props();

	const uid = $props.id();
	const contentId = $derived(id ?? `collapsible-${uid}`);

	function toggle() {
		onToggle(!open);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggle();
		}
	}
</script>

<section
	class={['collapsible-list', className, { 'collapsible-list--open': open }]}
	{...restProps}
>
	<div
		class="collapsible-list__header"
		role="button"
		tabindex="0"
		aria-expanded={open}
		aria-controls={contentId}
		onclick={toggle}
		onkeydown={handleKeydown}
	>
		{@render header({ open })}
	</div>

	{#if open}
		<div
			class="collapsible-list__content"
			id={contentId}
			style:max-height={maxHeight}
			transition:slide={{ duration: 200 }}
		>
			<div class="collapsible-list__content-desktop">
				{@render children()}
			</div>
			<div class="collapsible-list__content-mobile">
				{@render (mobileContent ?? children)()}
			</div>
		</div>
	{/if}
</section>