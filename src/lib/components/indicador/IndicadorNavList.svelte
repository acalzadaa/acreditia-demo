<script lang="ts">
	import { navigateTo } from '$lib/helpers/navigation';
	import type { indicadorNavListItem } from '$lib/schemas/indicadorNavigation.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import PageHeader from '../common/PageHeader.svelte';
	import Button from '../ui/Button.svelte';

	interface Props {
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		items: indicadorNavListItem[];
	}

	const { showHeader = false, title = 'Add', subtitle = '', items }: Props = $props();
</script>

<main class="main-panel--inline">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<section class="table-container--inline">
		{#if items && items.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-actions-sm">Agregar complementos</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-actions-sm">
								<div class="col-actions-row">
									<Button variant="link" onClick={() => navigateTo(item.url)}
										>{item.name}</Button
									>
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
	.main-panel--inline {
		flex: none;
		min-height: auto;
		overflow: visible;
	}
</style>
