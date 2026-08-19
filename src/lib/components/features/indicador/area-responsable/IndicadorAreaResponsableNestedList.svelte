<script lang="ts">
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import ToolbarV2 from '$lib/components/common/ToolbarV2.svelte';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';
	import AccordionHeaderButton from '$lib/components/ui/accordion/AccordionHeaderButton.svelte';
	import Actions from '$lib/components/ui/Actions.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { IndicadorAreaResponsableItem } from '$lib/schemas/indicadorAreaResponsable';
	import type { IdentifyParentChildItemSchema } from '$lib/schemas/shared.schema';
	import { createToggleManager } from '$lib/utils/toogleManager.svelte';

	interface Props {
		items: IndicadorAreaResponsableItem[];
		onClickRemover: (item: IndicadorAreaResponsableItem) => void;
		onClickRemoverChild: (item: IdentifyParentChildItemSchema) => void;
		onClickAdd: () => void;
		onClickAddChild: (item: IdentifyParentChildItemSchema) => void;
		title?: string;
		subtitle?: string;
	}

	const {
		items,
		onClickRemover,
		onClickRemoverChild,
		onClickAdd,
		onClickAddChild,
		title = 'Listado de áreas responsables',
		subtitle = ''
	}: Props = $props();

	// Un toggle independiente por cada item (accordion), en vez de un único
	// isVisible compartido por todos. `defaultOpen: true` mantiene el
	// comportamiento previo de mostrar los criterios expandidos de entrada.
	const accordions = createToggleManager({ defaultOpen: false, exclusive: true });
</script>

<section class="detail-panel">
	<PageHeader {title} {subtitle} />
	<ToolbarV2 actionTitle="Agregar area responsable" onClickCrear={onClickAdd} />
	{#if items && items.length > 0}
		<AccordionColumn minWidth="360px" maxWidth="2500px">
			{#each items as item (item.id)}
				<Accordion>
					<AccordionHeaderButton
						id="acc-{item.id}"
						isVisible={accordions.isOpen(item.id)}
						onToggle={() => accordions.toggle(item.id)}
					>
						{#snippet title()}
							<div style="display: flex; flex-direction: row; align-items: center;">
								<p style="text-transform: capitalize;">{item.areaResponsable.name}</p>
								<Tag variant="info">{item.areaResponsable.code}</Tag>
								<Actions
									{item}
									onClickRemove={() => onClickRemover(item)}
									isRemoveDisabled={item.isDeleted}
									showRemove={true}
								/>
							</div>
						{/snippet}
						<Button
							variant="ghost"
							size="sm"
							name="add"
							onClick={() => onClickAddChild({ parentId: item.areaResponsable.id })}
						>
							Agregar unidad academica
						</Button>
					</AccordionHeaderButton>

					<AccordionContent isCollapsible={true} isVisible={accordions.isOpen(item.id)}>
						{#each item['unidadesAcademicas'] as unidadAcademica (unidadAcademica.id)}
							<AccordionContentItem
								label={unidadAcademica.code}
								value={unidadAcademica.name}
								onAction={() =>
									onClickRemoverChild({ parentId: item.id, childId: unidadAcademica.id })}
								actionIcon="remove"
								actionAriaLabel="remover elemento"
							/>
						{/each}
					</AccordionContent>
				</Accordion>
			{/each}
		</AccordionColumn>
	{/if}
</section>
