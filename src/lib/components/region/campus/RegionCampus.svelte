<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import type { RegionCampusItem } from '$lib/schemas/regionCampus.schema';

	interface Props {
		showDetailIcon?: boolean;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		regionCampusItems: RegionCampusItem[];
		onClickEditar: (item: RegionCampusItem) => void;
		onClickBorrar: (item: RegionCampusItem) => void;
		onClickRestaurar: (item: RegionCampusItem) => void;
		onClickDetalle?: (item: RegionCampusItem) => void;
	}

	const {
		showDetailIcon = true,
		showHeader = false,
		title = 'Add',
		subtitle = '',
		regionCampusItems,
		onClickEditar,
		onClickBorrar,
		onClickRestaurar,
		onClickDetalle
	}: Props = $props();
</script>

<main class="main-panel">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<section class="table-container">
		{#if regionCampusItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-label">Institucion</th>
						<th class="col-code">Código</th>
						<th class="col-label">Nombre</th>
						<th class="col-badge">Estatus</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each regionCampusItems as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.campus.code}</td>
							<td class="col-label">{item.campus.name}</td>
							<td class="col-badge">
								<Badge variant={item.isDeleted ? 'error' : 'success'}>
									{item.isDeleted ? 'borrado' : 'activo'}
								</Badge>
							</td>
							<td class="col-actions-md">
								<div class="col-actions-row">
									{#if showDetailIcon && onClickDetalle}
										<IconButton
											isDisabled={item.isDeleted}
											name="detail"
											tooltipLabel="Ver detalle"
											size="md"
											borderShape="square"
											variant="ghost"
											onClick={() => onClickDetalle(item)}
										/>
									{/if}
									<IconButton
										isDisabled={item.isDeleted}
										name="edit"
										tooltipLabel="Editar registro"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickEditar(item)}
									/>
									<IconButton
										isDisabled={item.isDeleted}
										name="remove"
										tooltipLabel="Desvincular registro"
										size="md"
										variant="ghost"
										onClick={() => onClickBorrar(item)}
									/>
									<IconButton
										isDisabled={!item.isDeleted}
										name="restore"
										tooltipLabel="Restaurar registro"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickRestaurar(item)}
									/>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message="No hay elementos de campus"></EmptySection>
		{/if}
	</section>
</main>
