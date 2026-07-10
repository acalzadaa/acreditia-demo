<script lang="ts">
	import type { PlaneacionEstrategicaItem } from '$lib/schemas/planeacionEstrategica.schema';
	import ListActions from '../actions/ListActions.svelte';
	import EmptySection from '../common/EmptySection.svelte';
	import PageHeader from '../common/PageHeader.svelte';
	import ToolbarV2 from '../common/ToolbarV2.svelte';
	import Badge from '../ui/Badge.svelte';
	import Card from '../ui/card/Card.svelte';
	import CardColumn from '../ui/card/CardColumn.svelte';
	import CardContent from '../ui/card/CardContent.svelte';
	import CardContentItem from '../ui/card/CardContentItem.svelte';
	import CardFooter from '../ui/card/CardFooter.svelte';
	import CardHeader from '../ui/card/CardHeader.svelte';

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
		items,
		onClickEditar,
		onClickBorrar,
		onClickRestaurar,
		onClickCrear,
		onClickExport,
		onClickFilter,

		showHeader = true,
		title = 'Listado de planeaciones estrategicas',
		subtitle = ''
	}: Props = $props();
</script>

<main class="main-panel">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}

	<section class="list-view--table">
		<ToolbarV2
			crearTitle="Nueva planeacion"
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
							<th class="col-code">Filosofia</th>
							<th class="col-code">Código</th>
							<th class="col-label">Nombre</th>
							<th class="col-text">Descripción</th>
							<th class="col-badge">Estatus</th>
							<th class="col-actions-md">Acciones</th>
						</tr>
					</thead>
					<tbody class="text-body">
						{#each items as item (item.id)}
							<tr class="table-row tr-expandable">
								<td class="col-code">
									{item.filosofia?.code}
								</td>
								<td class="col-code">{item.code}</td>
								<td class="col-label">{item.name}</td>
								<td class="col-text">{item.description}</td>
								<td class="col-badge">
									<Badge variant={item.isDeleted ? 'error' : 'success'}>
										{item.isDeleted ? 'borrado' : 'activo'}
									</Badge>
								</td>
								<td class="col-actions-md">
									<ListActions
										{item}
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
			<EmptySection message="No hay elementos"></EmptySection>
		{/if}
	</section>

	<!-- Vista cards — viewports < 1500px -->
	<section class="list-view--cards">
		<ToolbarV2
			mobileVersion={true}
			crearTitle="Nueva planeacion"
			{onClickCrear}
			{onClickExport}
			{onClickFilter}
			showExport={false}
			showFilter={false}
		/>
		{#if items.length > 0}
			<CardColumn minWidth="360px" maxWidth="1685px">
				{#each items as item (item.id)}
					<Card>
						<CardHeader code={item.code} name={item.name}>
							<Badge variant={item.isDeleted ? 'error' : 'success'}>
								{item.isDeleted ? 'borrado' : 'activo'}
							</Badge>
						</CardHeader>

						<CardContent>
							<CardContentItem label="Filosofia" value={item.filosofia?.code} />
							<CardContentItem label="Descripción" value={item.description} />
						</CardContent>

						<CardFooter>
							<ListActions
								{item}
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
	@media (max-width: 1686px) {
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
