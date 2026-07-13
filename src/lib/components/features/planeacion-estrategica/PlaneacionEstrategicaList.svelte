<script lang="ts">

	import ListView from '$lib/components/shared/ListView.svelte';
	import type { PlaneacionEstrategicaItem } from '$lib/schemas/planeacionEstrategica.schema';
	import PlaneacionEstrategicaCard from './PlaneacionEstrategicaCard.svelte';
	import PlaneacionEstrategicaTable from './PlaneacionEstrategicaTable.svelte';

	interface Props {
		items: PlaneacionEstrategicaItem[];
		onClickEditar: (item: PlaneacionEstrategicaItem) => void;
		onClickBorrar: (item: PlaneacionEstrategicaItem) => void;
		onClickRestaurar: (item: PlaneacionEstrategicaItem) => void;

		onClickCrear: () => void;
		onClickExport: () => void;
		onClickFilter: () => void;

		showHeader?: boolean;
		title?: string;
		subtitle?: string;
	}

	const {
		items, onClickEditar, onClickBorrar, onClickRestaurar,
		onClickCrear, onClickExport, onClickFilter,
		showHeader = true,
		title = 'Listado de planeacion estrategica',
		subtitle = ''
	}: Props = $props();
</script>

<ListView
	{items}
	{showHeader}
	{title}
	{subtitle}
	crearTitle="Nueva planeacion"
	{onClickCrear}
	{onClickExport}
	{onClickFilter}
	breakpoint={1500}
>
	{#snippet table()}
		<PlaneacionEstrategicaTable {items} {onClickEditar} {onClickBorrar} {onClickRestaurar} />
	{/snippet}
	{#snippet cards()}
		<PlaneacionEstrategicaCard {items} {onClickEditar} {onClickBorrar} {onClickRestaurar} />
	{/snippet}
</ListView>