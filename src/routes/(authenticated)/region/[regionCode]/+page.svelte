<script lang="ts">
	import Region from '$lib/components/region/RegionList.svelte';
	import { getCampusRef, getPuestoRef, getRegion, getRegionCampus } from '$lib/stores/data.svelte';
	import { page } from '$app/state';

	import EditarRegionForm from '$lib/components/region/EditarRegionForm.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import AddRegionCampusForm from '$lib/components/region/campus/AddRegionCampusForm.svelte';
	import type { RegionItem } from '$lib/schemas/region.schema';
	import type { RegionCampusItem } from '$lib/schemas/regionCampus.schema';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import RegionCampusSublist from '$lib/components/region/campus/RegionCampusSublist.svelte';

	let regionCode = page.params.regionCode;
	let regionItems = getRegion().filter((item) => item.code === regionCode);
	let puestosRef = getPuestoRef('region');
	let regionCampusItems = getRegionCampus().filter(
		(item) => !regionItems.some((regionItem) => regionItem.id === item.regionId)
	);
	let campusRef = getCampusRef().filter(
		(item) => !regionCampusItems.some((campusItem) => campusItem?.id === item.id)
	);

	let modal = createModalManager<RegionItem>();
	let modalRegionCampus = createModalManager<RegionCampusItem>();
</script>

<div class="detail-panel">
	<Region
		gridArea="region"
		{regionItems}
		showHeader={true}
		title="Region"
		subtitle={regionCode}
		showDetailIcon={false}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
	></Region>

	<main class="detail-content">
		<RegionCampusSublist
			showHeader={true}
			title="Lista de campus asignados"
			items={regionCampusItems}
			onClickRemover={modalRegionCampus.handlers('remove').onClickItem}
			onClickAgregar={modalRegionCampus.handlers('add').onClick}
		/>
	</main>
</div>

{#if modal.selectedItem}
	<EditarRegionForm
		open={modal.isOpen('edit')}
		selectedItem={modal.selectedItem}
		refs={puestosRef}
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

<AddRegionCampusForm
	open={modalRegionCampus.isOpen('add')}
	{campusRef}
	onClose={modalRegionCampus.close}
/>

{#if modalRegionCampus.selectedItem}
	<ConfirmModal
		demo={true}
		message="¿Desea remover el registro?"
		title="Remover campus"
		buttonLabel="Remover"
		open={modalRegionCampus.isOpen('remove')}
		id={modalRegionCampus.selectedItem.id}
		onClose={modalRegionCampus.close}
		actionButtonVariant="critical"
	/>
{/if}

<style>
	.detail-panel {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}

	.detail-content {
		flex: 1;
		min-height: 0;
		overflow-y: hidden;
		display: flex;
		flex-direction: column;
	}
</style>
