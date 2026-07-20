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
	import Actions from '../ui/Actions.svelte';
	import type { IndicadorItem } from '$lib/schemas/indicador.schema';
	import { navigateTo } from '$lib/helpers/navigation';
	import ListDetailActions from '../actions/ListDetailActions.svelte';

	interface Props {
		items: IndicadorItem[];
		onClickEditar: (item: IndicadorItem) => void;
		onClickBorrar: (item: IndicadorItem) => void;
		onClickRestaurar: (item: IndicadorItem) => void;

		onClickCrear: () => void;
		onClickExport: () => void;
		onClickFilter: () => void;

		showHeader?: boolean;
		showFilter?: boolean;
		showExport?: boolean;
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
		showExport = false,
		showFilter = false,
		title = 'Detalle de indicador',
		subtitle = ''
	}: Props = $props();

	function buildTarget(item: IndicadorItem): string {
		return item.target + ' ' + item.targetUnit;
	}
</script>

<main class="main-panel">
	<section class="list-view--table">
		{#if showHeader}
			<PageHeader {title} {subtitle} />
		{/if}
		<ToolbarV2
			crearTitle="Nuevo indicador"
			{onClickCrear}
			{onClickFilter}
			{onClickExport}
			{showExport}
			{showFilter}
		/>
		{#if items.length > 0}
			<div class="table-container">
				<table class="data-table text-body">
					<thead class="text-body-strong">
						<tr>
							<th class="col-code">Seccion</th>
							<th class="col-code">Código</th>
							<th class="col-label">Nombre</th>
							<th class="col-label">Tipo</th>
							<th class="col-text">Descripción</th>
							<th class="col-metric">Meta</th>
							<th class="col-badge">Estatus</th>
							<th class="col-actions-md">Acciones</th>
						</tr>
					</thead>

					<tbody class="text-body">
						{#each items as item (item.id)}
							<tr class="table-row tr-expandable">
								<td class="col-code">{item.section.code}</td>
								<td class="col-code">{item.code}</td>
								<td class="col-label">{item.name}</td>
								<td class="col-label">{item.indicadorType}</td>
								<td class="col-text">{item.description}</td>
								<td class="col-metric">{buildTarget(item)}</td>
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
		{#if showHeader}
			<PageHeader {title} {subtitle} />
		{/if}
		<ToolbarV2
			mobileVersion={true}
			crearTitle="Nuevo indicador"
			{onClickCrear}
			{onClickExport}
			{onClickFilter}
			showExport={false}
			showFilter={false}
		/>
		{#if items.length > 0}
			<CardColumn minWidth="360px" maxWidth="2500px">
				{#each items as item (item.id)}
					<Card>
						<CardHeader subtitle={item.code} title={item.name}>
							<Badge variant={item.isDeleted ? 'error' : 'success'}>
								{item.isDeleted ? 'borrado' : 'activo'}
							</Badge>
						</CardHeader>

						<CardContent>
							<CardContentItem label="Descripción" value={item.description} />
							<CardContentItem label="Tipo" value={item.indicadorType} />
							<CardContentItem label="Meta" value={buildTarget(item)} />
						</CardContent>

						<CardFooter>
							<Actions
								{item}
								showDetail={true}
								onClickDetail={() => navigateTo(item.code)}
								isDetailDisabled={item.isDeleted}
								showEdit={true}
								onClickEdit={() => onClickEditar(item)}
								isEditDisabled={item.isDeleted}
								showDelete={true}
								onClickDelete={() => onClickBorrar(item)}
								isDeleteDisabled={item.isDeleted}
								showRestore={true}
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
	.list-view--table {
		display: contents;
	}

	.list-view--cards {
		display: none;
	}

	/* Ajustar el max-width dependiendo el contenido! */
	@media (max-width: 2500px) {
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
