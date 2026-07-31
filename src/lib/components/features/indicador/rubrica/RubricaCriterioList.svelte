<script lang="ts">
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';
	import AccordionHeaderButton from '$lib/components/ui/accordion/AccordionHeaderButton.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import type { RemoverRubricaCriterioItem } from '$lib/schemas/rubricaCriterio.schema';
	import { createToggleManager } from '$lib/utils/toogleManager.svelte';

	interface Props {
		items: RubricaItem[];
		onClickAdd: (item: RubricaItem) => void;
		onClickRemover: (item: RemoverRubricaCriterioItem) => void;
	}

	function calculateRubricaRange(item: RubricaItem) {
		return `${item.rangeStart} al ${item.rangeEnd}`;
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
					<AccordionHeaderButton
						id="acc-{item.id}"
						isVisible={!accordions.isOpen(item.id)}
						onToggle={() => accordions.toggle(item.id)}
					>
						{#snippet title()}
							<div style="display: flex; flex-direction: row;">
								<p style="text-transform: capitalize;">{item.name}</p>
								<Tag variant="info">{calculateRubricaRange(item)}</Tag>
							</div>
						{/snippet}
						<Button variant="ghost" size="sm" name="add" onClick={() => onClickAdd(item)}>
							Agregar criterio
						</Button>
					</AccordionHeaderButton>

					<AccordionContent isCollapsible={true} isVisible={accordions.isOpen(item.id)}>
						{#each item['criterios'] as criterio (criterio.id)}
							<AccordionContentItem
								label={criterio.code}
								value={criterio.criterio}
								onRemove={() => onClickRemover({ id: item.id, criterioId: criterio.id })}
								removeIcon="remove"
								removeAriaLabel="remover elemento"
							/>
						{/each}
					</AccordionContent>
				</Accordion>
			{/each}
		</AccordionColumn>
	{/if}
</section>
