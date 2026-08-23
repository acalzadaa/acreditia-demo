<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import type { EvaluacionItem } from '$lib/schemas/evaluacion.schema';
	import { convertEvaluacionStatusToBadgeVariant } from './utils/EvaluacionUtils';
	
	interface Props {
		items: EvaluacionItem[];
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
	}

	const {
		items,
		showHeader = true,
		title = 'Listado de evaluaciones',
		subtitle = ''
	}: Props = $props();
</script>

<main class="main-panel--inner">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}

	<section class="list-view--table">
		{#if items.length > 0}
			<div class="table-container">
				<table class="data-table text-body">
					<thead class="text-body-strong">
						<tr>
							<th class="col-label">Modelo</th>
							<th class="col-label">Institución</th>
							<th class="col-code">Código</th>
							<th class="col-label">Nombre</th>
							<th class="col-metric">Año</th>
							<th class="col-metric">Ciclo</th>
							<th class="col-badge">Estatus</th>
						</tr>
					</thead>

					<tbody class="text-body">
						{#each items as item (item.id)}
							<tr class="table-row tr-expandable">
								<td class="col-label">{item.modelo?.name}</td>
								<td class="col-label">{item.institucion?.name}</td>
								<td class="col-code">{item.code}</td>
								<td class="col-label">{item.name}</td>
								<td class="col-metric">{item.year}</td>
								<td class="col-metric">{item.cycle}</td>
								<td class="col-badge">
									<Badge variant={convertEvaluacionStatusToBadgeVariant(item.status).badgeStatus}>
										{convertEvaluacionStatusToBadgeVariant(item.status).label}
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
			<CardColumn minWidth="360px" maxWidth="2749px">
				{#each items as item (item.id)}
					<Card>
						<CardHeader subtitle={item.code} title={item.name}>
							<Badge variant={convertEvaluacionStatusToBadgeVariant(item.status).badgeStatus}>
								{convertEvaluacionStatusToBadgeVariant(item.status).label}
							</Badge>
						</CardHeader>

						<CardContent>
							<CardContentItem label="Modelo" value={item.modelo.name} />
							<CardContentItem label="Institución" value={item.institucion.name} />
							<CardContentItem label="Evaluacion" value={item.name} />
							<CardContentItem label="Año" value={item.year.toString()} />
							<CardContentItem label="Ciclo" value={item.cycle.toString()} />
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
	/* Por default (>= 1500px) gana la tabla; las cards quedan ocultas
	   y fuera del flujo para no pelear por el flex del panel. */
	.list-view--table {
		display: contents;
	}

	.list-view--cards {
		display: none;
	}

	/* Ajustar el max-width dependiendo el contenido! */
	@media (max-width: 2750px) {
		.list-view--table {
			display: none;
		}

		.list-view--cards {
			display: flex;
			flex-direction: column;
			flex: 1;
			min-height: 0;
		}
	}
</style>
