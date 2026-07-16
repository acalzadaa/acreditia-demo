<script lang="ts">
	import type { PuestoItem } from '$lib/schemas/puesto.schema';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { getPuesto } from '$lib/stores/data.svelte';
	import PuestoList from '$lib/components/features/puesto-de-trabajo/PuestoList.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import EditarPuestoForm from '$lib/components/features/puesto-de-trabajo/EditarPuestoForm.svelte';
	import CrearPuestoForm from '$lib/components/features/puesto-de-trabajo/CrearPuestoForm.svelte';
	let puestoItems = getPuesto();
	let modal = createModalManager<PuestoItem>();
</script>

<PuestoList
	items={puestoItems}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<!-- MODAL CREAR -->
<CrearPuestoForm open={modal.isOpen('create')} onClose={modal.close} />

{#if modal.selectedItem}
	<!-- MODAL EDITAR -->
	<EditarPuestoForm
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
