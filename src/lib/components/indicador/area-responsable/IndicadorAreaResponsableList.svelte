<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import ToolbarV2 from '$lib/components/common/ToolbarV2.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import { navigateTo } from '$lib/helpers/navigation';
	import type { IndicadorAreaResponsableItem } from '$lib/schemas/indicadorAreaResponsable';
	import Actions from '$lib/components/ui/Actions.svelte';

	interface Props {
		items: IndicadorAreaResponsableItem[];
		onClickRemover: (item: IndicadorAreaResponsableItem) => void;
		onClickAdd: () => void;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
	}

	const {
		items,
		onClickRemover,
		onClickAdd,
		showHeader = true,
		title = 'Listado de areas responsables',
		subtitle = ''
	}: Props = $props();
</script>

<main class="main-panel--inner">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}

	<section class="list-view--table">
		<ToolbarV2
			actionTitle="Agregar area responsable"
			onClickCrear={onClickAdd}
			showExport={false}
			showFilter={false}
		/>
		{#if items.length > 0}
			<div class="table-container">
				<table class="data-table text-body">
					<thead class="text-body-strong">
						<tr>
							<th class="col-code">Codigo</th>
							<th class="col-code">Area responsable</th>
							<th class="col-label">Descripcion</th>
							<th class="col-actions-sm">Acciones</th>
						</tr>
					</thead>

					<tbody class="text-body">
						{#each items as item (item.id)}
							<tr class="table-row tr-expandable">
								<td class="col-code">{item.code}</td>
								<td class="col-code">{item.areaResponsable.code}</td>
								<td class="col-label">
									{item.areaResponsable.name}
								</td>
								<td class="col-actions-sm">
									<Actions
										{item}
										showDetail={true}
										isDetailDisabled={false}
										onClickDetail={() => navigateTo(item.code)}
										showRemove={true}
										isRemoveDisabled={false}
										onClickRemove={() => onClickRemover(item)}
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
		<ToolbarV2
			mobileVersion={true}
			actionTitle="Agregar area responsable"
			onClickCrear={onClickAdd}
			showExport={false}
			showFilter={false}
		/>
		{#if items.length > 0}
			<CardColumn minWidth="360px" maxWidth="1599px">
				{#each items as item (item.id)}
					<Card>
						<CardHeader subtitle={item.areaResponsable.code} title={item.areaResponsable.name}>
							<Badge variant={item.isDeleted ? 'error' : 'success'}>
								{item.isDeleted ? 'borrado' : 'activo'}
							</Badge>
						</CardHeader>

						<CardContent>
							<CardContentItem label="Codigo" value={item.code} />
						</CardContent>

						<CardFooter>
							<Actions
								{item}
								showDetail={true}
								isDetailDisabled={false}
								onClickDetail={() => navigateTo(item.code)}
								showRemove={true}
								isRemoveDisabled={false}
								onClickRemove={() => onClickRemover(item)}
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
	/* Por default (>= 1500px) gana la tabla; las cards quedan ocultas
	   y fuera del flujo para no pelear por el flex del panel. */
	.list-view--table {
		display: contents;
	}

	.list-view--cards {
		display: none;
	}

	/* Ajustar el max-width dependiendo el contenido! */
	@media (max-width: 1600px) {
		.list-view--table {
			display: none;
		}

		.list-view--cards {
			display: grid;
			flex: 1;
			min-height: 0;
		}
	}
</style>
