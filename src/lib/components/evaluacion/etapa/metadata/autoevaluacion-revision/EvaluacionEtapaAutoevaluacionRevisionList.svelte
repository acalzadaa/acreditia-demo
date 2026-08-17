<script lang="ts">
	import { capitalizeText } from '$lib/components/common/utils/stringUtils';
	import { convertEvaluacionEtapaIndicadorStatusToBadgeVariant } from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import { getSafeText } from '$lib/components/evaluacion/utils/EvaluacionUtils';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import CardHeaderCustom from '$lib/components/ui/card/CardHeaderCustom.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import { navigateTo } from '$lib/helpers/navigation';
	import type { EvaluacionEtapaIndicadorItemFor } from '$lib/schemas/evaluacionEtapaIndicador.schema';
	type EvaluacionRevisionIndicadorItem = EvaluacionEtapaIndicadorItemFor<'autoevaluacion-revision'>;

	interface Props {
		items: EvaluacionRevisionIndicadorItem[];
	}

	const { items }: Props = $props();
</script>

<main class="main-panel--inline">
	<section class="list-view--cards text-body">
		{#each items as item (item.id)}
			<CardColumn minWidth="360px" maxWidth="2500px">
				<Card>
					<!-- Datos de indicador -->
					<CardHeaderCustom onClick={() => navigateTo(item.id)}>
						{#snippet title()}
							<Tag class="text-caption" variant="info">Indicador</Tag>
							<p>{capitalizeText(item.indicador.name)}</p>
						{/snippet}

						<Badge
							variant={convertEvaluacionEtapaIndicadorStatusToBadgeVariant(item.status).badgeStatus}
							icon={convertEvaluacionEtapaIndicadorStatusToBadgeVariant(item.status).icon}
						>
							{convertEvaluacionEtapaIndicadorStatusToBadgeVariant(item.status).label}
						</Badge>
					</CardHeaderCustom>
					<!-- Datos de rubrica seleccionada -->
					<CardContent>
						<CardContentItem label="Campus" value={capitalizeText(item.campus.name)} />
						<CardContentItem
							label="Unidad académica"
							value={capitalizeText(item.unidadAcademica.name)}
						/>

						<CardContentItem
							label="Autoevaluación"
							value={capitalizeText(item.metadata.originalName)}
						/>

						<CardContentItem
							label="Autoevaluación revisada"
							value={getSafeText(capitalizeText(item.metadata.name), 'Sin completar')}
						/>
						{#if item.metadata.comment}
							<CardContentItem label="Comentario" value={capitalizeText(item.metadata.comment)} />
						{/if}
						{#if item.metadata.feedback}
							<CardContentItem
								label="Retroalimentacion"
								value={capitalizeText(item.metadata.feedback)}
							/>
						{/if}
					</CardContent>
				</Card>
			</CardColumn>
		{/each}
	</section>
</main>
