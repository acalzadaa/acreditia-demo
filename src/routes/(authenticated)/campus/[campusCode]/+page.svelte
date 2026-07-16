<script lang="ts">
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import type { CampusItem } from '$lib/schemas/campus.schema';
	import Campus from '$lib/components/campus/Campus.svelte';
	import EditarCampusForm from '$lib/components/campus/EditarCampusForm.svelte';
	import BorrarCampusForm from '$lib/components/campus/BorrarCampusForm.svelte';
	import RestaurarCampusForm from '$lib/components/campus/RestaurarCampusForm.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import AreaResponsable from '$lib/components/area-responsable/AreaResponsableList.svelte';
	import type { UnidadAcademicaItem } from '$lib/schemas/unidadAcademica.schema';
	import type { AreaResponsableItem } from '$lib/schemas/areaResponsable.schema';
	import EditarCampusUnidadAcademicaForm from '$lib/components/campus/unidad-academica/EditarCampusUnidadAcademicaForm.svelte';
	import BorrarCampusUnidadAcademicaForm from '$lib/components/campus/unidad-academica/BorrarCampusUnidadAcademicaForm.svelte';
	import RestaurarCampusUnidadAcademicaForm from '$lib/components/campus/unidad-academica/RestaurarCampusUnidadAcademicaForm.svelte';
	import EditarCampusAreaResponsableForm from '$lib/components/campus/area-responsable/EditarCampusAreaResponsableForm.svelte';
	import BorrarCampusAreaResponsableForm from '$lib/components/campus/area-responsable/BorrarCampusAreaResponsableForm.svelte';
	import RestaurarCampusAreaResponsableForm from '$lib/components/campus/area-responsable/RestaurarCampusAreaResponsableForm.svelte';
	import {
		getAreaResponsable,
		getAreaResponsableRef,
		getCampus,
		getCampusAreaResponsable,
		getCampusUnidadAcademica,
		getInstitucionRef,
		getUnidadAcademica,
		getUnidadAcademicaRef
	} from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import AddCampusAreaResponsableForm from '$lib/components/campus/area-responsable/AddCampusAreaResponsableForm.svelte';
	import AddCampusUnidadAcademicaForm from '$lib/components/campus/unidad-academica/AddCampusUnidadAcademicaForm.svelte';
	import CampusUnidadAcademica from '$lib/components/campus/unidad-academica/CampusUnidadAcademica.svelte';
	import CampusAreaResponsable from '$lib/components/campus/area-responsable/CampusAreaResponsable.svelte';

	let campusCode = page.params.campusCode;

	let campusItems = getCampus().filter((item) => item.code === campusCode);
	let campusUnidadAcademicaItems = getCampusUnidadAcademica()
		.filter((item) => item.campus.code === campusCode)
		.map((unidadAcademicaItem) => unidadAcademicaItem.unidadAcademica);
	let unidadAcademicaItems = getUnidadAcademica().filter((item) =>
		campusUnidadAcademicaItems.some((cua) => cua?.code === item.code)
	);

	let campusAreaResponsableItems = getCampusAreaResponsable()
		.filter((item) => item.campus.code === campusCode)
		.map((areaResponsableItem) => areaResponsableItem.areaResponsable);
	let areaResponsableItems = getAreaResponsable().filter((item) =>
		campusAreaResponsableItems.some((car) => car?.code === item.code)
	);

	let unidadAcademicaRef = getUnidadAcademicaRef();
	let areaResponsableRef = getAreaResponsableRef();
	let institucionRef = getInstitucionRef();

	/* LOGOUT */

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let modal = createModalManager<CampusItem>();
	let modalUnidadAcademica = createModalManager<UnidadAcademicaItem>();
	let modalAreaResponsable = createModalManager<AreaResponsableItem>();
</script>

