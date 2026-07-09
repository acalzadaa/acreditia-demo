<script lang="ts">
	import type { AreaResponsableItem } from '$lib/schemas/areaResponsable.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import PageHeader from '../common/PageHeader.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		gridArea?: string;
		areaResponsableItems: AreaResponsableItem[];
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		onClickEditar: (item: AreaResponsableItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: AreaResponsableItem) => void;
		onClickBorrar: (item: AreaResponsableItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: AreaResponsableItem) => void;
		onClickRestaurar: (item: AreaResponsableItem) => void;
		onKeydownRestaurar: (e: KeyboardEvent, item: AreaResponsableItem) => void;
	}

	const {
		gridArea = 'main',
		areaResponsableItems,
		showHeader = false,
		title = '',
		subtitle = '',
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar,
		onClickRestaurar,
		onKeydownRestaurar
	}: Props = $props();
</script>

<main class="main-panel" style="grid-area: {gridArea}">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<section class="table-container">
		{#if areaResponsableItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Puesto</th>
						<th class="col-code">Código</th>
						<th class="col-label">Nombre</th>
						<th class="col-text">Descripción</th>
						<th class="col-label">Reporta a</th>
						<th class="col-badge">Estatus</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each areaResponsableItems as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">
								{item.puesto?.code}
							</td>
							<td class="col-code">{item.code}</td>
							<td class="col-label">{item.name}</td>
							<td class="col-text">{item.description}</td>
							<td class="col-label">{item.parent?.name}</td>
							<td class="col-badge">
								<Badge variant={item.isDeleted ? 'error' : 'success'}>
									{item.isDeleted ? 'borrado' : 'activo'}
								</Badge>
							</td>
							<td class="col-actions-md">
								<div class="col-actions-row">
									<IconButton
										isDisabled={item.isDeleted}
										name="edit"
										tooltipLabel="Editar registro"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickEditar(item)}
										onKeydown={(e) => onKeydownEditar(e, item)}
									/>
									<IconButton
										isDisabled={item.isDeleted}
										name="delete"
										tooltipLabel="Borrar registro"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickBorrar(item)}
										onKeydown={(e) => onKeydownBorrar(e, item)}
									/>
									<IconButton
										isDisabled={!item.isDeleted}
										name="restore"
										tooltipLabel="Restaurar registro"
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
			<EmptySection message="No hay elementos de area responsable"></EmptySection>
		{/if}
	</section>
</main>

<style>
	.main-panel {
		min-height: 0;
	}
</style>
