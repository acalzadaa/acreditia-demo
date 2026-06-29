<script lang="ts">
	import type { InstitucionWithRelationsItem } from '$lib/schemas/institucion.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		institucionItems: InstitucionWithRelationsItem[];
		onClickEditar: (item: InstitucionWithRelationsItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: InstitucionWithRelationsItem) => void;
		onClickBorrar: (item: InstitucionWithRelationsItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: InstitucionWithRelationsItem) => void;
		onClickRestaurar: (item: InstitucionWithRelationsItem) => void;
		onKeydownRestaurar: (e: KeyboardEvent, item: InstitucionWithRelationsItem) => void;
	}

	const {
		institucionItems,
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
		{#if institucionItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Entidad Legal</th>
						<th class="col-code">Código</th>
						<th class="col-label">Nombre</th>
						<th class="col-badge">Estatus</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each institucionItems as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">
								{item.entidadLegal?.code}
							</td>
							<td class="col-code">{item.code}</td>
							<td class="col-label">{item.name}</td>
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
			<EmptySection message="No hay elementos de planeacion estrategica"></EmptySection>
		{/if}
	</section>
</main>
