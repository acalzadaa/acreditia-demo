<script lang="ts">
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import { formatDate } from '$lib/helpers/dates';
	import type { EvaluacionEtapaItem } from '$lib/schemas/evaluacionEtapa.schema';
	import { createToggleManager } from '$lib/utils/toogleManager.svelte';
	import PageHeader from '../common/PageHeader.svelte';
	import AccordionContent from '../ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '../ui/accordion/AccordionContentItem.svelte';
	import AccordionHeaderClickable from '../ui/accordion/AccordionHeaderClickable.svelte';
	import Badge from '../ui/Badge.svelte';
	import Tag from '../ui/Tag.svelte';
	import { formatEtapaDateRange, isEtapaDateRange } from './utils/EvaluacionEtapaUtils';

	interface Props {
		items: EvaluacionEtapaItem[];
		onEditCalendar: ()=> void;
	}

	const { items, onEditCalendar }: Props = $props();

	// Un toggle independiente por cada item (accordion), en vez de un único
	// isVisible compartido por todos. `defaultOpen: true` mantiene el
	// comportamiento previo de mostrar los criterios expandidos de entrada.
	const accordions = createToggleManager({ defaultOpen: false, exclusive: true });
</script>

<section>
	<PageHeader title="Planeacion de etapas de evaluacion" />
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
								<p>{formatEtapaDateRange(item.fechaInicio, item.fechaFinal)}</p>
							{/if}
						{/snippet}
						{#if item.status === 'ready'}
							<Badge variant="success" icon="check">Completado</Badge>
						{/if}
					</AccordionHeaderClickable>
					<AccordionContent isCollapsible={true} isVisible={accordions.isOpen(item.id)}>
						<AccordionContentItem label="Fecha de inicio" value={formatDate(item.fechaInicio)} onAction={onEditCalendar} actionIcon='calendar'/>
						<AccordionContentItem label="Fecha de final" value={formatDate(item.fechaFinal)} />
						{#if item.periodoExtraordinario}
							<AccordionContentItem
								label="Fecha extraordinaria de inicio"
								value={formatDate(item.periodoExtraordinarioInicio)}
							/>
							<AccordionContentItem
								label="Fecha extraordinaria de final"
								value={formatDate(item.periodoExtraordinarioFinal)}
							/>
						{/if}
					</AccordionContent>
				</Accordion>
			{/each}
		</AccordionColumn>
	{/if}
</section>
