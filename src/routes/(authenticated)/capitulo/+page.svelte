<script lang="ts">
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import { getCapitulo, getModeloRef } from '$lib/components/common/stores/data.svelte';
	import type { CapituloItem } from '$lib/schemas/capitulo.schema';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import CapituloList from '$lib/components/features/capitulo/CapituloList.svelte';
	import EditarCapituloForm from '$lib/components/features/capitulo/EditarCapituloForm.svelte';
	import CrearCapituloForm from '$lib/components/features/capitulo/CrearCapituloForm.svelte';

	let capituloItems = getCapitulo();
	let modeloRef = getModeloRef();
	let modal = createModalManager<CapituloItem>();
</script>

<CapituloList
	items={capituloItems}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<CrearCapituloForm open={modal.isOpen('create')} refs={modeloRef} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarCapituloForm
		open={modal.isOpen('edit')}
		item={modal.selectedItem}
		refs={modeloRef}
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
