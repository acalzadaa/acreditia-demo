<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import { navigateTo } from '$lib/helpers/navigation';
	import type { IndicadorAreaResponsableItem } from '$lib/schemas/indicadorAreaResponsable';

	interface Props {
		gridArea?: string;
		showHeader?: boolean;
		showDetailIcon?: boolean;

		title?: string;
		subtitle?: string;
		items: IndicadorAreaResponsableItem[];
		onClickBorrar: (item: IndicadorAreaResponsableItem) => void;
	}

	const {
		gridArea = 'main',
		showHeader = false,
		showDetailIcon = false,
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
						<th class="col-code">Codigo</th>
						<th class="col-code">Area responsable</th>
						<th class="col-text">Descripcion</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.code}</td>
							<td class="col-code">
								<Badge variant="info">{item.areaResponsable.code}</Badge>
							</td>
							<td class="col-descripcion">
								{item.areaResponsable.name}
							</td>

							<td class="col-actions-md">
								<div class="col-actions-row">
									{#if showDetailIcon}
										<IconButton
											isDisabled={item.isDeleted}
											name="detail"
											tooltipLabel="Ver detalle"
											size="md"
											borderShape="square"
											variant="ghost"
											onClick={() => navigateTo(item.code)}
										/>
									{/if}
									<IconButton
										isDisabled={item.isDeleted}
										name="delete"
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
			<EmptySection message="No hay elementos de area responsable"></EmptySection>
		{/if}
	</section>
</main>
