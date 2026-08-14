<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeaderCustom from '$lib/components/ui/card/CardHeaderCustom.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { EvaluacionEtapaIndicadorItemFor } from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import { convertEvaluacionEtapaIndicadorStatusToBadgeVariant } from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getSafeText } from '$lib/components/evaluacion/utils/EvaluacionUtils';
	import EvalucionEtapaIndicadorFooterActions from '../EvalucionEtapaIndicadorFooterActions.svelte';

	type ResultadosIndicadorItem = EvaluacionEtapaIndicadorItemFor<'resultados'>;

	interface Props {
		items: ResultadosIndicadorItem[];
		onClickEditar: (item: ResultadosIndicadorItem) => void;
		onClickNoAplica: (item: ResultadosIndicadorItem) => void;
		onClickFinish: (item: ResultadosIndicadorItem) => void;
		onClickAceptar: (item: ResultadosIndicadorItem) => void;
		onClickRechazar: (item: ResultadosIndicadorItem) => void;
	}
	const {
		items,
		onClickEditar,
		onClickNoAplica,
		onClickFinish,
		onClickAceptar,
		onClickRechazar
	}: Props = $props();
</script>

<section class="list-view--cards">
	{#if items.length > 0}
		<CardColumn minWidth="360px" maxWidth="3000px">
			{#each items as item (item.id)}
				<Card>
					<CardHeaderCustom>
						{#snippet title()}
							<Tag class="text-caption" variant="info">Indicador</Tag>
							<p style="text-transform: capitalize;">
								{item.indicador.name}
							</p>
						{/snippet}

						<Badge
							variant={convertEvaluacionEtapaIndicadorStatusToBadgeVariant(item.status).badgeStatus}
							icon={convertEvaluacionEtapaIndicadorStatusToBadgeVariant(item.status).icon}
							>{convertEvaluacionEtapaIndicadorStatusToBadgeVariant(item.status).label}</Badge
						>
					</CardHeaderCustom>
					<CardContent>
						<CardContentItem label="Campus" value={item.campus.name} />
						<CardContentItem label="Unidad académica" value={item.unidadAcademica.name} />
						<CardContentItem label="Meta original">{item.metadata.target}</CardContentItem>
						<CardContentItem label="Resultado">
							<Button onClick={() => onClickEditar(item)} variant="text">
								{getSafeText(item.metadata.result, 'Agrega el resultado')}
							</Button>
						</CardContentItem>
						{#if item.metadata.result}
							<CardContentItem label="¿Se logró la meta?">
								{item.metadata.isGoalReached ? 'Si' : 'No'}
							</CardContentItem>
							{#if !item.metadata.isGoalReached}
								<CardContentItem label="¿Por qué no se alcanzó la meta?">
									{item.metadata.reason}
								</CardContentItem>
							{/if}
						{/if}
						{#if item.metadata.invalidate}
							<CardContentItem label="Razón de invalidación">
								{item.metadata.invalidateReason}
							</CardContentItem>
						{/if}
					</CardContent>
					<CardFooter class="text-body">
						<EvalucionEtapaIndicadorFooterActions
							{item}
							{onClickEditar}
							{onClickNoAplica}
							{onClickFinish}
							{onClickAceptar}
							{onClickRechazar}
						/>
					</CardFooter>
				</Card>
			{/each}
		</CardColumn>
	{:else}
		<EmptySection message="No hay elementos"></EmptySection>
	{/if}
</section>

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
