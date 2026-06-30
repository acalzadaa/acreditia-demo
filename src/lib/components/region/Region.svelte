<script lang="ts">
	import type { RegionWithRelationsItem } from '$lib/schemas/region.schema';

	import EmptySection from '../common/EmptySection.svelte';
	import PageHeader from '../common/PageHeader.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		gridArea?: string;
		regionItems: RegionWithRelationsItem[];
		showDetailIcon?: boolean;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		onClickEditar: (item: RegionWithRelationsItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: RegionWithRelationsItem) => void;
		onClickBorrar: (item: RegionWithRelationsItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: RegionWithRelationsItem) => void;
		onClickRestaurar: (item: RegionWithRelationsItem) => void;
		onKeydownRestaurar: (e: KeyboardEvent, item: RegionWithRelationsItem) => void;
		onClickDetalle?: (item: RegionWithRelationsItem) => void;
		onKeydownDetalle?: (e: KeyboardEvent, item: RegionWithRelationsItem) => void;
	}

	const {
		gridArea = 'main',
		regionItems,
		showDetailIcon = true,
		showHeader = false,
		title = '',
		subtitle = '',
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar,
		onClickRestaurar,
		onKeydownRestaurar,
		onClickDetalle,
		onKeydownDetalle
	}: Props = $props();
</script>

<main class="main-panel" style="grid-area: {gridArea}">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<section class="table-container">
		{#if regionItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Código</th>
						<th class="col-label">Nombre</th>
						<th class="col-text">Descripción</th>
						<th class="col-badge">Estatus</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each regionItems as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.code}</td>
							<td class="col-label">{item.name}</td>
							<td class="col-text">{item.description}</td>
							<td class="col-badge">
								<Badge variant={item.isDeleted ? 'error' : 'success'}>
									{item.isDeleted ? 'borrado' : 'activo'}
								</Badge>
							</td>
							<td class="col-actions-md">
								<div class="col-actions-row">
									{#if showDetailIcon && onClickDetalle && onKeydownDetalle}
										<IconButton
											isDisabled={item.isDeleted}
											name="detail"
											tooltipLabel="Ver detalle"
											size="md"
											borderShape="square"
											variant="ghost"
											onClick={() => onClickDetalle(item)}
											onKeydown={(e) => onKeydownDetalle(e, item)}
										/>
									{/if}

									<IconButton
										isDisabled={item.isDeleted}
										name="edit"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickEditar(item)}
										onKeydown={(e) => onKeydownEditar(e, item)}
									/>
									<IconButton
										isDisabled={item.isDeleted}
										name="delete"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickBorrar(item)}
										onKeydown={(e) => onKeydownBorrar(e, item)}
									/>
									<IconButton
										isDisabled={!item.isDeleted}
										name="restore"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickRestaurar(item)}
										onKeydown={(e) => onKeydownRestaurar(e, item)}
									/>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message="No hay elementos de region"></EmptySection>
		{/if}
	</section>
</main>
