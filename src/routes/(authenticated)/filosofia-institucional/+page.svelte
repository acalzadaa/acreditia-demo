<script lang="ts">
	import CrearFilosofiaInstitucional from '$lib/components/filosofia-institucional/CrearFilosofiaInstitucionalForm.svelte';
	import { type FilosofiaInstitucionalItem } from '$lib/schemas/filosofiaInstitucional.schema';
	import EditarFilosofiaInstitucionalForm from '$lib/components/filosofia-institucional/EditarFilosofiaInstitucionalForm.svelte';
	import { getFilosofia } from '$lib/stores/data.svelte';
	import FilosofiaInstitucionalList from '$lib/components/filosofia-institucional/FilosofiaInstitucionalList.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';

	let filosofiaInstitucionalItems = getFilosofia().filter((item) => item.isCurrent);

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let modal = createModalManager<FilosofiaInstitucionalItem>();
</script>

<FilosofiaInstitucionalList
	items={filosofiaInstitucionalItems}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<CrearFilosofiaInstitucional open={modal.isOpen('create')} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarFilosofiaInstitucionalForm
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
