<script lang="ts">
	/**
	 * CollapsibleList (controlado)
	 *
	 * El padre define el header completo (chevron, título, subtítulo,
	 * iconos — lo que sea) via el snippet `header`, y también es dueño
	 * del estado abierto/cerrado: este componente NUNCA muta `open` por
	 * su cuenta, solo avisa con `onToggle` cuando se hace click/Enter/
	 * Espacio en el header. El snippet recibe open para controlar
	 * elementos del header
	 *
	 * El contenido muestra doble contenido: se renderizan
	 * `children` (desktop) y `mobileContent` (<=640px) y el CSS decide
	 * cuál mostrar.
	 *
	 */

	/* EJEMPLO DE USO DE COLLAPSIBLELIST
    <CollapsibleList
        open={onToggle.value}
        onToggle={onToggle.toggle}
        maxHeight="360px"
    >
    {#snippet header({ open })}
        <Icon name="chevron-right" size="sm" class="collapsible-list__chevron" rotate={open ? 90 : 0} />
        <div class="collapsible-list__titles">
        <span class="collapsible-list__title text-body-strong">Titulo</span>
        <span class="collapsible-list__subtitle text-body-small">Subtitulo</span>
        </div>
        <div class="collapsible-list__icons" onclick={(e) => e.stopPropagation()}>
        <IconButton name="play" onClick={() => {}} tooltipLabel="Exportar" />
        </div>
    {/snippet}

    {#snippet children()}
        <div class="table-container table-container--inline">
        <table class="data-table"><!-- aqui va la tabla --></table>
        </div>
    {/snippet}

    {#snippet mobileContent()}
        <div class="card-column">
        <div class="card"><!-- aqui va el card --></div>
        </div>
    {/snippet}
</CollapsibleList> 
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

<section class={['collapsible-list', className, { 'collapsible-list--open': open }]} {...restProps}>
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
