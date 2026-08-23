<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import type { CampusItem } from '$lib/schemas/campus.schema';
	import { navigateTo } from '$lib/helpers/navigation';
	import ListDetailActions from '$lib/components/ui/actions/ListDetailActions.svelte';

	interface Props {
		items: CampusItem[];
		onClickEditar: (item: CampusItem) => void;
		onClickBorrar: (item: CampusItem) => void;
		onClickRestaurar: (item: CampusItem) => void;

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
		title = 'Listado de campus',
		subtitle = ''
	}: Props = $props();
</script>

<main class="main-panel">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}

	<section class="list-view--table">
		<Toolbar
			actionTitle="Nuevo campus"
			{onClickCrear}
			{onClickExport}
			{onClickFilter}
			showExport={false}
			showFilter={false}
		/>
		{#if items.length > 0}
			<div class="table-container">
				<table class="data-table text-body">
					<thead class="text-body-strong">
						<tr>
							<th class="col-code">Institución</th>
							<th class="col-label">Código</th>
							<th class="col-label">Nombre</th>
							<th class="col-metrics">Total áreas responsables</th>
							<th class="col-metrics">Total unidades académicas</th>
							<th class="col-badge">Estatus</th>
							<th class="col-actions-md">Acciones</th>
						</tr>
					</thead>

					<tbody class="text-body">
						{#each items as item (item.id)}
							<tr class="table-row tr-expandable">
								<td class="col-code">
									{item.institucion?.code}
								</td>
								<td class="col-label">{item.code}</td>
								<td class="col-label">{item.name}</td>
								<td class="col-metrics">{item.totalAreaResponsable}</td>
								<td class="col-metrics">{item.totalUnidadAcademica}</td>
								<td class="col-badge">
									<Badge variant={item.isDeleted ? 'error' : 'success'}>
										{item.isDeleted ? 'borrado' : 'activo'}
									</Badge>
								</td>
								<td class="col-actions-md">
									<ListDetailActions
										{item}
										onClickDetail={() => navigateTo(item.code)}
										isDetailDisabled={item.isDeleted}
										onClickEdit={() => onClickEditar(item)}
										isEditDisabled={item.isDeleted}
										onClickDelete={() => onClickBorrar(item)}
										isDeleteDisabled={item.isDeleted}
										onClickRestore={() => onClickRestaurar(item)}
										isRestoreDisabled={!item.isDeleted}
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
		<Toolbar
			mobileVersion={true}
			actionTitle="Nuevo campus"
			{onClickCrear}
			{onClickExport}
			{onClickFilter}
			showExport={false}
			showFilter={false}
		/>
		{#if items.length > 0}
			<CardColumn minWidth="360px" maxWidth="1599px">
				{#each items as item (item.id)}
					<Card>
						<CardHeader subtitle={item.code} title={item.name}>
							<Badge variant={item.isDeleted ? 'error' : 'success'}>
								{item.isDeleted ? 'borrado' : 'activo'}
							</Badge>
						</CardHeader>

						<CardContent>
							<CardContentItem label="Institución" value={item.institucion?.code} />
							<CardContentItem label="Total de áreas responsables">
								{item.totalAreaResponsable}
							</CardContentItem>
							<CardContentItem label="Total de unidades académicas">
								{item.totalUnidadAcademica}
							</CardContentItem>
						</CardContent>

						<CardFooter>
							<ListDetailActions
								{item}
								onClickDetail={() => navigateTo(item.code)}
								isDetailDisabled={item.isDeleted}
								onClickEdit={() => onClickEditar(item)}
								isEditDisabled={item.isDeleted}
								onClickDelete={() => onClickBorrar(item)}
								isDeleteDisabled={item.isDeleted}
								onClickRestore={() => onClickRestaurar(item)}
								isRestoreDisabled={!item.isDeleted}
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
			display: flex;
			flex-direction: column;
			flex: 1;
			min-height: 0;
		}
	}
</style>
