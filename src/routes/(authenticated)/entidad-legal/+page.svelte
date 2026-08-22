<script lang="ts">
	import type { EntidadLegalItem } from '$lib/schemas/entidadLegal.schema';
	import { getEntidadLegal } from '$lib/components/common/stores/data.svelte';
	import EntidadLegalList from '$lib/components/features/entidad-legal/EntidadLegalList.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import CrearEntidadLegalForm from '$lib/components/features/entidad-legal/CrearEntidadLegalForm.svelte';
	import EditarEntidadLegalForm from '$lib/components/features/entidad-legal/EditarEntidadLegalForm.svelte';

	let entidadLegalItems = getEntidadLegal();
	let modal = createModalManager<EntidadLegalItem>();
</script>

<div class="detail-panel">
	<EntidadLegalList
		items={entidadLegalItems}
		onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
		onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
		onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
		onClickCrear={modal.handlers('create').onClick}
		onClickExport={modal.handlers('export').onClick}
		onClickFilter={modal.handlers('filter').onClick}
	/>
</div>
<CrearEntidadLegalForm open={modal.isOpen('create')} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarEntidadLegalForm
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
