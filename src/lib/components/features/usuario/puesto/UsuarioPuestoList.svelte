<script lang="ts">
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';
	import type { UsuarioPuestoItem } from '$lib/schemas/usuarioPuesto.schema';
	import AccordionHeaderButton from '$lib/components/ui/accordion/AccordionHeaderButton.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		items: UsuarioPuestoItem[];
		isVisible: boolean;
		onClickToggle: () => void;
		onClickRemover: (item: UsuarioPuestoItem) => void;
		onClickAdd: () => void;
	}

	const { items, isVisible = false, onClickToggle, onClickRemover, onClickAdd }: Props = $props();
</script>

<main class="main-panel--inner">
	<section class="list-view--cards text-body">
		<AccordionColumn minWidth="360px" maxWidth="2700px">
			<Accordion>
				<AccordionHeaderButton onToggle={onClickToggle} {isVisible}>
					<Button variant="ghost" size="sm" name="add" onClick={onClickAdd}>Agregar puesto</Button>
				</AccordionHeaderButton>

				<AccordionContent isCollapsible={true} {isVisible}>
					{#each items as item (item)}
						<AccordionContentItem
							label={item.puesto.type}
							value={item.puesto.name}
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

<style>
	/* Por default (>= 1500px) gana la tabla; las cards quedan ocultas
	   y fuera del flujo para no pelear por el flex del panel. */
	.list-view--cards {
		display: none;
	}

	/* Ajustar el max-width dependiendo el contenido! */
	@media (max-width: 2700px) {
		.list-view--cards {
			display: grid;
			flex: 1;
			min-height: 0;
		}
	}
</style>
