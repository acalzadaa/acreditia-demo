<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { EtapaMetaItem } from '$lib/schemas/etapaMetadata.schema';

	interface Props {
		items: EtapaMetaItem[];
		onClickEditar: (item: EtapaMetaItem) => void;
		onClickFinish: (item: EtapaMetaItem) => void;
	}

	const { items, onClickEditar, onClickFinish }: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container">
		{#if items.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Código</th>
						<th class="col-metric">Meta</th>
						<th class="col-label">Unidad</th>
						<th class="col-code">No aplica</th>
						<th class="col-text">Razon de no aplica</th>
						<th class="col-actions">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each items as item (item)}
						<tr>
							<td class="col-code">{item.code}</td>
							<td class="col-metric">{item.target}</td>
							<td class="col-label">{item.targetUnit}</td>
							<td class="col-code"
								>{#if item.doesNotApply}
									<Icon name="check" />
								{/if}
							</td>
							<td class="col-text">{item.doesNotApplyReason}</td>
							<td class="col-actions-md">
								<div class="col-actions-row">
									<Button
										name="edit"
										tooltipLabel="Editar registro"
										variant="ghost"
										onClick={() => onClickEditar(item)}>Editar meta</Button
									>
									<Button name="upload" variant="ghost" onClick={() => onClickFinish(item)}
										>Terminar etapa</Button
									>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message="No hay elementos de metas organizacionales"></EmptySection>
		{/if}
	</section>
</main>

<style>
	.main-panel {
		flex-shrink: 0;
	}
</style>
