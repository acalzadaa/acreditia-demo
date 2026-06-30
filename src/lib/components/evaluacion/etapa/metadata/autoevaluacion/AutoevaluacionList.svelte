<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { EtapaAutoevaluacionItem } from '$lib/schemas/etapaMetadata.schema';

	interface Props {
		evaluacionItems: EtapaAutoevaluacionItem[];
		onClickEditar: (item: EtapaAutoevaluacionItem) => void;
		onClickFinish: (item: EtapaAutoevaluacionItem) => void;
	}

	const { evaluacionItems, onClickEditar, onClickFinish }: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container">
		{#if evaluacionItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-label">Código</th>
						<th class="col-metric">Puntuacion</th>
						<th class="col-text">Comentario</th>
						<th class="col-actions">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each evaluacionItems as item (item)}
						<tr>
							<td class="col-label">{item.code}</td>
							<td class="col-metric">{item.score}</td>
							<td class="col-text">{item.comment}</td>
							<td class="col-actions-lg">
								<div class="col-actions-row">
									<Button name="edit"
tooltipLabel="Editar registro" variant="ghost" onClick={() => onClickEditar(item)}
										>Editar comentario
									</Button>
									<Button name="upload" variant="ghost" onClick={() => onClickFinish(item)}
										>Terminar etapa
									</Button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message="No hay elementos de autoevaluacion"></EmptySection>
		{/if}
	</section>
</main>

<style>
	.main-panel {
		flex-shrink: 0;
	}
</style>
