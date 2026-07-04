<script lang="ts">
	import type { IndicadorItem } from '$lib/schemas/indicador.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import PageHeader from '../common/PageHeader.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		title?: string;
		subtitle?: string;
		indicadorItems: IndicadorItem[];
		onClickEditar: (item: IndicadorItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: IndicadorItem) => void;
		onClickBorrar: (item: IndicadorItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: IndicadorItem) => void;
		onClickRestaurar: (item: IndicadorItem) => void;
		onKeydownRestaurar: (e: KeyboardEvent, item: IndicadorItem) => void;
		onClickDetalle?: (item: IndicadorItem) => void;
		onKeydownDetalle?: (e: KeyboardEvent, item: IndicadorItem) => void;
	}

	const {
		title = 'Add',
		subtitle = '',
		indicadorItems,
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar,
		onClickRestaurar,
		onKeydownRestaurar,
		onClickDetalle,
		onKeydownDetalle
	}: Props = $props();

	let showHeader = $derived(indicadorItems.length == 1);
	let showDetailIcon = $derived(indicadorItems.length > 1);
</script>

<main class="main-panel">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<section class="table-container">
		{#if indicadorItems && indicadorItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Seccion</th>
						<th class="col-code">Código</th>
						<th class="col-label">Nombre</th>
						<th class="col-text">Descripción</th>
						<th class="col-metric">Meta</th>
						<th class="col-badge">Estatus</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each indicadorItems as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.section.name}</td>
							<td class="col-code">{item.code}</td>
							<td class="col-label">{item.name}</td>
							<td class="col-text">{item.description}</td>
							<td class="col-metric">{item.target} {item.targetUnit}</td>
							<td class="col-badge">
								<Badge variant={item.isDeleted ? 'error' : 'success'}>
									{item.isDeleted ? 'borrado' : 'activo'}
								</Badge>
							</td>
							<td class="col-actions-md">
								<div class="actions-row">
									{#if showDetailIcon && onClickDetalle && onKeydownDetalle}
										<IconButton
											isDisabled={item.isDeleted}
											name="detail"
											tooltipLabel="Ver detalle"
											size="md"
											borderShape="square"
											variant="ghost"
											onClick={() => onClickDetalle(item)}
											onKeydown={(e) => onKeydownDetalle(e, item)}
										/>
									{/if}
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
			<EmptySection message="No hay elementos de indicador"></EmptySection>
		{/if}
	</section>
</main>

<style>
	.main-panel {
		flex: 1;
		min-height: 0;
	}
</style>
