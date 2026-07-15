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
	import type { RegionCampusItem } from '$lib/schemas/regionCampus.schema';

	interface Props {
		items: RegionCampusItem[];
		onClickRemover: (item: RegionCampusItem) => void;
		onClickAgregar: () => void;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
	}

	const {
		items,
		onClickRemover,
		onClickAgregar,

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
		<ToolbarV2 crearTitle="Agregar campus" onClickCrear={onClickAgregar} />
		{#if items.length > 0}
			<div class="table-container">
				<table class="data-table text-body">
					<thead class="text-body-strong">
						<tr>
							<th class="col-code">Codigo</th>
							<th class="col-label">Nombre</th>
							<th class="col-actions-sm">Acciones</th>
						</tr>
					</thead>
					<tbody class="text-body">
						{#each items as item (item.id)}
							<tr class="table-row tr-expandable">
								<td class="col-code">{item.campus.code}</td>
								<td class="col-label">{item.campus.name}</td>

								<td class="col-actions-sm">
									<SublistActions
										{item}
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
			crearTitle="Agregar campus"
			onClickCrear={onClickAgregar}
			showExport={false}
			showFilter={false}
		/>
		{#if items.length > 0}
			<CardColumn minWidth="360px" maxWidth="1500px">
				{#each items as item (item.id)}
					<Card>
						<CardHeader code={item.campus.code} name={item.campus.name}>
							<Badge variant={item.isDeleted ? 'error' : 'success'}>
								{item.isDeleted ? 'borrado' : 'activo'}
							</Badge>
						</CardHeader>
					
						<CardFooter>
							<SublistActions
								{item}
								showRemove={true}
								isRemoveDisabled={false}
								onClickRemove={() => onClickRemover(item)}
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
	@media (max-width: 1500px) {
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
