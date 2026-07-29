<script lang="ts">
	import { page } from '$app/state';
	import AddIndicadorAreaResponsable from '$lib/components/indicador/area-responsable/AddIndicadorAreaResponsable.svelte';
	import IndicadorAreaResponsableNestedList from '$lib/components/indicador/area-responsable/IndicadorAreaResponsableNestedList.svelte';
	import AddIndicadorUnidadAcademica from '$lib/components/indicador/area-responsable/unidad-academica/AddIndicadorUnidadAcademica.svelte';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import ConfirmRemoveModalParentChild from '$lib/components/ui/confirm/ConfirmRemoveModalParentChild.svelte';
	import type { IndicadorAreaResponsableItem } from '$lib/schemas/indicadorAreaResponsable';
	import type { IdentifyParentChildItemSchema } from '$lib/schemas/shared.schema';
	import {
		getAreaResponsableRef,
		getIndicadorAreaResponsable,
		getUnidadAcademicaRef
	} from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let areaResponsableItems = getIndicadorAreaResponsable().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let areaResponsableRef = getAreaResponsableRef();
	let modalChild = createModalManager<IdentifyParentChildItemSchema>();
	let modal = createModalManager<IndicadorAreaResponsableItem>();

	let unidadAcademicaRef = getUnidadAcademicaRef();
</script>

<main>
	<IndicadorAreaResponsableNestedList
		onClickRemover={modal.handlers('remove').onClickItem}
		onClickRemoverChild={modalChild.handlers('remove').onClickItem}
		onClickAdd={modal.handlers('add').onClick}
		onClickAddChild={modalChild.handlers('add').onClickItem}
		items={areaResponsableItems}
	/>
</main>

<!-- MODAL CREAR -->
<AddIndicadorAreaResponsable
	open={modal.isOpen('add')}
	{areaResponsableRef}
	onClose={modal.close}
/>

<AddIndicadorUnidadAcademica
	open={modalChild.isOpen('add')}
	{unidadAcademicaRef}
	onClose={modalChild.close}
/>

{#if modal.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modal.isOpen('remove')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>
{/if}

{#if modalChild.selectedItem}
	<ConfirmRemoveModalParentChild
		demo={true}
		open={modalChild.isOpen('remove')}
		id={modalChild.selectedItem}
		onClose={modalChild.close}
	/>
{/if}
