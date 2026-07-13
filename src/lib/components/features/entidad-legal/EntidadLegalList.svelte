<script lang="ts">
	import ListView from '$lib/components/shared/ListView.svelte';
	import { type EntidadLegalItem } from '$lib/schemas/entidadLegal.schema';
	import EntidadLegalCard from './EntidadLegalCard.svelte';
	import EntidadLegalTable from './EntidadLegalTable.svelte';

	interface Props {
		items: EntidadLegalItem[];
		onClickEditar: (item: EntidadLegalItem) => void;
		onClickBorrar: (item: EntidadLegalItem) => void;
		onClickRestaurar: (item: EntidadLegalItem) => void;

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
		title = 'Listado de entidades legales',
		subtitle = ''
	}: Props = $props();
</script>

<ListView
	{items}
	{showHeader}
	{title}
	{subtitle}
	crearTitle="Nueva entidad"
	{onClickCrear}
	{onClickExport}
	{onClickFilter}
	breakpoint={1500}
>
	{#snippet table()}
		<EntidadLegalTable {items} {onClickEditar} {onClickBorrar} {onClickRestaurar} />
	{/snippet}
	{#snippet cards()}
		<EntidadLegalCard {items} {onClickEditar} {onClickBorrar} {onClickRestaurar} />
	{/snippet}
</ListView>
