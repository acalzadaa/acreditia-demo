<script lang="ts">
	import type { InstitucionItem } from '$lib/schemas/institucion.schema';
	import CrearInstitucionForm from '$lib/components/institucion/CrearInstitucionForm.svelte';
	import EditarInstitucionForm from '$lib/components/institucion/EditarInstitucionForm.svelte';
	import { getEntidadLegalRef, getInstitucion } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import InstitucionList from '$lib/components/institucion/InstitucionList.svelte';

	let institucionItems = getInstitucion();
	let entidadLegalRef = getEntidadLegalRef();

	let modal = createModalManager<InstitucionItem>();
</script>

<InstitucionList
	items={institucionItems}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<!-- MODAL CREAR -->
<CrearInstitucionForm open={modal.isOpen('create')} refs={entidadLegalRef} onClose={modal.close} />

<!-- MODAL EDITAR -->
{#if modal.selectedItem}
	<EditarInstitucionForm
		{entidadLegalRef}
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
