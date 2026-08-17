<script lang="ts">
	import { capitalizeText } from '$lib/components/common/utils/stringUtils';
	import {
		appendScoreAndName,
		selectAutoevaluacionRevisionButtonConfig,

		showRubricaListSection

	} from '$lib/components/evaluacion/utils/AutoevaluacionUtils';
	import {
		convertEvaluacionEtapaIndicadorStatusToBadgeVariant,
		isEvaluacionEtapaIndicadorActionDisabled
	} from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
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
	import { createToggleManager } from '$lib/utils/toogleManager.svelte';
	type EvaluacionRevisionIndicadorItem = EvaluacionEtapaIndicadorItemFor<'autoevaluacion-revision'>;

	interface Props {
		items: EvaluacionRevisionIndicadorItem[];
		rubricaItems: RubricaItem[];
		onClickSeleccionar: (item: EvaluacionRevisionIndicadorItem) => void;
		onClickConfirm: (item: EvaluacionRevisionIndicadorItem) => void;
		onClickFeedback: (item: EvaluacionRevisionIndicadorItem) => void;
	}

	const { items, rubricaItems, onClickSeleccionar, onClickConfirm, onClickFeedback }: Props =
		$props();

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
						<AccordionContentItem
							dot={false}
							label="Unidad académica"
							value={capitalizeText(item.unidadAcademica.name)}
						/>
						<AccordionContentItem
							dot={false}
							label="Autoevaluación"
							value={capitalizeText(item.metadata.originalName)}
						/>

						<AccordionContentItem
							dot={false}
							label="Autoevaluación revisada"
							value={getSafeText(
								capitalizeText(item.metadata.name),
								'Confirmar o seleccionar un nuevo nivel de desempeño'
							)}
						/>

						{#if item.metadata.comment}
							<AccordionContentItem
								dot={false}
								label="Comentario"
								value={capitalizeText(item.metadata.comment)}
							/>
						{/if}

						{#if item.metadata.feedback}
							<AccordionContentItem
								dot={false}
								label="Retroalimentacion"
								value={capitalizeText(item.metadata.feedback)}
							/>
						{/if}

						{#if item.metadata.invalidate}
							<AccordionContentItem
								dot={false}
								label="Razón de invalidación"
								value={item.metadata.invalidateReason}
							/>
						{/if}
					</AccordionContent>

					{#if showRubricaListSection(item)}
						<!-- Listado de rubricas 1 al 5 -->
						{#each rubricaItems as rubrica (rubrica.id)}
							<AccordionSection>
								<AccordionHeaderClickable
									id="acc-{rubrica.id}"
									isVisible={accordions.isOpen(rubrica.id)}
									onToggle={() => accordions.toggle(rubrica.id)}
								>
									{#snippet title()}
										<p class="text-caption">Nivel {rubrica.order}</p>
										<Tag class="text-h6" variant="info">{capitalizeText(rubrica.name)}</Tag>
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
										isDisabled={selectAutoevaluacionRevisionButtonConfig(rubrica, item).isDisabled}
										onClick={() =>
											onClickSeleccionar(
												appendScoreAndName(item, rubrica.rangeStart, rubrica.name)
											)}
										variant="outline"
										name={selectAutoevaluacionRevisionButtonConfig(rubrica, item).icon}
										>{selectAutoevaluacionRevisionButtonConfig(rubrica, item).label}</Button
									>
								</AccordionFooter>
							</AccordionSection>
						{/each}
					{/if}

					<AccordionFooter class="accordion-footer">
						<Button
							variant="outline"
							isDisabled={isEvaluacionEtapaIndicadorActionDisabled(item.status, 'upload').disabled}
							name="upload"
							onClick={() => onClickConfirm(item)}>Confirmar</Button
						>
						<Button
							variant="outline"
							isDisabled={isEvaluacionEtapaIndicadorActionDisabled(item.status, 'edit_feedback')
								.disabled}
							name="feedback"
							onClick={() => onClickFeedback(item)}>Retroalimentar</Button
						>
					</AccordionFooter>
				</Accordion>
			</AccordionColumn>
		{/each}
	</section>
</main>
