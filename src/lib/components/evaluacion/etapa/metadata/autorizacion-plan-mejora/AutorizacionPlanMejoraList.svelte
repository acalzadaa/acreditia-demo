<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { EtapaAutorizacionPlanMejoraItem } from '$lib/schemas/etapaMetadata.schema';

	interface Props {
		items: EtapaAutorizacionPlanMejoraItem[];
		onClickEditar: (item: EtapaAutorizacionPlanMejoraItem) => void;
		onClickFinish: (item: EtapaAutorizacionPlanMejoraItem) => void;
	}

	const { items, onClickEditar, onClickFinish }: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container">
		{#if items.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-label">Código</th>
						<th class="col-text">Acuerdos</th>
						<th class="col-code">Autorización</th>
						<th class="col-actions">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each items as item (item)}
						<tr>
							<td class="col-label">{item.code}</td>
							<td class="col-text">{item.agreements}</td>
							<td class="col-code">
								{#if item.authorized}
									<Badge variant="info">{item.authorized ? 'si' : 'no'}</Badge>
								{/if}
							</td>
							<td class="col-actions-lg">
								<div class="col-actions-row">
									<Button name="edit"
tooltipLabel="Editar registro" variant="ghost" onClick={() => onClickEditar(item)}
										>Autorizar plan de mejora</Button
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
			<EmptySection message="No hay elementos de captura de plan de mejora"></EmptySection>
		{/if}
	</section>
</main>

<style>
	.main-panel {
		flex-shrink: 0;
	}
</style>
