<script lang="ts">
	import type { PlaneacionEstrategicaItem } from '$lib/schemas/planeacionEstrategica.schema';

	import { getFilosofia, getPlaneacion } from '$lib/stores/data.svelte';
	import CrearPlaneacionEstrategicaForm from '$lib/components/features/planeacion-estrategica/CrearPlaneacionEstrategicaForm.svelte';
	import EditarPlaneacionEstrategicaForm from '$lib/components/features/planeacion-estrategica/EditarPlaneacionEstrategicaForm.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import PlaneacionEstrategicaList from '$lib/components/features/planeacion-estrategica/PlaneacionEstrategicaList.svelte';

	let planeacionEstrategicaItems = getPlaneacion().filter((item) => item.isCurrent);
	let filosofias = getFilosofia().filter((item) => item.isCurrent && !item.isDeleted);
	let modal = createModalManager<PlaneacionEstrategicaItem>();
</script>

<main class="detail-panel">
	<PlaneacionEstrategicaList
		items={planeacionEstrategicaItems}
		onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
		onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
		onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
		onClickCrear={modal.handlers('create').onClick}
		onClickExport={modal.handlers('export').onClick}
		onClickFilter={modal.handlers('filter').onClick}
	/>
</main>

<CrearPlaneacionEstrategicaForm
	open={modal.isOpen('create')}
	refs={filosofias}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<EditarPlaneacionEstrategicaForm
		open={modal.isOpen('edit')}
		selectedItem={modal.selectedItem}
		refs={filosofias}
		onClose={modal.close}
	/>
	<ConfirmDeleteModal
		demo={true}
		open={modal.isOpen('delete')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>

	<ConfirmRestoreModal
		demo={true}
		open={modal.isOpen('restore')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>
{/if}
