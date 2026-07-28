<script lang="ts">
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';
	import AccordionHeaderButton from '$lib/components/ui/accordion/AccordionHeaderButton.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import { createToggleManager } from '$lib/utils/toogleManager.svelte';

	interface Props {
		items: RubricaItem[];
		onClickAdd: () => void;
		onClickRemover: () => void;
	}

	function calculateRubricaRange(index: number) {
		return `${index * 2 + 1} al ${index * 2 + 2}`;
	}

	const { items, onClickAdd, onClickRemover }: Props = $props();

	// Un toggle independiente por cada item (accordion), en vez de un único
	// isVisible compartido por todos. `defaultOpen: true` mantiene el
	// comportamiento previo de mostrar los criterios expandidos de entrada.
	const accordions = createToggleManager({ defaultOpen: false });
</script>

<main class="main-panel--inner">
	{#if items && items.length > 0}
		<AccordionColumn minWidth="360px" maxWidth="2500px">
			{#each items as item, index (item.id)}
				<Accordion>
					<AccordionHeaderButton
						id="acc-{item.id}"
						isVisible={!accordions.isOpen(item.id)}
						onToggle={() => accordions.toggle(item.id)}
					>
						{#snippet title()}
							Rango <Tag variant="info">{calculateRubricaRange(index)}</Tag>
						{/snippet}
						<Button variant="ghost" size="sm" name="add" onClick={() => onClickAdd()}>
							Agregar criterio
						</Button>
					</AccordionHeaderButton>

					<AccordionContent isCollapsible={true} isVisible={accordions.isOpen(item.id)}>
						{#each item['criterios'] as criterio (criterio)}
							<AccordionContentItem
								label={criterio.code}
								value={criterio.criterio}
								onRemove={() => onClickRemover()}
								removeIcon="remove"
								removeAriaLabel="remover elemento"
							/>
						{/each}
					</AccordionContent>
				</Accordion>
			{/each}
		</AccordionColumn>
	{/if}
</main>
