<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import ToolbarV2 from '$lib/components/common/ToolbarV2.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import SublistActions from '$lib/components/actions/SublistActions.svelte';
	import type { IndicadorIndicadorEstrategicoItem } from '$lib/schemas/indicadorIndicadorEstrategico';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';

	interface Props {
		items: IndicadorIndicadorEstrategicoItem[];
		onClickRemover: (item: IndicadorIndicadorEstrategicoItem) => void;
		onClickCrear: () => void;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
	}

	const {
		items,
		onClickRemover,
		onClickCrear,
		showHeader = true,
		title = 'Detalle de indicador estrategico',
		subtitle = ''
	}: Props = $props();
</script>

<section class="list-view--table">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<ToolbarV2 actionTitle="Agregar indicador estrategico" {onClickCrear} />
	{#if items.length > 0}
		<div class="table-container">
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Codigo</th>
						<th class="col-code">Indicador Estrategico</th>
						<th class="col-label">Descripcion</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>

				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.indicador.code}</td>
							<td class="col-code">
								<Badge variant="info">{item.indicadorEstrategico.code}</Badge>
							</td>
							<td class="col-label">
								{item.indicadorEstrategico.name}
							</td>
							<td class="col-actions-md">
								<SublistActions
									{item}
									onClickRemove={() => onClickRemover(item)}
									isRemoveDisabled={item.isDeleted}
									showRemove={true}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<EmptySection />
	{/if}
</section>

<section class="list-view--cards">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<ToolbarV2
		mobileVersion={true}
		actionTitle="Agregar indicador estrategico"
		{onClickCrear}
		showExport={false}
		showFilter={false}
	/>
	{#if items.length > 0}
		<CardColumn minWidth="360px" maxWidth="900px">
			{#each items as item (item.id)}
				<Card>
					<CardHeader subtitle={item.indicador.code} title={item.indicadorEstrategico.name}>
						<Badge variant={item.isDeleted ? 'error' : 'success'}>
							{item.isDeleted ? 'borrado' : 'activo'}
						</Badge>
					</CardHeader>
					<CardContent>
						<CardContentItem label="Codigo" value={item.indicadorEstrategico.code} />
					</CardContent>
					<CardFooter>
						<SublistActions
							{item}
							onClickRemove={() => onClickRemover(item)}
							showRemove={true}
							isRemoveDisabled={item.isDeleted}
						/>
					</CardFooter>
				</Card>
			{/each}
		</CardColumn>
	{:else}
		<EmptySection message="No hay elementos"></EmptySection>
	{/if}
</section>

<style>
	.list-view--table {
		display: contents;
	}

	.list-view--cards {
		display: none;
	}

	/* Ajustar el max-width dependiendo el contenido! */
	@media (max-width: 900px) {
		.list-view--table {
			display: none;
		}

		.list-view--cards {
			display: flex;
			flex-direction: column;
			flex: 1;
			min-height: 0;
		}
	}
</style>
