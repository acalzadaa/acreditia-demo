<script lang="ts">
	import type { FilosofiaInstitucionalItem } from '$lib/schemas/filosofiaInstitucional.schema';
	import FilosofiaInstitucionalTable from './FilosofiaInstitucionalTable.svelte';
	import FilosofiaInstitucionalCard from './FilosofiaInstitucionalCard.svelte';
	import ListView from '$lib/components/shared/ListView.svelte';

	interface Props {
		items: FilosofiaInstitucionalItem[];
		onClickEditar: (item: FilosofiaInstitucionalItem) => void;
		onClickBorrar: (item: FilosofiaInstitucionalItem) => void;
		onClickRestaurar: (item: FilosofiaInstitucionalItem) => void;

		onClickCrear: () => void;
		onClickExport: () => void;
		onClickFilter: () => void;

		showHeader?: boolean;
		title?: string;
		subtitle?: string;
	}

	const {
		items,
		onClickEditar,
		onClickBorrar,
		onClickRestaurar,
		onClickCrear,
		onClickExport,
		onClickFilter,
		showHeader = true,
		title = 'Listado de filosofias institucionales',
		subtitle = ''
	}: Props = $props();
</script>

<ListView
	{items}
	{showHeader}
	{title}
	{subtitle}
	crearTitle="Nueva filosofia"
	{onClickCrear}
	{onClickExport}
	{onClickFilter}
	breakpoint={1500}
>
	{#snippet table()}
		<FilosofiaInstitucionalTable {items} {onClickEditar} {onClickBorrar} {onClickRestaurar} />
	{/snippet}
	{#snippet cards()}
		<FilosofiaInstitucionalCard {items} {onClickEditar} {onClickBorrar} {onClickRestaurar} />
	{/snippet}
</ListView>
