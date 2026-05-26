<script lang="ts">
	import type {  ObjetivoEstrategicoWithPlaneacionItem } from '$lib/schemas/objetivoEstrategico.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		objetivoEstrategicoItems: ObjetivoEstrategicoWithPlaneacionItem[];
		onClickEditar: (item: ObjetivoEstrategicoWithPlaneacionItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: ObjetivoEstrategicoWithPlaneacionItem) => void;
		onClickBorrar: (item: ObjetivoEstrategicoWithPlaneacionItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: ObjetivoEstrategicoWithPlaneacionItem) => void;
	}

	const {
		objetivoEstrategicoItems,
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar
	}: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container">
		{#if objetivoEstrategicoItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th>Planeacion Estrategica</th>
						<th>Código</th>
						<th>Nombre</th>
						<th>Descripción</th>
						<th>Estatus</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each objetivoEstrategicoItems as item (item.id)}
						<tr>
							<td class="parent-relationship">
								<span class="text-body-small">{item?.planeacion?.code}</span>
								<span class="text-body-small"> {item.planeacion?.name}</span>
							</td>
							<td>{item.code}</td>
							<td>{item.name}</td>
							<td>{item.description}</td>
							<td>
								<Badge variant={item.isDeleted ? 'error' : 'success'}>
									{item.isDeleted ? 'borrado' : 'activo'}
								</Badge>
							</td>
							<td>
								<IconButton
									name={'edit'}
									size={'md'}
									borderShape={'square'}
									variant={'ghost'}
									onClick={() => onClickEditar(item)}
									onKeydown={(e) => onKeydownEditar(e, item)}
								/>
								<IconButton
									name={'delete'}
									size={'md'}
									borderShape={'square'}
									variant={'ghost'}
									onClick={() => onClickBorrar(item)}
									onKeydown={(e) => onKeydownBorrar(e, item)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message={'No hay elementos de objetivo estrategico'}></EmptySection>
		{/if}
	</section>
</main>

<style>
	.parent-relationship {
		display: flex;
		flex-direction: column;
	}
	@media (max-width: 768px) {
		.table-container {
			padding: 0 1rem 1rem 1rem;
		}
	}
</style>
