<script lang="ts">
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import Campus from '$lib/components/campus/Campus.svelte';
	import CrearCampusForm from '$lib/components/campus/CrearCampusForm.svelte';
	import EditarCampusForm from '$lib/components/campus/EditarCampusForm.svelte';
	import BorrarCampusForm from '$lib/components/campus/BorrarCampusForm.svelte';
	import RestaurarCampusForm from '$lib/components/campus/RestaurarCampusForm.svelte';
	import { getCampus, getInstitucionRef } from '$lib/stores/data.svelte';
	import type { CampusItem } from '$lib/schemas/campus.schema';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let campusItems = getCampus();

	let institucionRef = getInstitucionRef();

	/* LOGOUT */

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let modal = createModalManager<CampusItem>();

	/* DETALLE */
	function onClickDetalle(item: CampusItem) {
		goto(resolve(`/campus/${item.code}`));
	}

	function onKeydownDetalle(e: KeyboardEvent, item: CampusItem) {
		if (e.key === 'Enter') {
			onClickDetalle(item);
		}
	}
</script>

<div class="app-grid">
	<Toolbar
		crearTitle="Nuevo campus"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={true}
		showFilter={true}
	/>

	<Campus
		{campusItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
		onClickDetalle={(item: CampusItem) => onClickDetalle(item)}
		onKeydownDetalle={(e: KeyboardEvent, item: CampusItem) => onKeydownDetalle(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearCampusForm open={modal.isOpen('create')} {institucionRef} onClose={modal.close} />

	{#if modal.selectedItem}
		<!-- MODAL EDITAR -->
		<EditarCampusForm
			{institucionRef}
			open={modal.isOpen('edit')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<!-- MODAL BORRAR -->
		<BorrarCampusForm
			open={modal.isOpen('delete')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<!-- MODAL RESTAURAR -->
		<RestaurarCampusForm
			open={modal.isOpen('restore')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>
	{/if}
</div>

<style>
	.app-grid {
		display: grid;
		grid-template-areas:
			'toolbar'
			'main';
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
		height: 100vh;
		position: relative;
		min-width: 600px;
	}
</style>
