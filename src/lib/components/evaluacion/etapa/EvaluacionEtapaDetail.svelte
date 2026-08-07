<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import type { EvaluacionEtapaItem } from '$lib/schemas/evaluacionEtapa.schema';
	import CardHeaderCustom from '$lib/components/ui/card/CardHeaderCustom.svelte';
	import {
		convertStatusToBadgeVariant,
		formatEtapaDateRange,
		isEtapaDateRange
	} from '../utils/EvaluacionEtapaUtils';
	import Tag from '$lib/components/ui/Tag.svelte';

	interface Props {
		items: EvaluacionEtapaItem[];
	}

	const { items }: Props = $props();
</script>

<main class="main-panel--inline">
	<section class="list-view--cards">
		{#if items.length > 0}
			<CardColumn minWidth="360px" maxWidth="3000px">
				{#each items as item (item.id)}
					<Card>
						<CardHeaderCustom>
							{#snippet title()}
								<Tag class="text-caption" variant="info">Etapa {item.etapa.order}</Tag>
								<p style="text-transform: capitalize;">
									{item.etapa.name}
								</p>
							{/snippet}
							{#snippet subtitle()}
								{#if isEtapaDateRange(item.fechaInicio, item.fechaFinal)}
									<p>Ordinario: {formatEtapaDateRange(item.fechaInicio, item.fechaFinal)}</p>
								{/if}
								{#if item.periodoExtraordinario}
									<p>
										Extraordinario:
										{formatEtapaDateRange(
											item.periodoExtraordinarioInicio,
											item.periodoExtraordinarioFinal
										)}
									</p>
								{/if}
							{/snippet}
							<Badge
								variant={convertStatusToBadgeVariant(item.status).badgeStatus}
								icon={convertStatusToBadgeVariant(item.status).icon}
								>{convertStatusToBadgeVariant(item.status).label}</Badge
							>
						</CardHeaderCustom>
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

	.list-view--cards {
		display: none;
	}

	/* Ajustar el max-width dependiendo el contenido! */
	@media (max-width: 2500px) {
		.list-view--cards {
			display: grid;
		}
	}
</style>
