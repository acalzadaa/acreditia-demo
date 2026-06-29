<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import type { RubricaCriterioItem } from '$lib/schemas/rubricaCriterio.schema';

	interface Props {
		gridArea?: string;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		items: RubricaCriterioItem[];
		onClickEditar: (item: RubricaCriterioItem) => void;
		onClickBorrar: (item: RubricaCriterioItem) => void;
		onClickRestaurar: (item: RubricaCriterioItem) => void;
	}

	const {
		gridArea = 'main',
		showHeader = false,
		title = 'Add',
		subtitle = '',
		items,
		onClickEditar,
		onClickBorrar,
		onClickRestaurar
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
						<th class="col-text">Criterio</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">
								{item.code}
							</td>
							<td class="col-text">
								{item.criterio}
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
									/>
									<IconButton
										isDisabled={item.isDeleted}
										name="delete"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickBorrar(item)}
									/>
									<IconButton
										isDisabled={!item.isDeleted}
										name="restore"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickRestaurar(item)}
									/>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message="No hay elementos de criterio de rubrica"></EmptySection>
		{/if}
	</section>
</main>
