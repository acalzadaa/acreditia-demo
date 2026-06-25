<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import type { EvidenciaUrlRef } from '$lib/schemas/etapaMetadata.schema';

	interface Props {
		items: EvidenciaUrlRef[];
		onClickBorrar: (item: EvidenciaUrlRef) => void;
	}

	const { items, onClickBorrar }: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container table-container--inline">
		{#if items.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-text">url</th>
						<th class="col-actions-sm">Acciones</th>
					</tr>
				</thead>

				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="tr-expandable">
							<td class="col-text">{item.url}</td>

							<td class="col-actions-sm">
								<div class="actions-row">
									<IconButton
										isDisabled={false}
										name="close"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickBorrar(item)}
									/>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message="No hay elementos de url"></EmptySection>
		{/if}
	</section>
</main>

<style>
	/*
	 * Estilos de tabla (.data-table, .col-*, .table-container, etc.)
	 * vienen de table.css (importado globalmente vía main.css en el
	 * +layout.svelte raíz). Este componente usa la clase modificadora
	 * .table-container--inline porque vive dentro de .content-area
	 * (flex-column en +page.svelte), que es quien controla el scroll
	 * vertical del grupo completo de componentes — la tabla aquí debe
	 * crecer según sus filas, no tener su propia altura/scroll interno.
	 * Ver table.css para el detalle de las dos variantes disponibles.
	 */
	.main-panel {
		display: block;
		width: 100%;
		flex-shrink: 0;
	}
</style>