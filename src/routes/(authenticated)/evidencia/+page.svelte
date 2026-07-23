<script lang="ts">
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import type { EvidenciaItem } from '$lib/schemas/evidencia.schema';
	import { getEvidencia } from '$lib/stores/data.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import EvidenciaList from '$lib/components/features/evidencia/EvidenciaList.svelte';
	import CrearEvidenciaForm from '$lib/components/features/evidencia/CrearEvidenciaForm.svelte';
	import EditarEvidenciaForm from '$lib/components/features/evidencia/EditarEvidenciaForm.svelte';

	let evidenciaItems = getEvidencia();
	let modal = createModalManager<EvidenciaItem>();
</script>

<EvidenciaList
	items={evidenciaItems}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<CrearEvidenciaForm open={modal.isOpen('create')} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarEvidenciaForm
		open={modal.isOpen('edit')}
		item={modal.selectedItem}
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
