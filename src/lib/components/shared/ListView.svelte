<!--
	Componente estructural y genérico. No conoce el shape de cada item más allá
	de requerir un `id` (para el keying interno si en algún momento lo necesitara).
	Todo el contenido visual (tabla o cards) lo definen los consumidores vía
	los snippets `table` y `cards`.
-->
<script lang="ts" generics="T extends { id: string | number }">
	import type { Snippet } from 'svelte';
	import PageHeader from '../common/PageHeader.svelte';
	import ToolbarV2 from '../common/ToolbarV2.svelte';
	import EmptySection from '../common/EmptySection.svelte';

	interface Props {
		items: T[];

		showHeader?: boolean;
		title?: string;
		subtitle?: string;

		crearTitle: string;
		onClickCrear: () => void;
		onClickExport: () => void;
		onClickFilter: () => void;
		showExport?: boolean;
		showFilter?: boolean;

		/**
		 * Ancho mínimo (px) del contenedor para el que la tabla todavía
		 * es legible. Por debajo de este ancho se muestran cards.
		 * Cada feature define el suyo según cuántas columnas tenga su tabla.
		 */
		breakpoint?: number;

		emptyMessage?: string;

		/** Snippet que renderiza la tabla completa (thead + tbody) para `items`. */
		table: Snippet;
		/** Snippet que renderiza la vista de cards completa para `items`. */
		cards: Snippet;
	}

	const {
		items,

		showHeader = true,
		title = '',
		subtitle = '',

		crearTitle,
		onClickCrear,
		onClickExport,
		onClickFilter,
		showExport = false,
		showFilter = false,

		breakpoint = 900,

		emptyMessage,

		table,
		cards
	}: Props = $props();

	// Medición reactiva del contenedor — reemplaza los @media / @container
	// bind:clientWidth usa ResizeObserver internamente.
	let containerWidth = $state(0);
	const showTable = $derived(containerWidth >= breakpoint);
</script>

<main class="main-panel" bind:clientWidth={containerWidth}>
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}

	<section class="list-view">
		<ToolbarV2
			mobileVersion={!showTable}
			{crearTitle}
			{onClickCrear}
			{onClickExport}
			{onClickFilter}
			{showExport}
			{showFilter}
		/>

		{#if items.length === 0}
			<EmptySection message={emptyMessage} />
		{:else if showTable}
			{@render table()}
		{:else}
			{@render cards()}
		{/if}
	</section>
</main>
