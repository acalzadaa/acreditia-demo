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
						<th>Codigo</th>
						<th>Nombre</th>
						<th>Tipo</th>
						<th>Descripcion</th>
						<th>Estatus</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each puestoItems as item (item.id)}
						<tr>
							<td>{item.code}</td>
							<td>{item.name}</td>
							<td>{item.type}</td>
							<td>{item.description}</td>
							<td>
								<Badge variant={item.isCurrent ? 'success' : 'error'}>
									{item.isCurrent ? 'activo' : 'borrado'}
								</Badge>
							</td>
							<td>
								<IconButton
									isDisabled={item.isDeleted}
									name={'edit'}
									size={'md'}
									borderShape={'square'}
									variant={'ghost'}
									onClick={() => onClickEditar(item)}
									onKeydown={(e) => onKeydownEditar(e, item)}
								/>
								<IconButton
									isDisabled={item.isDeleted}
									name={'delete'}
									size={'md'}
									borderShape={'square'}
									variant={'ghost'}
									onClick={() => onClickBorrar(item)}
									onKeydown={(e) => onKeydownBorrar(e, item)}
								/>
								<IconButton
									isDisabled={!item.isDeleted}
									name={'restore'}
									size={'md'}
									borderShape={'square'}
									variant={'ghost'}
									onClick={() => onClickRestaurar(item)}
									onKeydown={(e) => onKeydownRestaurar(e, item)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message={'No hay puestos de trabajo'}></EmptySection>
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
