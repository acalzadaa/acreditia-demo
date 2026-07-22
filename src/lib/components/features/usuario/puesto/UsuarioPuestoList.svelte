<script lang="ts">
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';
	import type { UsuarioPuestoItem } from '$lib/schemas/usuarioPuesto.schema';
	import AccordionFooter from '$lib/components/ui/accordion/AccordionFooter.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import AccordionHeader from '$lib/components/ui/accordion/AccordionHeader.svelte';

	interface Props {
		items: UsuarioPuestoItem[];
		isVisible: boolean;
		onClickRemover: (item: UsuarioPuestoItem) => void;
		onClickAdd: () => void;
		title?: string;
		subtitle?: string;
	}

	const {
		items,
		isVisible = false,
		onClickRemover,
		onClickAdd,
		title = 'Puestos asignados al usuario',
		subtitle
	}: Props = $props();
</script>

<main class="main-panel--inner">
	<section class="list-view--cards">
		<AccordionColumn minWidth="360px" maxWidth="2700px">
			<Accordion>
				<AccordionHeader {title} {subtitle} />

				<AccordionContent {isVisible}>
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

				<AccordionFooter>
					<IconButton name="add" variant="ghost" onClick={onClickAdd} />
				</AccordionFooter>
			</Accordion>
		</AccordionColumn>
	</section>
</main>

<style>
	/* Por default (>= 1500px) gana la tabla; las cards quedan ocultas
	   y fuera del flujo para no pelear por el flex del panel. */
	.list-view--table {
		display: contents;
	}

	.list-view--cards {
		display: none;
	}

	/* Ajustar el max-width dependiendo el contenido! */
	@media (max-width: 2700px) {
		.list-view--table {
			display: none;
		}

		.list-view--cards {
			display: grid;
			flex: 1;
			min-height: 0;
		}
	}
</style>
