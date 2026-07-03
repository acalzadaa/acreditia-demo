<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import { navigateTo } from '$lib/helpers/navigation';
	import type { EtapaDetailItem } from '$lib/schemas/etapaDetail.schema';

	interface Props {
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		items: EtapaDetailItem[];
	}

	const { showHeader = false, title = 'Add', subtitle = '', items }: Props = $props();
</script>

<main class="main-panel">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<section class="table-container">
		{#if items && items.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Seccion</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.name}</td>
							<td class="col-actions-md">
								<div class="col-actions-row">
									<IconButton
										name="detail"
										tooltipLabel="Ver detalle"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => navigateTo(item.url)}
									/>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message="No hay elementos de evaluacion"></EmptySection>
		{/if}
	</section>
</main>

<style>
	.main-panel {
		flex-shrink: 0;
		position: sticky;
		top: 0;
		z-index: 1;
	}
</style>
