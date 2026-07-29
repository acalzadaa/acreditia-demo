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
	import ListActions from '$lib/components/actions/ListActions.svelte';
	import type { SeccionItem } from '$lib/schemas/seccion.schema';

	interface Props {
		items: SeccionItem[];
		onClickEditar: (item: SeccionItem) => void;
		onClickBorrar: (item: SeccionItem) => void;
		onClickRestaurar: (item: SeccionItem) => void;

		onClickCrear: () => void;
		onClickExport?: () => void;
		onClickFilter?: () => void;

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
		title = 'Listado de secciones',
		subtitle = ''
	}: Props = $props();
</script>

<main class="main-panel">
	<section class="list-view--table">
		{#if showHeader}
			<PageHeader {title} {subtitle} />
		{/if}
		<ToolbarV2
			actionTitle="Nueva seccion"
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
							<th class="col-code">Capitulo</th>
							<th class="col-code">Código</th>
							<th class="col-label">Nombre</th>
							<th class="col-text">Contenido</th>
							<th class="col-text">Description</th>
							<th class="col-badge">Estatus</th>
							<th class="col-actions-md">Acciones</th>
						</tr>
					</thead>

					<tbody class="text-body">
						{#each items as item (item.id)}
							<tr class="table-row tr-expandable">
								<td class="col-code">{item.capitulo?.code}</td>
								<td class="col-code">{item.code}</td>
								<td class="col-label">{item.name}</td>
								<td class="col-text">{item.content}</td>
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
			<EmptySection />
		{/if}
	</section>

	<section class="list-view--cards">
		{#if showHeader}
			<PageHeader {title} {subtitle} />
		{/if}
		<ToolbarV2
			mobileVersion={true}
			actionTitle="Nueva seccion"
			{onClickCrear}
			{onClickExport}
			{onClickFilter}
			showExport={false}
			showFilter={false}
		/>
		{#if items.length > 0}
			<CardColumn minWidth="360px" maxWidth="2499px">
				{#each items as item (item.id)}
					<Card>
						<CardHeader subtitle={item.code} title={item.name}>
							<Badge variant={item.isDeleted ? 'error' : 'success'}>
								{item.isDeleted ? 'borrado' : 'activo'}
							</Badge>
						</CardHeader>

						<CardContent>
							<CardContentItem label="Capitulo" value={item.capitulo.code} />
							<CardContentItem label="Contenido" value={item.content} />
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
