<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import type { IndicadorNormativaItem } from '$lib/schemas/indicadorNormativa.schema';
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import AccordionHeaderButton from '$lib/components/ui/accordion/AccordionHeaderButton.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';

	interface Props {
		items: IndicadorNormativaItem[];
		isVisible: boolean;
		onClickToggle: () => void;
		onClickRemover: (item: IndicadorNormativaItem) => void;
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
							<Tag>Total de normativas: {items.length}</Tag>
						{/snippet}
						<Button variant="ghost" size="sm" name="add" onClick={onClickAdd}>
							Agregar normativa
						</Button>
					</AccordionHeaderButton>

					<AccordionContent isCollapsible={true} {isVisible}>
						{#each items as item (item)}
							<AccordionContentItem
								label={item.normativa?.code}
								value={item.normativa?.name}
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
