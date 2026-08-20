<script lang="ts">
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import AccordionHeaderButton from '$lib/components/ui/accordion/AccordionHeaderButton.svelte';
	import type { AreaResponsablePuestoItem } from '$lib/schemas/areaResponsablePuesto.schema';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';

	interface Props {
		items: AreaResponsablePuestoItem[];
		onClickRemover: (item: AreaResponsablePuestoItem) => void;
		onClickAdd: () => void;
	}

	const { items, onClickRemover, onClickAdd }: Props = $props();
	let toggle = createToggle();
</script>

<main class="main-panel-inner">
	<section class="list-view--cards text-body">
		<AccordionColumn minWidth="360px" maxWidth="4500px">
			<Accordion>
				<AccordionHeaderButton id="acc-1" isVisible={toggle.value} onToggle={toggle.onClick}>
				{#snippet subtitle()}
				<Tag>Total de puestos: {items.length}</Tag>
				{/snippet}
					<Button variant="ghost" size="sm" name="add" onClick={onClickAdd}>Agregar puesto</Button>
					
				</AccordionHeaderButton>

				<AccordionContent isCollapsible={true} isVisible={toggle.value}>
					{#each items as item (item)}
						<AccordionContentItem
							isVisible={toggle.value}
							label={item.puesto?.type}
							value={item.puesto?.name}
							onAction={() => onClickRemover(item)}
							actionIcon="remove"
							actionAriaLabel="remover elemento"
						/>
					{/each}
				</AccordionContent>
			</Accordion>
		</AccordionColumn>
	</section>
</main>
