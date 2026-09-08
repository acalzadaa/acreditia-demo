<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import type { IndicadorIndicadorEstrategicoItem } from '$lib/schemas/indicadorIndicadorEstrategico.schema';
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionHeaderButton from '$lib/components/ui/accordion/AccordionHeaderButton.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';

	interface Props {
		items: IndicadorIndicadorEstrategicoItem[];
		isVisible: boolean;
		onClickToggle: () => void;
		onClickRemover: (item: IndicadorIndicadorEstrategicoItem) => void;
		onClickAdd: () => void;
	}

	const { items, isVisible = true, onClickToggle, onClickRemover, onClickAdd }: Props = $props();
</script>

<main class="main-panel--inline">
	<section class="list-view--cards text-body">
		{#if items}
			<AccordionColumn minWidth="360px" maxWidth="2500px">
				<Accordion>
					<AccordionHeaderButton id="acc-1" {isVisible} onToggle={() => onClickToggle()}>
						{#snippet subtitle()}
							<Tag>Total de indicadores estrategicos: {items.length}</Tag>
						{/snippet}
						<Button variant="ghost" size="sm" name="add" onClick={onClickAdd}>
							Agregar indicador estrategico
						</Button>
					</AccordionHeaderButton>

					<AccordionContent isCollapsible={true} {isVisible}>
						{#each items as item (item)}
							<AccordionContentItem
								label={item.indicadorEstrategico?.code}
								value={item.indicadorEstrategico?.name}
								onAction={() => onClickRemover(item)}
								actionIcon="remove"
								actionAriaLabel="remover elemento"
							/>
						{/each}
					</AccordionContent>
				</Accordion>
			</AccordionColumn>
		{:else}
			<EmptySection message="No hay elementos" />
		{/if}
	</section>
</main>

<style>
	.list-view--table {
		display: contents;
	}

	.list-view--cards {
		display: none;
	}

	/* Ajustar el max-width dependiendo el contenido! */
	@media (max-width: 900px) {
		.list-view--table {
			display: none;
		}

		.list-view--cards {
			display: flex;
			flex-direction: column;
			flex: 1;
			min-height: 0;
		}
	}
</style>
