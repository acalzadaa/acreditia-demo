<script lang="ts">
	import { isRubricaRange } from '$lib/components/common/utils/rubricaUtils';
	import { capitalizeText } from '$lib/components/common/utils/stringUtils';
	import { convertEvaluacionEtapaIndicadorStatusToBadgeVariant } from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import { getSafeText } from '$lib/components/evaluacion/utils/EvaluacionUtils';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';
	import AccordionFooter from '$lib/components/ui/accordion/AccordionFooter.svelte';
	import AccordionHeader from '$lib/components/ui/accordion/AccordionHeader.svelte';
	import AccordionHeaderClickable from '$lib/components/ui/accordion/AccordionHeaderClickable.svelte';
	import AccordionSection from '$lib/components/ui/accordion/AccordionSection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { EvaluacionEtapaIndicadorItemFor } from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import type { IdentifyParentChildItemSchema } from '$lib/schemas/shared.schema';
	import { createToggleManager } from '$lib/utils/toogleManager.svelte';
	import EvalucionEtapaIndicadorFooterActions from '../EvalucionEtapaIndicadorFooterActions.svelte';
	type EvaluacionEjecucionIndicadorItem =
		EvaluacionEtapaIndicadorItemFor<'autoevaluacion-ejecucion'>;

	interface Props {
		items: EvaluacionEjecucionIndicadorItem[];
		rubricaItems: RubricaItem[];
		onClickSeleccionar: (item: IdentifyParentChildItemSchema) => void;
		onClickNoAplica: (item: EvaluacionEjecucionIndicadorItem) => void;
		onClickFinish: (item: EvaluacionEjecucionIndicadorItem) => void;
		onClickAceptar: (item: EvaluacionEjecucionIndicadorItem) => void;
		onClickRechazar: (item: EvaluacionEjecucionIndicadorItem) => void;
	}

	const {
		items,
		rubricaItems,
		onClickSeleccionar,
		onClickNoAplica,
		onClickFinish,
		onClickAceptar,
		onClickRechazar
	}: Props = $props();

	const accordions = createToggleManager({ defaultOpen: false, exclusive: true });
</script>

<main class="main-panel--inline">
	<section class="list-view--cards text-body">
		{#each items as item (item.id)}
			<AccordionColumn minWidth="360px" maxWidth="2500px">
				<Accordion>
					<!-- Datos de indicador -->
					<AccordionHeader>
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
					</AccordionHeader>
					<!-- Datos de rubrica seleccionada -->
					<AccordionContent isCollapsible={false}>
						<AccordionContentItem dot={false} label="Campus" value={item.campus.name} />

						<AccordionContentItem
							dot={false}
							label="Nivel de desempeño"
							value={getSafeText(
								capitalizeText(item.metadata.name),
								'Seleccionar un nivel de desempeño'
							)}
						/>

						{#if item.metadata.invalidate}
							<AccordionContentItem
								label="Razón de invalidación"
								value={item.metadata.invalidateReason}
							/>
						{/if}
					</AccordionContent>

					<!-- Listado de rubricas 1 al 5 -->
					{#each rubricaItems as rubrica (rubrica.id)}
						<AccordionSection>
							<AccordionHeaderClickable
								id="acc-{rubrica.id}"
								isVisible={accordions.isOpen(rubrica.id)}
								onToggle={() => accordions.toggle(rubrica.id)}
							>
								{#snippet title()}
									<Tag class="text-caption" variant="info">Nivel {rubrica.order}</Tag>
									<p>{capitalizeText(rubrica.name)}</p>
								{/snippet}
							</AccordionHeaderClickable>

							<AccordionContent isCollapsible={true} isVisible={accordions.isOpen(rubrica.id)}>
								{#each rubrica.criterios as criterio (criterio.id)}
									<AccordionContentItem
										isVisible={accordions.isOpen(rubrica.id)}
										value={criterio.criterio}
									/>
								{/each}
							</AccordionContent>
							<AccordionFooter>
								<Button
									isDisabled={isRubricaRange(rubrica, item.metadata.score ?? 0)}
									onClick={() => onClickSeleccionar({ parentId: item.id, childId: rubrica.id })}
									variant="outline">Seleccionar</Button
								>
							</AccordionFooter>
						</AccordionSection>
					{/each}

					<AccordionFooter class="accordion-footer">
						<EvalucionEtapaIndicadorFooterActions
							{item}
							{onClickNoAplica}
							{onClickFinish}
							{onClickAceptar}
							{onClickRechazar}
						/>
					</AccordionFooter>
				</Accordion>
			</AccordionColumn>
		{/each}
	</section>
</main>
