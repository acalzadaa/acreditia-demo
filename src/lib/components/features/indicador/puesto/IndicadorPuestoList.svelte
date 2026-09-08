<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import SublistActions from '$lib/components/ui/actions/SublistActions.svelte';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import type { IndicadorPuestoItem } from '$lib/schemas/indicadorPuesto.schema';

	interface Props {
		items: IndicadorPuestoItem[];
		onClickRemover: (item: IndicadorPuestoItem) => void;
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
		title = 'Detalle de puestos a informar',
		subtitle = ''
	}: Props = $props();
</script>

<main class="main-panel--inline">
	<section class="list-view--table">
		{#if showHeader}
			<PageHeader {title} {subtitle} />
		{/if}
		<Toolbar actionTitle="Agregar puesto a informar" {onClickCrear} />
		{#if items.length > 0}
			<div class="table-container">
				<table class="data-table text-body">
					<thead class="text-body-strong">
						<tr>
							<th class="col-code">Puesto</th>
							<th class="col-label">Descripción</th>
							<th class="col-actions-md">Acciones</th>
						</tr>
					</thead>

					<tbody class="text-body">
						{#each items as item (item.id)}
							<tr class="table-row tr-expandable">
								<td class="col-code">
									{item.puesto?.code}
								</td>
								<td class="col-label">
									{item.puesto?.name}
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
		<Toolbar
			mobileVersion={true}
			actionTitle="Agregar puesto a informar"
			{onClickCrear}
			showExport={false}
			showFilter={false}
		/>
		{#if items.length > 0}
			<CardColumn minWidth="360px" maxWidth="900px">
				{#each items as item (item.id)}
					<Card>
						<CardHeader subtitle={item.indicador.code} title={item.indicador.name}>
							<Badge variant={item.isDeleted ? 'error' : 'success'}>
								{item.isDeleted ? 'borrado' : 'activo'}
							</Badge>
						</CardHeader>
						<CardContent>
							<CardContentItem label="Puesto" value={item.puesto?.code} />
							<CardContentItem label="Descripción" value={item.puesto?.name} />
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
</main>

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
