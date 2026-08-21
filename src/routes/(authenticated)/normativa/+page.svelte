<script lang="ts">
	import type { NormativaItem } from '$lib/schemas/normativa.schema';
	import { getNormativa } from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import NormativaList from '$lib/components/features/normativa/NormativaList.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import EditarNormativaForm from '$lib/components/features/normativa/EditarNormativaForm.svelte';
	import CrearNormativaForm from '$lib/components/features/normativa/CrearNormativaForm.svelte';

	let normativaItems = getNormativa();
	let modal = createModalManager<NormativaItem>();
</script>

<NormativaList
	items={normativaItems}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<CrearNormativaForm open={modal.isOpen('create')} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarNormativaForm
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
