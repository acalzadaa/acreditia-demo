<script lang="ts">
	import ListView from '$lib/components/shared/ListView.svelte';
	import type { InstitucionItem } from '$lib/schemas/institucion.schema';
	import InstitucionCard from './InstitucionCard.svelte';
	import InstitucionTable from './InstitucionTable.svelte';

	interface Props {
		items: InstitucionItem[];
		onClickEditar: (item: InstitucionItem) => void;
		onClickBorrar: (item: InstitucionItem) => void;
		onClickRestaurar: (item: InstitucionItem) => void;

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
		title = 'Listado de instituciones',
		subtitle = ''
	}: Props = $props();
</script>

<ListView
	{items}
	{showHeader}
	{title}
	{subtitle}
	crearTitle="Nueva institucion"
	{onClickCrear}
	{onClickExport}
	{onClickFilter}
	breakpoint={1500}
>
	{#snippet table()}
		<InstitucionTable {items} {onClickEditar} {onClickBorrar} {onClickRestaurar} />
	{/snippet}
	{#snippet cards()}
		<InstitucionCard {items} {onClickEditar} {onClickBorrar} {onClickRestaurar} />
	{/snippet}
</ListView>
