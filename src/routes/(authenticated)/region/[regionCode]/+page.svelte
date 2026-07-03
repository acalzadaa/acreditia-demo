<script lang="ts">
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Region from '$lib/components/region/Region.svelte';
	import { getCampusRef, getPuestoRef, getRegion, getRegionCampus } from '$lib/stores/data.svelte';
	import { page } from '$app/state';

	import EditarRegionForm from '$lib/components/region/EditarRegionForm.svelte';
	import RestaurarRegionForm from '$lib/components/region/RestaurarRegionForm.svelte';
	import BorrarRegionForm from '$lib/components/region/BorrarRegionForm.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import EditarRegionCampusForm from '$lib/components/region/campus/EditarRegionCampusForm.svelte';
	import BorrarRegionCampusForm from '$lib/components/region/campus/BorrarRegionCampusForm.svelte';
	import RestaurarRegionCampusForm from '$lib/components/region/campus/RestaurarRegionCampusForm.svelte';
	import AddRegionCampusForm from '$lib/components/region/campus/AddRegionCampusForm.svelte';
	import type { RegionItem } from '$lib/schemas/region.schema';
	import RegionCampus from '$lib/components/region/campus/RegionCampus.svelte';
	import type { RegionCampusItem } from '$lib/schemas/regionCampus.schema';

	let regionCode = page.params.regionCode;
	let regionItems = getRegion().filter((item) => item.code === regionCode);
	let puestosRef = getPuestoRef('region');
	let regionCampusItems = getRegionCampus().filter(
		(item) => !regionItems.some((regionItem) => regionItem.id === item.regionId)
	);
	let campusRef = getCampusRef().filter(
		(item) => !regionCampusItems.some((campusItem) => campusItem?.id === item.id)
	);

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
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

	<Toolbar
		gridArea="campusToolbar"
		crearTitle="Agregar campus"
		onClickCrear={modalRegionCampus.handlers('create').onClick}
		onKeydownCrear={(e) => modalRegionCampus.handlers('create').onKeydown(e)}
	/>

	<main class="detail-content">
		<RegionCampus
			showHeader={true}
			title="Lista de campus asignados"
			{regionCampusItems}
			onClickEditar={modalRegionCampus.handlers('edit').onClickItem}
			onClickBorrar={modalRegionCampus.handlers('delete').onClickItem}
			onClickRestaurar={modalRegionCampus.handlers('restore').onClickItem}
		/>
	</main>
</div>

{#if modal.selectedItem}
	<!-- MODAL EDITAR -->
	<EditarRegionForm
		open={modal.isOpen('edit')}
		selectedItem={modal.selectedItem}
		refs={puestosRef}
		onClose={modal.close}
	/>

	<!-- MODAL BORRAR -->
	<BorrarRegionForm
		open={modal.isOpen('delete')}
		selectedItem={modal.selectedItem}
		onClose={modal.close}
	/>

	<!-- MODAL RESTAURAR -->
	<RestaurarRegionForm
		open={modal.isOpen('restore')}
		selectedItem={modal.selectedItem}
		onClose={modal.close}
	/>
{/if}

<AddRegionCampusForm
	open={modalRegionCampus.isOpen('create')}
	{campusRef}
	onClose={modalRegionCampus.close}
/>

{#if modalRegionCampus.selectedItem}
	<!-- MODAL EDITAR -->
	<EditarRegionCampusForm
		open={modalRegionCampus.isOpen('edit')}
		selectedItem={modalRegionCampus.selectedItem}
		{campusRef}
		onClose={modalRegionCampus.close}
	/>

	<!-- MODAL BORRAR -->
	<BorrarRegionCampusForm
		open={modalRegionCampus.isOpen('delete')}
		selectedItem={modalRegionCampus.selectedItem}
		onClose={modalRegionCampus.close}
	/>

	<!-- MODAL RESTAURAR -->
	<RestaurarRegionCampusForm
		open={modalRegionCampus.isOpen('restore')}
		selectedItem={modalRegionCampus.selectedItem}
		onClose={modalRegionCampus.close}
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
