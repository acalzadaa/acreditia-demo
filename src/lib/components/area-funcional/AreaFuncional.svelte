<script lang="ts">
	import type { AreaFuncionalItem } from '$lib/schemas/areaFuncional.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		areaFuncionalItems: AreaFuncionalItem[];
		onClickEditar: (item: AreaFuncionalItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: AreaFuncionalItem) => void;
		onClickBorrar: (item: AreaFuncionalItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: AreaFuncionalItem) => void;
	}

	const {
		areaFuncionalItems,
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar
	}: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container">
		{#if areaFuncionalItems.length > 1}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th>Código</th>
						<th>Nombre</th>
						<th>Descripción</th>
						<th>Estatus</th>
						<th>Acciones</th>
					</tr>
				</thead>

				<tbody class="text-body">
					{#each areaFuncionalItems as item (item.id)}
						<tr class="table-row">
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
			<EmptySection message="No hay elementos de area funcional"></EmptySection>
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
