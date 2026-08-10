<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeaderCustom from '$lib/components/ui/card/CardHeaderCustom.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { EvaluacionEtapaIndicadorItemFor } from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import {
		convertEvaluacionEtapaIndicadorStatusToBadgeVariant
	} from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getSafeText } from '$lib/components/evaluacion/utils/EvaluacionUtils';
	import EvalucionEtapaIndicadorFooterActions from '../EvalucionEtapaIndicadorFooterActions.svelte';

	type MetaIndicadorItem = EvaluacionEtapaIndicadorItemFor<'meta'>;

	interface Props {
		items: MetaIndicadorItem[];
		onClickEditar: (item: MetaIndicadorItem) => void;
		onClickNoAplica: (item: MetaIndicadorItem) => void;
		onClickFinish: (item: MetaIndicadorItem) => void;
		onClickAceptar: (item: MetaIndicadorItem) => void;
		onClickRechazar: (item: MetaIndicadorItem) => void;
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
						<CardContentItem label="Meta">
							<Button onClick={() => onClickEditar(item)} variant="text">
								{getSafeText(item.metadata.target, 'Agrega la meta')}
							</Button>
						</CardContentItem>
						<CardContentItem label="Unidad de la meta">
							<Button onClick={() => onClickEditar(item)} variant="text">
								{getSafeText(item.metadata.targetUnit, 'Agrega la unidad de meta')}
							</Button>
						</CardContentItem>
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
