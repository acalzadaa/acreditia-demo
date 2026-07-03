<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import type { AreaFuncionalRef } from '$lib/schemas/shared.schema';

	interface Props {
		gridArea?: string;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		items: AreaFuncionalRef[];
		onClickBorrar: (item: AreaFuncionalRef) => void;
	}

	const {
		gridArea = 'main',
		showHeader = false,
		title = 'Add',
		subtitle = '',
		items,
		onClickBorrar
	}: Props = $props();
</script>

<main class="main-panel" style="grid-area: {gridArea}">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<section class="table-container">
		{#if items && items.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Code</th>
						<th class="col-label">Subarea funcional</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">
								{item.code}
							</td>
							<td class="col-label">
								{item.name}
							</td>

							<td class="col-actions-md">
								<div class="col-actions-row">
									<IconButton
										name="remove"
										tooltipLabel="Borrar registro"
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
			<EmptySection message="No hay elementos de subarea funcional"></EmptySection>
		{/if}
	</section>
</main>
