<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import type { IndicadorItem } from '$lib/schemas/indicador.schema';

	interface Props {
		items: IndicadorItem[];
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
	}

	const {
		items,
		showHeader = true,
		title = 'Detalle de indicador',
		subtitle = ''
	}: Props = $props();

	function buildTarget(item: IndicadorItem): string {
		return item.target + ' ' + item.targetUnit;
	}
</script>

<main class="main-panel--inline">
	<section class="list-view--table">
		{#if showHeader}
			<PageHeader {title} {subtitle} />
		{/if}
		{#if items.length > 0}
			<div class="table-container--inline">
				<table class="data-table text-body">
					<thead class="text-body-strong">
						<tr>
							<th class="col-code">Seccion</th>
							<th class="col-code">Código</th>
							<th class="col-label">Nombre</th>
							<th class="col-text">Descripción</th>
							<th class="col-metric">Meta</th>
							<th class="col-badge">Estatus</th>
						</tr>
					</thead>

					<tbody class="text-body">
						{#each items as item (item.id)}
							<tr class="table-row tr-expandable">
								<td class="col-code">{item.section.code}</td>
								<td class="col-code">{item.code}</td>
								<td class="col-label">{item.name}</td>
								<td class="col-text">{item.description}</td>
								<td class="col-metric">{buildTarget(item)}</td>
								<td class="col-badge">
									<Badge variant={item.isDeleted ? 'error' : 'success'}>
										{item.isDeleted ? 'borrado' : 'activo'}
									</Badge>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<EmptySection />
		{/if}
	</section>

	<section class="list-view--cards">
		{#if items.length > 0}
			<CardColumn minWidth="360px" maxWidth="2500px">
				{#each items as item (item.id)}
					<Card>
						<CardHeader subtitle={item.code} title={item.name}>
							<Badge variant={item.isDeleted ? 'error' : 'success'}>
								{item.isDeleted ? 'borrado' : 'activo'}
							</Badge>
						</CardHeader>

						<CardContent>
							<CardContentItem label="Descripción" value={item.description} />
							<CardContentItem label="Tipo" value={item.indicadorType} />
							<CardContentItem label="Meta" value={buildTarget(item)} />
						</CardContent>
					</Card>
				{/each}
			</CardColumn>
		{:else}
			<EmptySection message="No hay elementos"></EmptySection>
		{/if}
	</section>
</main>

<style>
	.main-panel--inline {
		flex: none;
		min-height: auto;
		overflow: visible;
	}

	/* Por default (>= 1500px) gana la tabla; las cards quedan ocultas
	   y fuera del flujo para no pelear por el flex del panel. */
	.list-view--table {
		display: contents;
	}

	.list-view--cards {
		display: none;
	}

	/* Ajustar el max-width dependiendo el contenido! */
	@media (max-width: 2500px) {
		.list-view--table {
			display: none;
		}

		.list-view--cards {
			display: grid;
		}
	}
</style>
