<script lang="ts">
	import type { PuestoItem } from '$lib/schemas/puesto.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		puestoItems: PuestoItem[];
		onClickEditar: (item: PuestoItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: PuestoItem) => void;
		onClickBorrar: (item: PuestoItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: PuestoItem) => void;
		onClickRestaurar: (item: PuestoItem) => void;
		onKeydownRestaurar: (e: KeyboardEvent, item: PuestoItem) => void;
	}

	const {
		puestoItems,
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar,
		onClickRestaurar,
		onKeydownRestaurar
	}: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container">
		{#if puestoItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Código</th>
						<th class="col-label">Nombre</th>
						<th class="col-label">Tipo</th>
						<th class="col-text">Descripción</th>
						<th class="col-badge">Estatus</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each puestoItems as item (item.id)}
						<tr>
							<td class="col-code">{item.code}</td>
							<td class="col-label">{item.name}</td>
							<td class="col-label">{item.type}</td>
							<td class="col-text">{item.description}</td>
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
			<EmptySection message="No hay puestos de trabajo"></EmptySection>
		{/if}
	</section>
</main>
