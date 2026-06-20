<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import type { CampusItem } from '$lib/schemas/campus.schema';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import Campus from '$lib/components/campus/Campus.svelte';
	import EditarCampusForm from '$lib/components/campus/EditarCampusForm.svelte';
	import BorrarCampusForm from '$lib/components/campus/BorrarCampusForm.svelte';
	import RestaurarCampusForm from '$lib/components/campus/RestaurarCampusForm.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import UnidadAcademica from '$lib/components/unidad-academica/UnidadAcademica.svelte';
	import AreaResponsable from '$lib/components/area-responsable/AreaResponsable.svelte';
	import type { UnidadAcademicaItem } from '$lib/schemas/unidadAcademica.schema';
	import type { AreaResponsableItem } from '$lib/schemas/areaResponsable.schema';
	import EditarCampusUnidadAcademicaForm from '$lib/components/campus/unidad-academica/EditarCampusUnidadAcademicaForm.svelte';
	import BorrarCampusUnidadAcademicaForm from '$lib/components/campus/unidad-academica/BorrarCampusUnidadAcademicaForm.svelte';
	import RestaurarCampusUnidadAcademicaForm from '$lib/components/campus/unidad-academica/RestaurarCampusUnidadAcademicaForm.svelte';
	import EditarCampusAreaResponsableForm from '$lib/components/campus/area-responsable/EditarCampusAreaResponsableForm.svelte';
	import BorrarCampusAreaResponsableForm from '$lib/components/campus/area-responsable/BorrarCampusAreaResponsableForm.svelte';
	import RestaurarCampusAreaResponsableForm from '$lib/components/campus/area-responsable/RestaurarCampusAreaResponsableForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
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

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
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
	let navigationItems = $derived(page.data.navigationItems);

	/* LOGOUT */
	async function onClickLogout() {
		auth.logout();
		goto(resolve('/login'), { replaceState: true });
	}

	function onKeydownLogout(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onClickLogout();
		}
	}

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let navigationToggle = createToggle(true);
	let notificationToggle = createToggle(false);
	let modal = createModalManager<CampusItem>();
	let modalUnidadAcademica = createModalManager<UnidadAcademicaItem>();
	let modalAreaResponsable = createModalManager<AreaResponsableItem>();
</script>

<div class="app-grid">
	<Header
		isLoggedIn={!!auth.user}
		{username}
		{onClickLogout}
		onKeydownLogout={(e) => onKeydownLogout(e)}
	/>
	<Subheader
		onClickNavigationBar={navigationToggle.onclick}
		onKeydownNavigationBar={(e) => navigationToggle.onkeydown(e)}
		onClickNotificationBar={navigationToggle.onclick}
		onKeydownNotificationBar={(e) => navigationToggle.onkeydown(e)}
		showNavigationBar={navigationToggle.value}
		showNotificationBar={notificationToggle.value}
	/>
	<NavigationBar showNavigationBar={navigationToggle.value} {navigationItems} />
	<NotificationBar showNotificationBar={notificationToggle.value} />

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

	<Toolbar
		gridArea="unidadAcademicaToolbar"
		crearTitle="Agregar unidad academica"
		onClickCrear={modalUnidadAcademica.handlers('add').onclick}
		onKeydownCrear={(e) => modalUnidadAcademica.handlers('add').onkeydown(e)}
		showExport={true}
		showFilter={true}
	/>

	<UnidadAcademica
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
		onClickCrear={modalAreaResponsable.handlers('add').onclick}
		onKeydownCrear={(e) => modalAreaResponsable.handlers('add').onkeydown(e)}
		showExport={true}
		showFilter={true}
	/>

	<AreaResponsable
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

	<Footer />
</div>

<style>
	.app-grid {
		display: grid;
		grid-template-areas:
			'header header'
			'subheader subheader'
			'navbar campus'
			'navbar unidadAcademicaToolbar'
			'navbar unidadAcademica'
			'navbar areaResponsableToolbar'
			'navbar areaResponsable'
			'footer footer';
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto auto auto 1fr auto 1fr auto;
		height: 100vh;
		position: relative;
	}
</style>
