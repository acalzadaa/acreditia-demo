<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import type { EvidenciaItem } from '$lib/schemas/evidencia.schema';

	interface Props {
		showHeader?: boolean;

		title?: string;
		subtitle?: string;
		items: EvidenciaItem[];
		onClickBorrar: (item: EvidenciaItem) => void;
	}

	const {
		showHeader = false,
		title = 'Add',
		subtitle = '',
		items,
		onClickBorrar
	}: Props = $props();
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
						<th class="col-code">Codigo</th>
						<th class="col-code">Evidencia</th>
						<th class="col-text">Descripcion</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.code}</td>
							<td class="col-code">
								<Badge variant="info">{item.code}</Badge>
							</td>
							<td class="col-text">
								{item.name}
							</td>

							<td class="col-actions-sm">
								<div class="col-actions-row">
									<IconButton
										isDisabled={item.isDeleted}
										name="remove"
										tooltipLabel="Desvincular registro"
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
			<EmptySection message="No hay elementos"></EmptySection>
		{/if}
	</section>
</main>
