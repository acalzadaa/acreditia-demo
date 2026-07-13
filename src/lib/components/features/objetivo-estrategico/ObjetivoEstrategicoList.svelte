<script lang="ts">
	import ListView from '$lib/components/shared/ListView.svelte';
	import type { ObjetivoEstrategicoItem } from '$lib/schemas/objetivoEstrategico.schema';
	import ObjetivoEstrategicoCard from './ObjetivoEstrategicoCard.svelte';
	import ObjetivoEstrategicoTable from './ObjetivoEstrategicoTable.svelte';
	

	interface Props {
		items: ObjetivoEstrategicoItem[];
		onClickEditar: (item: ObjetivoEstrategicoItem) => void;
		onClickBorrar: (item: ObjetivoEstrategicoItem) => void;
		onClickRestaurar: (item: ObjetivoEstrategicoItem) => void;

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
		title = 'Listado de objetivo estrategico',
		subtitle = ''
	}: Props = $props();
</script>

<ListView
	{items}
	{showHeader}
	{title}
	{subtitle}
	crearTitle="Nuevo objetivo"
	{onClickCrear}
	{onClickExport}
	{onClickFilter}
	breakpoint={1500}
>
	{#snippet table()}
		<ObjetivoEstrategicoTable {items} {onClickEditar} {onClickBorrar} {onClickRestaurar} />
	{/snippet}
	{#snippet cards()}
		<ObjetivoEstrategicoCard {items} {onClickEditar} {onClickBorrar} {onClickRestaurar} />
	{/snippet}
</ListView>
