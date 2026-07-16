<script lang="ts">
	import type { AreaResponsableItem } from '$lib/schemas/areaResponsable.schema';

	import {
		getAreaResponsable,
		getAreaResponsableRef,
		getInstitucionRef
	} from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import AreaResponsableList from '$lib/components/features/area-responsable/AreaResponsableList.svelte';
	import CrearAreaResponsableForm from '$lib/components/features/area-responsable/CrearAreaResponsableForm.svelte';
	import EditarAreaResponsableForm from '$lib/components/features/area-responsable/EditarAreaResponsableForm.svelte';

	let areaResponsableItems = getAreaResponsable();
	let areaResponsableRef = getAreaResponsableRef();
	let institucionRef = getInstitucionRef();

	let modal = createModalManager<AreaResponsableItem>();
</script>

<AreaResponsableList
	items={areaResponsableItems}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<CrearAreaResponsableForm
	open={modal.isOpen('create')}
	{areaResponsableRef}
	{institucionRef}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<EditarAreaResponsableForm
		open={modal.isOpen('edit')}
		selectedItem={modal.selectedItem}
		{areaResponsableRef}
		{institucionRef}
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
