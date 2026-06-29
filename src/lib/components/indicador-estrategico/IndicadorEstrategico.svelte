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
		onClickRestaurar: (item: IndicadorEstrategicoItem) => void;
		onKeydownRestaurar: (e: KeyboardEvent, item: IndicadorEstrategicoItem) => void;
	}

	const {
		indicadorEstrategicoItems,
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
		{#if indicadorEstrategicoItems && indicadorEstrategicoItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Objetivo</th>
						<th class="col-code">Código</th>
						<th class="col-label">Nombre</th>
						<th class="col-text">Descripción</th>
						<th class="col-metric">Meta</th>
						<th class="col-label">Origen de Datos</th>
						<th class="col-text">Formula de Datos</th>
						<th class="col-code">Frecuencia</th>
						<th class="col-badge">Estatus</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each indicadorEstrategicoItems as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">
								{item?.objetivo?.code}
							</td>
							<td class="col-code">{item.code}</td>
							<td class="col-label">{item.name}</td>
							<td class="col-text">{item.description}</td>
							<td class="col-metric">{item.target} {item.targetUnit}</td>
							<td class="col-label">{item.dataOrigin}</td>
							<td class="col-text">{item.dataFormula}</td>
							<td class="col-code">{item.frequencyValue} {item.frequencyUnit}</td>
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
			<EmptySection message="No hay elementos de indicador estrategico"></EmptySection>
		{/if}
	</section>
</main>
