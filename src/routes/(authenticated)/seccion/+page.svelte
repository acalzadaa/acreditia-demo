<script lang="ts">
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { getCapituloRef, getSeccion } from '$lib/stores/data.svelte';
	import type { SeccionItem } from '$lib/schemas/seccion.schema';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import EditarSeccionForm from '$lib/components/features/seccion/EditarSeccionForm.svelte';
	import CrearSeccionForm from '$lib/components/features/seccion/CrearSeccionForm.svelte';
	import SeccionList from '$lib/components/features/seccion/SeccionList.svelte';

	let seccionItems = getSeccion();
	let capituloRef = getCapituloRef();
	let modal = createModalManager<SeccionItem>();
</script>

<SeccionList
	items={seccionItems}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<!-- MODAL CREAR -->
<CrearSeccionForm open={modal.isOpen('create')} refs={capituloRef} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarSeccionForm
		open={modal.isOpen('edit')}
		item={modal.selectedItem}
		refs={capituloRef}
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
