<script lang="ts">
	import type { ObjetivoEstrategicoWithPlaneacionItem } from '$lib/schemas/objetivoEstrategico.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		objetivoEstrategicoItems: ObjetivoEstrategicoWithPlaneacionItem[];
		onClickEditar: (item: ObjetivoEstrategicoWithPlaneacionItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: ObjetivoEstrategicoWithPlaneacionItem) => void;
		onClickBorrar: (item: ObjetivoEstrategicoWithPlaneacionItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: ObjetivoEstrategicoWithPlaneacionItem) => void;
		onClickRestaurar: (item: ObjetivoEstrategicoWithPlaneacionItem) => void;
		onKeydownRestaurar: (e: KeyboardEvent, item: ObjetivoEstrategicoWithPlaneacionItem) => void;
	}

	const {
		objetivoEstrategicoItems,
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
		{#if objetivoEstrategicoItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Planeacion</th>
						<th class="col-code">Código</th>
						<th class="col-label">Nombre</th>
						<th class="col-text">Descripción</th>
						<th class="col-badge">Estatus</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each objetivoEstrategicoItems as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">
								{item?.planeacion?.code}
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
			<EmptySection message="No hay elementos de objetivo estrategico"></EmptySection>
		{/if}
	</section>
</main>
