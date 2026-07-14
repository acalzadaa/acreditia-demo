<script lang="ts">
	import { navigateTo } from '$lib/helpers/navigation';
	import type { indicadorNavListItem } from '$lib/schemas/indicadorNavigation.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import PageHeader from '../common/PageHeader.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		items: indicadorNavListItem[];
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
						<th class="col-actions-sm">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.name}</td>

							<td class="col-actions-sm">
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
			<EmptySection />
		{/if}
	</section>
</main>

<style>
	.main-panel {
		flex: 1;
		min-height: 0;
	}
</style>