<div class="detail-panel">
	<Campus
		gridArea="campus"
		{campusItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
	/>

	<main class="detail-content">
		<Toolbar
			gridArea="unidadAcademicaToolbar"
			crearTitle="Agregar unidad academica"
			onClickCrear={modalUnidadAcademica.handlers('add').onClick}
			onKeydownCrear={(e) => modalUnidadAcademica.handlers('add').onKeydown(e)}
			showExport={true}
			showFilter={true}
		/>

		<CampusUnidadAcademica
			gridArea="unidadAcademica"
			showHeader={true}
			title="Unidades academicas asignadas"
			{unidadAcademicaItems}
			onClickEditar={modalUnidadAcademica.handlers('edit').onClickItem}
			onKeydownEditar={(e, item) => modalUnidadAcademica.handlers('edit').onKeydownItem(e, item)}
			onClickBorrar={modalUnidadAcademica.handlers('delete').onClickItem}
			onKeydownBorrar={(e, item) => modalUnidadAcademica.handlers('delete').onKeydownItem(e, item)}
			onClickRestaurar={modalUnidadAcademica.handlers('restore').onClickItem}
			onKeydownRestaurar={(e, item) =>
				modalUnidadAcademica.handlers('restore').onKeydownItem(e, item)}
		/>
		<Toolbar
			gridArea="areaResponsableToolbar"
			crearTitle="Agregar area responsable"
			onClickCrear={modalAreaResponsable.handlers('add').onClick}
			onKeydownCrear={(e) => modalAreaResponsable.handlers('add').onKeydown(e)}
			showExport={true}
			showFilter={true}
		/>

		<CampusAreaResponsable
			showHeader={true}
			title="Areas reponsables asignadas"
			gridArea="areaResponsable"
			{areaResponsableItems}
			onClickEditar={modalAreaResponsable.handlers('edit').onClickItem}
			onKeydownEditar={(e, item) => modalAreaResponsable.handlers('edit').onKeydownItem(e, item)}
			onClickBorrar={modalAreaResponsable.handlers('delete').onClickItem}
			onKeydownBorrar={(e, item) => modalAreaResponsable.handlers('delete').onKeydownItem(e, item)}
			onClickRestaurar={modalAreaResponsable.handlers('restore').onClickItem}
			onKeydownRestaurar={(e, item) =>
				modalAreaResponsable.handlers('restore').onKeydownItem(e, item)}
		/>
	</main>

	{#if modal.selectedItem}
		<EditarCampusForm
			{institucionRef}
			open={modal.isOpen('edit')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<BorrarCampusForm
			open={modal.isOpen('delete')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<RestaurarCampusForm
			open={modal.isOpen('restore')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>
	{/if}

	<AddCampusUnidadAcademicaForm
		open={modalUnidadAcademica.isOpen('add')}
		{unidadAcademicaRef}
		onClose={modalUnidadAcademica.close}
	/>

	{#if modalUnidadAcademica.selectedItem}
		<EditarCampusUnidadAcademicaForm
			open={modalUnidadAcademica.isOpen('edit')}
			selectedItem={modalUnidadAcademica.selectedItem}
			{unidadAcademicaRef}
			onClose={modalUnidadAcademica.close}
		/>

		<BorrarCampusUnidadAcademicaForm
			open={modalUnidadAcademica.isOpen('delete')}
			selectedItem={modalUnidadAcademica.selectedItem}
			onClose={modalUnidadAcademica.close}
		/>

		<RestaurarCampusUnidadAcademicaForm
			open={modalUnidadAcademica.isOpen('restore')}
			selectedItem={modalUnidadAcademica.selectedItem}
			onClose={modalUnidadAcademica.close}
		/>
	{/if}

	<AddCampusAreaResponsableForm
		open={modalAreaResponsable.isOpen('add')}
		{areaResponsableRef}
		onClose={modalAreaResponsable.close}
	/>

	{#if modalAreaResponsable.selectedItem}
		<EditarCampusAreaResponsableForm
			open={modalAreaResponsable.isOpen('edit')}
			selectedItem={modalAreaResponsable.selectedItem}
			{areaResponsableRef}
			onClose={modalAreaResponsable.close}
		/>

		<BorrarCampusAreaResponsableForm
			open={modalAreaResponsable.isOpen('delete')}
			selectedItem={modalAreaResponsable.selectedItem}
			onClose={modalAreaResponsable.close}
		/>

		<RestaurarCampusAreaResponsableForm
			open={modalAreaResponsable.isOpen('restore')}
			selectedItem={modalAreaResponsable.selectedItem}
			onClose={modalAreaResponsable.close}
		/>
	{/if}
</div>

<style>
	.detail-panel {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		overflow-y: auto;
		position: sticky;
		top: 0;
	}

	.detail-content {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
	}
</style>
