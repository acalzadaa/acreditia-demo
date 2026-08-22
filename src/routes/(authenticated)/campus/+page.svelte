<script lang="ts">
	import { getCampus, getInstitucionRef } from '$lib/components/common/stores/data.svelte';
	import type { CampusItem } from '$lib/schemas/campus.schema';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import EditarCampusForm from '$lib/components/features/campus/EditarCampusForm.svelte';
	import CrearCampusForm from '$lib/components/features/campus/CrearCampusForm.svelte';
	import CampusList from '$lib/components/features/campus/CampusList.svelte';

	let campusItems = getCampus();
	let institucionRef = getInstitucionRef();
	let modal = createModalManager<CampusItem>();

</script>

<CampusList
	items={campusItems}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<!-- MODAL CREAR -->
<CrearCampusForm open={modal.isOpen('create')} {institucionRef} onClose={modal.close} />

{#if modal.selectedItem}
	<!-- MODAL EDITAR -->
	<EditarCampusForm
		{institucionRef}
		open={modal.isOpen('edit')}
		selectedItem={modal.selectedItem}
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
