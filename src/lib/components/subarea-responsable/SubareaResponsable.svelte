<script lang="ts">
	import type { AreaResponsableItem } from '$lib/schemas/areaResponsable.schema';
	import type { SubareaResponsableItem } from '$lib/schemas/subareaResponsable.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		subareaResponsableItems: SubareaResponsableItem[];
		onClickEditar: (item: AreaResponsableItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: AreaResponsableItem) => void;
		onClickBorrar: (item: AreaResponsableItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: AreaResponsableItem) => void;
	}

	const {
		subareaResponsableItems,
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar
	}: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container">
		{#if subareaResponsableItems.length > 1}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th>Area Responsable</th>
						<th>Código</th>
						<th>Nombre</th>
						<th>Descripción</th>
						<th>Estatus</th>
						<th>Acciones</th>
					</tr>
				</thead>

				<tbody class="text-body">
					{#each subareaResponsableItems as item (item.id)}
						<tr class="table-row">
							<td class="parent-relationship">
								<span class="text-body-small">{item?.areaResponsable?.code}</span>
								<span class="text-body-small"> {item.areaResponsable?.name}</span>
							</td>
							<td>{item.code}</td>
							<td>{item.name}</td>
							<td>{item.description}</td>
							<td>
								<Badge variant={item.status === 'activo' ? 'success' : 'warning'}>
									{item.status}
								</Badge>
							</td>
							<td>
								<IconButton
									name="edit"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickEditar(item)}
									onKeydown={(e) => onKeydownEditar(e, item)}
								/>
								<IconButton
									name="delete"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickBorrar(item)}
									onKeydown={(e) => onKeydownBorrar(e, item)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message="No hay elementos de subarea responsable"></EmptySection>
		{/if}
	</section>
</main>

<style>


	@media (max-width: 768px) {
		.table-container {
			padding: 0 1rem 1rem 1rem;
		}
	}
</style>
