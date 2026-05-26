<script lang="ts">
	import type { AreaFuncionalItem } from '$lib/schemas/areaFuncional.schema';
	import type { SubareaFuncionalItem } from '$lib/schemas/subareaFuncional.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		subareaFuncionalItems: SubareaFuncionalItem[];
		onClickEditar: (item: AreaFuncionalItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: AreaFuncionalItem) => void;
		onClickBorrar: (item: AreaFuncionalItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: AreaFuncionalItem) => void;
	}

	const {
		subareaFuncionalItems,
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar
	}: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container">
		{#if subareaFuncionalItems.length > 1}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th>Area Funcional</th>
						<th>Código</th>
						<th>Nombre</th>
						<th>Descripción</th>
						<th>Estatus</th>
						<th>Acciones</th>
					</tr>
				</thead>

				<tbody class="text-body">
					{#each subareaFuncionalItems as item (item.id)}
						<tr class="table-row">
							<td class="parent-relationship">
								<span class="text-body-small">{item?.areaFuncional?.code}</span>
								<span class="text-body-small"> {item.areaFuncional?.name}</span>
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
			<EmptySection message="No hay elementos de subarea funcional"></EmptySection>
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
