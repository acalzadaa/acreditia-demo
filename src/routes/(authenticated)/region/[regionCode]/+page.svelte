<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import Region from '$lib/components/region/Region.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { getCampusRef, getPuestoRef, getRegion, getRegionCampus } from '$lib/stores/data.svelte';
	import { page } from '$app/state';

	import Campus from '$lib/components/campus/Campus.svelte';
	import EditarRegionForm from '$lib/components/region/EditarRegionForm.svelte';
	import RestaurarRegionForm from '$lib/components/region/RestaurarRegionForm.svelte';
	import BorrarRegionForm from '$lib/components/region/BorrarRegionForm.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import EditarRegionCampusForm from '$lib/components/region/campus/EditarRegionCampusForm.svelte';
	import BorrarRegionCampusForm from '$lib/components/region/campus/BorrarRegionCampusForm.svelte';
	import RestaurarRegionCampusForm from '$lib/components/region/campus/RestaurarRegionCampusForm.svelte';
	import AddRegionCampusForm from '$lib/components/region/campus/AddRegionCampusForm.svelte';
	import type { CampusItem } from '$lib/schemas/campus.schema';
	import type { RegionWithRelationsItem } from '$lib/schemas/region.schema';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let regionCode = page.params.regionCode;
	let regionItems = getRegion().filter((item) => item.code === regionCode);
	let puestosRef = getPuestoRef('region');
	let campusItems = getRegionCampus()
		.filter((item) => !regionItems.some((regionItem) => regionItem.id === item.regionId))
		.map((item) => item.campus);
	let campusRef = getCampusRef().filter(
		(item) => !campusItems.some((campusItem) => campusItem?.id === item.id)
	);

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
	let modal = createModalManager<RegionWithRelationsItem>();
	let modalCampus = createModalManager<CampusItem>();
	let navigationToggle = createToggle(true);
	let notificationToggle = createToggle(false);
</script>

<div class="app-grid">
	<Header
		isLoggedIn={!!auth.user}
		{username}
		{onClickLogout}
		onKeydownLogout={(e) => onKeydownLogout(e)}
	/>
	<Subheader
		onClickNavigationBar={navigationToggle.onClick}
		onKeydownNavigationBar={(e) => navigationToggle.onKeydown(e)}
		onClickNotificationBar={navigationToggle.onClick}
		onKeydownNotificationBar={(e) => navigationToggle.onKeydown(e)}
		showNavigationBar={navigationToggle.value}
		showNotificationBar={notificationToggle.value}
	/>
	<NavigationBar showNavigationBar={navigationToggle.value} {navigationItems} />
	<NotificationBar showNotificationBar={notificationToggle.value} />

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
		onClickCrear={modalCampus.handlers('create').onClick}
		onKeydownCrear={(e) => modalCampus.handlers('create').onKeydown(e)}
	/>

	<Campus
		gridArea="campus"
		showHeader={true}
		title="Lista de campus asignados"
		{campusItems}
		onClickEditar={modalCampus.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modalCampus.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modalCampus.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modalCampus.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modalCampus.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modalCampus.handlers('restore').onKeydownItem(e, item)}
	/>

	<Footer />

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
		open={modalCampus.isOpen('create')}
		{campusRef}
		onClose={modalCampus.close}
	/>

	{#if modalCampus.selectedItem}
		<!-- MODAL EDITAR -->
		<EditarRegionCampusForm
			open={modalCampus.isOpen('edit')}
			selectedItem={modalCampus.selectedItem}
			{campusRef}
			onClose={modalCampus.close}
		/>

		<!-- MODAL BORRAR -->
		<BorrarRegionCampusForm
			open={modalCampus.isOpen('delete')}
			selectedItem={modalCampus.selectedItem}
			onClose={modalCampus.close}
		/>

		<!-- MODAL RESTAURAR -->
		<RestaurarRegionCampusForm
			open={modalCampus.isOpen('restore')}
			selectedItem={modalCampus.selectedItem}
			onClose={modalCampus.close}
		/>
	{/if}
</div>

<style>
	.app-grid {
		display: grid;
		grid-template-areas:
			'header header'
			'subheader subheader'
			'navbar region'
			'navbar campusToolbar'
			'navbar campus'
			'footer footer';
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto auto auto 1fr auto;
		height: 100vh;
		position: relative;
	}
</style>
