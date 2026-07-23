<script lang="ts">
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	import { getModelo } from '$lib/stores/data.svelte';

	import type { ModeloItem } from '$lib/schemas/modelo.schema';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import ModeloList from '$lib/components/features/modelo/ModeloList.svelte';
	import CrearModeloForm from '$lib/components/features/modelo/CrearModeloForm.svelte';
	import EditarModeloForm from '$lib/components/features/modelo/EditarModeloForm.svelte';

	let calidadModeloItems = getModelo();
	let modal = createModalManager<ModeloItem>();
</script>

<ModeloList
	items={calidadModeloItems}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<CrearModeloForm open={modal.isOpen('create')} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarModeloForm open={modal.isOpen('edit')} item={modal.selectedItem} onClose={modal.close} />

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
