<script lang="ts">
	import type { AreaFuncionalItem } from '$lib/schemas/areaFuncional.schema';
	import { getAreaFuncional, getAreaFuncionalRef } from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import AreaFuncionalList from '$lib/components/features/area-funcional/AreaFuncionalList.svelte';
	import CrearAreaFuncionalForm from '$lib/components/features/area-funcional/CrearAreaFuncionalForm.svelte';
	import EditarAreaFuncionalForm from '$lib/components/features/area-funcional/EditarAreaFuncionalForm.svelte';

	let areaFuncionalItems = getAreaFuncional();
	let areaFuncionalRef = getAreaFuncionalRef();
	let modal = createModalManager<AreaFuncionalItem>();
</script>

<AreaFuncionalList
	items={areaFuncionalItems}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<CrearAreaFuncionalForm
	open={modal.isOpen('create')}
	{areaFuncionalRef}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<EditarAreaFuncionalForm
		open={modal.isOpen('edit')}
		selectedItem={modal.selectedItem}
		{areaFuncionalRef}
		onClose={modal.close}
	/>

	<ConfirmDeleteModal
		demo={true}
		id={modal.selectedItem.id}
		open={modal.isOpen('delete')}
		onClose={modal.close}
	/>

	<ConfirmRestoreModal
		demo={true}
		id={modal.selectedItem.id}
		open={modal.isOpen('restore')}
		onClose={modal.close}
	/>
{/if}
