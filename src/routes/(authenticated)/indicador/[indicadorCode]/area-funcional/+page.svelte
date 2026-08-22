<script lang="ts">
	import { page } from '$app/state';
	import AddIndicadorAreaFuncional from '$lib/components/features/indicador/area-funcional/AddIndicadorAreaFuncionalPicker.svelte';
	import IndicadorAreaFuncionalNestedList from '$lib/components/features/indicador/area-funcional/IndicadorAreaFuncionalNestedList.svelte';
	import AddIndicadorSubareaFuncional from '$lib/components/features/indicador/area-funcional/subarea-funcional/AddIndicadorSubareaFuncional.svelte';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import ConfirmRemoveModalParentChild from '$lib/components/ui/confirm/ConfirmRemoveModalParentChild.svelte';
	import type { IndicadorAreaFuncionalItem } from '$lib/schemas/indicadorAreaFuncional';
	import type { IdentifyParentChildItemSchema } from '$lib/schemas/shared.schema';
	import { getAreaFuncionalRef, getIndicadorAreaFuncional } from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let areaFuncionalItems = getIndicadorAreaFuncional().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let subareaFuncionalRef = getAreaFuncionalRef();
	let modalChild = createModalManager<IdentifyParentChildItemSchema>();
	let modal = createModalManager<IndicadorAreaFuncionalItem>();
</script>

<IndicadorAreaFuncionalNestedList
	onClickRemover={modal.handlers('remove').onClickItem}
	onClickRemoverChild={modalChild.handlers('remove').onClickItem}
	onClickAdd={modal.handlers('add').onClick}
	onClickAddChild={modalChild.handlers('add').onClickItem}
	items={areaFuncionalItems}
/>

<AddIndicadorAreaFuncional open={modal.isOpen('add')} {subareaFuncionalRef} onClose={modal.close} />

<AddIndicadorSubareaFuncional
	open={modalChild.isOpen('add')}
	{subareaFuncionalRef}
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
