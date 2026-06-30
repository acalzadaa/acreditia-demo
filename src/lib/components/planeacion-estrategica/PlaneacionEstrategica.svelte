<script lang="ts">
	import type { PlaneacionEstrategicaWithFilosofiaItem } from '$lib/schemas/planeacionEstrategica.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		planeacionEstrategicaItems: PlaneacionEstrategicaWithFilosofiaItem[];
		onClickEditar: (item: PlaneacionEstrategicaWithFilosofiaItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: PlaneacionEstrategicaWithFilosofiaItem) => void;
		onClickBorrar: (item: PlaneacionEstrategicaWithFilosofiaItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: PlaneacionEstrategicaWithFilosofiaItem) => void;
		onClickRestaurar: (item: PlaneacionEstrategicaWithFilosofiaItem) => void;
		onKeydownRestaurar: (e: KeyboardEvent, item: PlaneacionEstrategicaWithFilosofiaItem) => void;
	}

	const {
		planeacionEstrategicaItems,
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
		{#if planeacionEstrategicaItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Filosofia</th>
						<th class="col-code">Código</th>
						<th class="col-label">Nombre</th>
						<th class="col-text">Descripción</th>
						<th class="col-badge">Estatus</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each planeacionEstrategicaItems as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">
								{item.filosofia?.code}
							</td>
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
			<EmptySection message="No hay elementos de planeacion estrategica"></EmptySection>
		{/if}
	</section>
</main>
