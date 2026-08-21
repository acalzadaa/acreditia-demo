<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import { capitalizeText } from '$lib/components/common/utils/stringUtils';
	import Actions from '$lib/components/ui/Actions.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import { navigateTo } from '$lib/helpers/navigation';
	import type { AreaResponsableItem } from '$lib/schemas/areaResponsable.schema';

	interface Props {
		items: AreaResponsableItem[];
		onClickEditar: (item: AreaResponsableItem) => void;
		onClickBorrar: (item: AreaResponsableItem) => void;
		onClickRestaurar: (item: AreaResponsableItem) => void;

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
		title = 'Listado de áreas responsables',
		subtitle = ''
	}: Props = $props();
</script>

<main class="main-panel">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}

	<section class="list-view--table">
		<Toolbar
			actionTitle="Nueva área"
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
							<th class="col-code">Código</th>
							<th class="col-label">Nombre</th>
							<th class="col-label">Type</th>
							<th class="col-text">Descripción</th>
							<th class="col-label">Reporta a</th>
							<th class="col-metric">Total de puestos</th>
							<th class="col-badge">Estatus</th>
							<th class="col-actions-md">Acciones</th>
						</tr>
					</thead>
					<tbody class="text-body">
						{#each items as item (item.id)}
							<tr class="table-row tr-expandable">
								<td class="col-code">{item.code}</td>
								<td class="col-label">{item.name}</td>
								<td class="col-label">{capitalizeText(item.type)}</td>
								<td class="col-text">{item.description}</td>
								<td class="col-label">{item.parent?.name}</td>
								<td class="col-metric">{item.totalPuestos}</td>
								<td class="col-badge">
									<Badge variant={item.isDeleted ? 'error' : 'success'}>
										{item.isDeleted ? 'borrado' : 'activo'}
									</Badge>
								</td>
								<td class="col-actions-md">
									<Actions
										{item}
										onClickDetail={() => navigateTo(item.code)}
										isDetailDisabled={false}
										showDetail={true}
										onClickEdit={() => onClickEditar(item)}
										isEditDisabled={false}
										showEdit={true}
										onClickDelete={() => onClickBorrar(item)}
										isDeleteDisabled={false}
										showDelete={true}
										onClickRestore={() => onClickRestaurar(item)}
										isRestoreDisabled={true}
										showRestore={true}
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
			actionTitle="Nueva área"
			{onClickCrear}
			{onClickExport}
			{onClickFilter}
			showExport={false}
			showFilter={false}
		/>
		{#if items.length > 0}
			<CardColumn minWidth="360px" maxWidth="3500px">
				{#each items as item (item.id)}
					<Card>
						<CardHeader subtitle={item.code} title={item.name}>
							<Badge variant={item.isDeleted ? 'error' : 'success'}>
								{item.isDeleted ? 'borrado' : 'activo'}
							</Badge>
						</CardHeader>

						<CardContent>
							<CardContentItem label="Tipo de área" value={item.type} />
							<CardContentItem label="Descripción" value={item.description} />
							{#if item.parent?.name}
								<CardContentItem label="Depende de" value={item.parent?.name} />
							{/if}
							<CardContentItem label="Total de puestos">
								{item.totalPuestos}
							</CardContentItem>
						</CardContent>

						<CardFooter>
							<Actions
								{item}
								onClickDetail={() => navigateTo(item.code)}
								isDetailDisabled={false}
								showDetail={true}
								onClickEdit={() => onClickEditar(item)}
								isEditDisabled={false}
								showEdit={true}
								onClickDelete={() => onClickBorrar(item)}
								isDeleteDisabled={false}
								showDelete={true}
								onClickRestore={() => onClickRestaurar(item)}
								isRestoreDisabled={true}
								showRestore={true}
							/>
						</CardFooter>
					</Card>
				{/each}
			</CardColumn>
		{:else}
			<EmptySection />
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
	@media (max-width: 3500px) {
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
