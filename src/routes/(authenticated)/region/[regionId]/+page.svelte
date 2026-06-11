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
	import { getCampus, getCampusRef, getPuestoRef, getRegion } from '$lib/stores/data.svelte';
	import { page } from '$app/state';

	import Campus from '$lib/components/campus/Campus.svelte';
	import type { CampusWithRelationsItem } from '$lib/schemas/campus.schema';
	import EditarRegionForm from '$lib/components/region/EditarRegionForm.svelte';
	import RestaurarRegionForm from '$lib/components/region/RestaurarRegionForm.svelte';
	import BorrarRegionForm from '$lib/components/region/BorrarRegionForm.svelte';
	import type { RegionWithRelationItem } from '$lib/schemas/region.schema';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let regionId = page.params.id;
	let regionItems = getRegion().filter((item) => item.code === regionId);
	let puestos = getPuestoRef('region');
	let campusItems = getCampus().filter((item) => item.region.code === regionId);
	let campusRef = getCampusRef();

	let navigationItems = $derived(page.data.navigationItems);

	let itemSeleccionadoRegion: RegionWithRelationItem | null = $state(null);

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
	let showNotificationBar = $state(false);
	let showNavigationBar = $state(true);

	function onClickNavigationBar() {
		showNavigationBar = !showNavigationBar;
	}

	function onKeydownNavigationBar(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onClickNavigationBar();
		}
	}

	function onClickNotificationBar() {
		showNotificationBar = !showNotificationBar;
	}

	function onKeydownNotificationBar(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onClickNotificationBar();
		}
	}

	// ===== ESTADOS DE MODALES =====

	let showEditarRegionModal = $state(false);
	let showBorrarRegionModal = $state(false);
	let showRestaurarRegionModal = $state(false);

	// ===== REGION HANDLERS =====

	/* EDITAR */

	function onClickEditarRegion(item: RegionWithRelationItem) {
		itemSeleccionadoRegion = item;
		showEditarRegionModal = true;
	}

	function onKeydownEditarRegion(e: KeyboardEvent, item: RegionWithRelationItem) {
		if (e.key === 'Enter') {
			onClickEditarRegion(item);
		}
	}

	/* BORRAR */

	function onClickBorrarRegion(item: RegionWithRelationItem) {
		itemSeleccionadoRegion = item;
		showBorrarRegionModal = true;
	}

	function onKeydownBorrarRegion(e: KeyboardEvent, item: RegionWithRelationItem) {
		if (e.key === 'Enter') {
			onClickBorrarRegion(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurarRegion(item: RegionWithRelationItem) {
		itemSeleccionadoRegion = item;
		showRestaurarRegionModal = true;
	}

	function onKeydownRestaurarRegion(e: KeyboardEvent, item: RegionWithRelationItem) {
		if (e.key === 'Enter') {
			onClickBorrarRegion(item);
		}
	}

	// ===== CAMPUS HANDLERS =====

	/* ADD */

	function onClickAddCampus() {}

	function onKeydownAddCampus(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onClickAddCampus();
		}
	}

	/* EDITAR */

	function onClickEditarCampus(item: CampusWithRelationsItem) {}

	function onKeydownEditarCampus(e: KeyboardEvent, item: CampusWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickEditarCampus(item);
		}
	}

	/* BORRAR */

	function onClickBorrarCampus(item: CampusWithRelationsItem) {}

	function onKeydownBorrarCampus(e: KeyboardEvent, item: CampusWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickBorrarCampus(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurarCampus(item: CampusWithRelationsItem) {}

	function onKeydownRestaurarCampus(e: KeyboardEvent, item: CampusWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickBorrarCampus(item);
		}
	}

	function handleCerrar() {
		showEditarRegionModal = false;
		showBorrarRegionModal = false;
		showRestaurarRegionModal = false;
		itemSeleccionadoRegion = null;
	}
</script>

<div class="app-grid">
	<Header
		isLoggedIn={!!auth.user}
		{username}
		{onClickLogout}
		onKeydownLogout={(e) => onKeydownLogout(e)}
	/>
	<Subheader
		{onClickNavigationBar}
		onKeydownNavigationBar={(e) => onKeydownNavigationBar(e)}
		{onClickNotificationBar}
		onKeydownNotificationBar={(e) => onKeydownNotificationBar(e)}
		{showNavigationBar}
		{showNotificationBar}
	/>
	<NavigationBar {showNavigationBar} {navigationItems} />
	<NotificationBar {showNotificationBar} />

	<Region
		gridArea="region"
		{regionItems}
		showHeader={true}
		title="Region"
		subtitle={id}
		showDetailIcon={false}
		onClickEditar={(item: RegionWithRelationItem) => onClickEditarRegion(item)}
		onKeydownEditar={(e, item: RegionWithRelationItem) => onKeydownEditarRegion(e, item)}
		onClickBorrar={(item: RegionWithRelationItem) => onClickBorrarRegion(item)}
		onKeydownBorrar={(e, item: RegionWithRelationItem) => onKeydownBorrarRegion(e, item)}
		onClickRestaurar={(item: RegionWithRelationItem) => onClickRestaurarRegion(item)}
		onKeydownRestaurar={(e: KeyboardEvent, item: RegionWithRelationItem) =>
			onKeydownRestaurarRegion(e, item)}
	></Region>

	<Campus
		gridArea="campus"
		showHeader={true}
		title="Lista de campus asignados"
		showActionButtons={false}
		{campusItems}
		onClickEditar={(item: CampusWithRelationsItem) => onClickEditarCampus(item)}
		onKeydownEditar={(e: KeyboardEvent, item: CampusWithRelationsItem) =>
			onKeydownEditarCampus(e, item)}
		onClickBorrar={(item: CampusWithRelationsItem) => onClickBorrarCampus(item)}
		onKeydownBorrar={(e: KeyboardEvent, item: CampusWithRelationsItem) =>
			onKeydownBorrarCampus(e, item)}
		onClickRestaurar={(item: CampusWithRelationsItem) => onClickRestaurarCampus(item)}
		onKeydownRestaurar={(e: KeyboardEvent, item: CampusWithRelationsItem) =>
			onKeydownRestaurarCampus(e, item)}
	/>

	<Footer />

	<!-- MODAL EDITAR REGION -->
	{#if showEditarRegionModal && itemSeleccionadoRegion}
		<EditarRegionForm
			bind:open={showEditarRegionModal}
			selectedItem={itemSeleccionadoRegion}
			refs={puestos}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL BORRAR REGION -->
	{#if showBorrarRegionModal && itemSeleccionadoRegion}
		<BorrarRegionForm
			bind:open={showBorrarRegionModal}
			selectedItem={itemSeleccionadoRegion}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL RESTAURAR REGION -->
	{#if showRestaurarRegionModal && itemSeleccionadoRegion}
		<RestaurarRegionForm
			bind:open={showRestaurarRegionModal}
			selectedItem={itemSeleccionadoRegion}
			onClose={handleCerrar}
		/>
	{/if}
</div>

<style>
	.app-grid {
		display: grid;
		grid-template-areas:
			'header header'
			'subheader subheader'
			'navbar main'
			'navbar toolbar'
			'navbar detail'
			'footer footer';
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto auto 1fr auto;
		height: 100vh;
		position: relative;
	}
</style>
