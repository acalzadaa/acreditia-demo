<script lang="ts">
	import type { InstitucionItem } from '$lib/schemas/institucion.schema';
	import { getEntidadLegalRef, getInstitucion } from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import InstitucionList from '$lib/components/features/institucion/InstitucionList.svelte';
	import EditarInstitucionForm from '$lib/components/features/institucion/EditarInstitucionForm.svelte';
	import CrearInstitucionForm from '$lib/components/features/institucion/CrearInstitucionForm.svelte';

	let items = getInstitucion();
	let entidadLegalRef = getEntidadLegalRef();

	let modal = createModalManager<InstitucionItem>();
</script>

<div class="detail-panel">
	<InstitucionList
		{items}
		onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
		onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
		onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
		onClickCrear={modal.handlers('create').onClick}
		onClickExport={modal.handlers('export').onClick}
		onClickFilter={modal.handlers('filter').onClick}
	/>
</div>
<CrearInstitucionForm open={modal.isOpen('create')} {entidadLegalRef} onClose={modal.close} />

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
