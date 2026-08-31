<script lang="ts">
	import { capitalizeText } from '$lib/components/common/utils/stringUtils';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import type { RemoverRubricaCriterioItem } from '$lib/schemas/rubricaCriterio.schema';
	import { createToggleManager } from '$lib/components/common/stores/toogleManager.svelte';
	import AccordionHeaderClickable from '$lib/components/ui/accordion/AccordionHeaderClickable.svelte';
	import AccordionFooter from '$lib/components/ui/accordion/AccordionFooter.svelte';
	interface Props {
		items: RubricaItem[];
		onClickAdd: (item: RubricaItem) => void;
		onClickRemover: (item: RemoverRubricaCriterioItem) => void;
	}

	const { items, onClickAdd, onClickRemover }: Props = $props();

	// Un toggle independiente por cada item (accordion), en vez de un único
	// isVisible compartido por todos. `defaultOpen: true` mantiene el
	// comportamiento previo de mostrar los criterios expandidos de entrada.
	const accordions = createToggleManager({ defaultOpen: false, exclusive: true });
</script>

<section class="main-panel--inline">
	{#if items && items.length > 0}
		<AccordionColumn minWidth="360px" maxWidth="2500px">
			{#each items as item (item.id)}
				<Accordion>
					<AccordionHeaderClickable
						id="acc-{item.id}"
						isVisible={accordions.isOpen(item.id)}
						onToggle={() => accordions.toggle(item.id)}
						showChevron={items.length > 0}
					>
						{#snippet title()}
							<p class="text-caption">Nivel {item.order}</p>
							<Tag variant="info">{capitalizeText(item.name)}</Tag>
						{/snippet}
					</AccordionHeaderClickable>

					<AccordionContent isCollapsible={true} isVisible={accordions.isOpen(item.id)}>
						{#each item['criterios'] as criterio (criterio.id)}
							<AccordionContentItem
								isVisible={accordions.isOpen(item.id)}
								value={criterio.criterio}
								onAction={() => onClickRemover({ id: item.id, criterioId: criterio.id })}
								actionIcon="remove"
								actionAriaLabel="remover elemento"
							/>
						{/each}
					</AccordionContent>
					<AccordionFooter class="text-body">
						<div style="display: flex; flex-direction: column; gap: 5px;">
							<p class="text-caption">Total de criterios: {item.criterios.length}</p>
							<Button variant="outline" size="sm" name="add" onClick={() => onClickAdd(item)}>
								Agregar criterio
							</Button>
						</div>
					</AccordionFooter>
				</Accordion>
			{/each}
		</AccordionColumn>
	{/if}
</section>
