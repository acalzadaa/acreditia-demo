<script lang="ts">
	import ListView from '$lib/components/shared/ListView.svelte';
	import type { IndicadorEstrategicoItem } from '$lib/schemas/indicadorEstrategico.schema';
	import IndicadorEstrategicoCard from './IndicadorEstrategicoCard.svelte';
	import IndicadorEstrategicoTable from './IndicadorEstrategicoTable.svelte';

	interface Props {
		items: IndicadorEstrategicoItem[];
		onClickEditar: (item: IndicadorEstrategicoItem) => void;
		onClickBorrar: (item: IndicadorEstrategicoItem) => void;
		onClickRestaurar: (item: IndicadorEstrategicoItem) => void;

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
		title = 'Listado de indicador estrategico',
		subtitle = ''
	}: Props = $props();
</script>

<ListView
	{items}
	{showHeader}
	{title}
	{subtitle}
	crearTitle="Nuevo indicador"
	{onClickCrear}
	{onClickExport}
	{onClickFilter}
	breakpoint={1500}
>
	{#snippet table()}
		<IndicadorEstrategicoTable {items} {onClickEditar} {onClickBorrar} {onClickRestaurar} />
	{/snippet}
	{#snippet cards()}
		<IndicadorEstrategicoCard {items} {onClickEditar} {onClickBorrar} {onClickRestaurar} />
	{/snippet}
</ListView>
