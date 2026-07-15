<script lang="ts">
	import CrearRegionForm from '$lib/components/region/CrearRegionForm.svelte';
	import EditarRegionForm from '$lib/components/region/EditarRegionForm.svelte';
	import { getPuestoRef, getRegion } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import type { RegionItem } from '$lib/schemas/region.schema';
	import RegionList from '$lib/components/region/RegionList.svelte';

	let regionItems = getRegion();
	let puestos = getPuestoRef('region');

	let modal = createModalManager<RegionItem>();
</script>

<div class="detail-panel">
	<RegionList
		items={regionItems}
		showHeader={true}
		title="Region"
		onClickCrear={modal.handlers('create').onClick}
		onClickEditar={modal.handlers('edit').onClickItem}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onClickRestaurar={modal.handlers('restore').onClickItem}
	/>
</div>
<CrearRegionForm open={modal.isOpen('create')} refs={puestos} onClose={modal.close} />

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
