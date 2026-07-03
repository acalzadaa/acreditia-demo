<script lang="ts">
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import RestaurarRegionForm from '$lib/components/region/RestaurarRegionForm.svelte';
	import BorrarRegionForm from '$lib/components/region/BorrarRegionForm.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import CrearRegionForm from '$lib/components/region/CrearRegionForm.svelte';
	import EditarRegionForm from '$lib/components/region/EditarRegionForm.svelte';
	import Region from '$lib/components/region/Region.svelte';
	import { getPuestoRef, getRegion } from '$lib/stores/data.svelte';
	import type { RegionWithRelationsItem } from '$lib/schemas/region.schema';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let regionItems = getRegion();
	let puestos = getPuestoRef('region');

	/* DETALLE */
	function onClickDetalle(item: RegionWithRelationsItem) {
		goto(resolve(`/region/${item.code}`));
	}

	function onKeydownDetalle(e: KeyboardEvent, item: RegionWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickDetalle(item);
		}
	}

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR + MODALS =====
	let modal = createModalManager<RegionWithRelationsItem>();
</script>

<div class="detail-panel">
	<Toolbar
		crearTitle="Nueva region"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={true}
		showFilter={true}
	/>
	<main class="detail-content">
		<Region
			{regionItems}
			onClickEditar={modal.handlers('edit').onClickItem}
			onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
			onClickBorrar={modal.handlers('delete').onClickItem}
			onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
			onClickRestaurar={modal.handlers('restore').onClickItem}
			onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
			onClickDetalle={(item: RegionWithRelationsItem) => onClickDetalle(item)}
			onKeydownDetalle={(e: KeyboardEvent, item: RegionWithRelationsItem) =>
				onKeydownDetalle(e, item)}
		/>
	</main>

	<!-- MODAL CREAR -->
	<CrearRegionForm open={modal.isOpen('create')} refs={puestos} onClose={modal.close} />

	<!-- MODAL EDITAR -->
	{#if modal.selectedItem}
		<EditarRegionForm
			open={modal.isOpen('edit')}
			selectedItem={modal.selectedItem}
			refs={puestos}
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
</div>

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
