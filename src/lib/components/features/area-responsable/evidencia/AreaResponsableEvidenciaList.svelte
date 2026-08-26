<script lang="ts">
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import AccordionHeaderButton from '$lib/components/ui/accordion/AccordionHeaderButton.svelte';
	import { createToggle } from '$lib/components/common/stores/toggle.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { AreaResponsableTotalPuestosItem } from '$lib/schemas/areaResponsable.schema';
	import type { AreaResponsableEvidenciaItem } from '$lib/schemas/areaResponsableEvidencia.schema';

	interface Props {
		items: AreaResponsableEvidenciaItem[];
		totales: AreaResponsableTotalPuestosItem;
		onClickRemover: (item: AreaResponsableEvidenciaItem) => void;
		onClickAdd: () => void;
	}

	const { items, totales, onClickRemover, onClickAdd }: Props = $props();
	let toggle = createToggle();
</script>

<main class="main-panel-inner">
	<section class="list-view--cards text-body">
		<AccordionColumn minWidth="360px" maxWidth="4500px">
			<Accordion>
				<AccordionHeaderButton
					id="acc-1"
					isVisible={toggle.value}
					onToggle={toggle.onClick}
					enableAccordion={items.length > 0}
				>
					{#snippet subtitle()}
					<p>test</p>
						{#if totales.operativo > 0 || items.length == 0}
							<Tag variant="warning">Falta agregar una evidencia</Tag>
						{:else if items.length > 0}
							<Tag variant="success">Total de evidencias: {items.length}</Tag>
						{/if}
					{/snippet}
					<Button variant="ghost" size="sm" name="add" onClick={onClickAdd}>
						Agregar evidencia
					</Button>
				</AccordionHeaderButton>

				<AccordionContent isCollapsible={true} isVisible={toggle.value}>
					{#each items as item (item)}
						<AccordionContentItem
							isVisible={toggle.value}
							label={item.evidencia?.code}
							value={item.evidencia?.name}
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
