<script lang="ts">
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';
	import type { UnidadAcademicaRef } from '$lib/schemas/shared.schema';
	import Button from '$lib/components/ui/Button.svelte';
	import AccordionHeaderButton from '$lib/components/ui/accordion/AccordionHeaderButton.svelte';

	interface Props {
		items: UnidadAcademicaRef[];
		isVisible: boolean;
		onClickToggle: () => void;
		onClickRemover: (item: UnidadAcademicaRef) => void;
		onClickAdd: () => void;
	}

	const { items, onClickToggle, isVisible = true, onClickRemover, onClickAdd }: Props = $props();
</script>

<main class="main-panel-inner">
	<section class="list-view--cards text-body">
		<AccordionColumn minWidth="360px" maxWidth="2500px">
			<Accordion>
				<AccordionHeaderButton id="acc-1" {isVisible} onToggle={() => onClickToggle()}>
					<Button variant="ghost" size="sm" name="add" onClick={onClickAdd}>
						Agregar unidad academica
					</Button>
				</AccordionHeaderButton>

				<AccordionContent isCollapsible={true} isVisible={!isVisible}>
					{#each items as item (item)}
						<AccordionContentItem
							label={item.code}
							value={item.name}
							onRemove={() => onClickRemover(item)}
							removeIcon="remove"
							removeAriaLabel="remover elemento"
						/>
					{/each}
				</AccordionContent>
			</Accordion>
		</AccordionColumn>
	</section>
</main>
