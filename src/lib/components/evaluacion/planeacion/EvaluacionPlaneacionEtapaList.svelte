<script lang="ts">
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';
	import AccordionHeaderClickable from '$lib/components/ui/accordion/AccordionHeaderClickable.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { EvaluacionEtapaItem } from '$lib/schemas/evaluacionEtapa.schema';
	import { createToggleManager } from '$lib/utils/toogleManager.svelte';
	import {
		formatEtapaContentItem,
		formatEtapaDateRange,
		isEtapaDateRange,
		isEvalucionEtapaPlaneacionReady
	} from '../utils/EvaluacionEtapaUtils';

	interface Props {
		items: EvaluacionEtapaItem[];
		onEditCalendar: (item: EvaluacionEtapaItem) => void;
	}

	const { items, onEditCalendar }: Props = $props();

	// Un toggle independiente por cada item (accordion), en vez de un único
	// isVisible compartido por todos. `defaultOpen: true` mantiene el
	// comportamiento previo de mostrar los criterios expandidos de entrada.
	const accordions = createToggleManager({ defaultOpen: false, exclusive: true });
</script>

<section>
	<PageHeader title="Planeación de etapas de evaluación" subtitle="Seleccione una etapa" />
	{#if items && items.length > 0}
		<AccordionColumn minWidth="360px" maxWidth="2900px">
			{#each items as item (item.id)}
				<Accordion>
					<AccordionHeaderClickable
						id="acc-{item.id}"
						isVisible={!accordions.isOpen(item.id)}
						onToggle={() => accordions.toggle(item.id)}
					>
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
						{#if isEvalucionEtapaPlaneacionReady(item)}
							<Badge variant="success" icon="check">Completado</Badge>
						{:else}
							<Badge variant="warning" icon="close">Faltan fechas</Badge>
						{/if}
					</AccordionHeaderClickable>
					<AccordionContent isCollapsible={true} isVisible={accordions.isOpen(item.id)}>
						<AccordionContentItem label="Fecha de inicio">
							<Button onClick={() => onEditCalendar(item)} variant="text">
								{formatEtapaContentItem(item.fechaInicio)}
							</Button>
						</AccordionContentItem>
						<AccordionContentItem label="Fecha de final">
							<Button onClick={() => onEditCalendar(item)} variant="text">
								{formatEtapaContentItem(item.fechaFinal)}
							</Button>
						</AccordionContentItem>

						{#if item.periodoExtraordinario}
							<AccordionContentItem label="Fecha extraordinaria de inicio">
								<Button onClick={() => onEditCalendar(item)} variant="text">
									{formatEtapaContentItem(item.periodoExtraordinarioInicio)}
								</Button>
							</AccordionContentItem>

							<AccordionContentItem label="Fecha extraordinaria de final">
								<Button onClick={() => onEditCalendar(item)} variant="text">
									{formatEtapaContentItem(item.periodoExtraordinarioFinal)}
								</Button>
							</AccordionContentItem>
						{/if}
					</AccordionContent>
				</Accordion>
			{/each}
		</AccordionColumn>
	{/if}
</section>
