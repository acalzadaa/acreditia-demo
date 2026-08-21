<script lang="ts">
	import { getPuestoRef, getRegion } from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import type { RegionItem } from '$lib/schemas/region.schema';
	import RegionList from '$lib/components/features/region/RegionList.svelte';
	import CrearRegionForm from '$lib/components/features/region/CrearRegionForm.svelte';
	import EditarRegionForm from '$lib/components/features/region/EditarRegionForm.svelte';

	let regionItems = getRegion();
	let puestos = getPuestoRef('region');

	let modal = createModalManager<RegionItem>();
</script>

<div class="detail-panel">
	<RegionList
		items={regionItems}
		showHeader={true}
		title="Listado de regiones"
		onClickCrear={modal.handlers('create').onClick}
		onClickEditar={modal.handlers('edit').onClickItem}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onClickRestaurar={modal.handlers('restore').onClickItem}
	/>
</div>
<CrearRegionForm open={modal.isOpen('create')} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarRegionForm
		open={modal.isOpen('edit')}
		selectedItem={modal.selectedItem}
		refs={puestos}
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

<style>
	.detail-panel {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow-y: auto;
	}
</style>
