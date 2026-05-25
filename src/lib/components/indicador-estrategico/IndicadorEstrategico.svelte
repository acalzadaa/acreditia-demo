<script lang="ts">
	import type { IndicadorEstrategicoItem } from '$lib/schemas/indicadorEstrategico.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		indicadorEstrategicoItems: IndicadorEstrategicoItem[];
		onClickEditar: (item: IndicadorEstrategicoItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: IndicadorEstrategicoItem) => void;
		onClickBorrar: (item: IndicadorEstrategicoItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: IndicadorEstrategicoItem) => void;
	}

	const {
		indicadorEstrategicoItems,
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar
	}: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container">
		{#if indicadorEstrategicoItems && indicadorEstrategicoItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th>Objetivo Estrategico</th>
						<th>Código</th>
						<th>Nombre</th>
						<th>Descripción</th>
						<th>Meta</th>
						<th>Origen de Datos</th>
						<th>Formula de Datos</th>
						<th>Frecuencia</th>
						<th>Responsable</th>
						<th>Estatus</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each indicadorEstrategicoItems as item (item.id)}
						<tr>
							<td class="parent-relationship">
								<span class="text-body-small">{item?.objetivo?.code}</span>
								<span class="text-body-small"> {item.objetivo?.name}</span>
							</td>
							<td>{item.code}</td>
							<td>{item.name}</td>
							<td>{item.description}</td>
							<td>{item.target}</td>
							<td>{item.dataOrigin}</td>
							<td>{item.dataFormula}</td>
							<td>{item.frequencyValue} {item.frequencyUnit}</td>
							<td>{item.responsible}</td>
							<td>
								<Badge variant={item.status === 'activo' ? 'success' : 'warning'}>
									{item.status}
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
			<EmptySection message={'No hay elementos de indicador estrategico'}></EmptySection>
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
