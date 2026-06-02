<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import RestaurarRegionForm from '$lib/components/region/RestaurarRegionForm.svelte';
	import BorrarRegionForm from '$lib/components/region/BorrarRegionForm.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import CrearRegionForm from '$lib/components/region/CrearRegionForm.svelte';
	import EditarRegionForm from '$lib/components/region/EditarRegionForm.svelte';
	import Region from '$lib/components/region/Region.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { getPuestoRef, getRegion } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import type { RegionWithRelationItem } from '$lib/schemas/region.schema';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let regionItems = getRegion();
	let puestos = getPuestoRef('region');

	let navigationItems = $derived(page.data.navigationItems);

	let itemSeleccionado: RegionWithRelationItem | null = $state(null);

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
	let showCrearModal = $state(false);
	let showEditarModal = $state(false);
	let showBorrarModal = $state(false);
	let showRestaurarModal = $state(false);

	// ===== HANDLERS =====

	/* CREAR */

	function onClickCrear() {
		showCrearModal = true;
	}

	function onKeydownCrear(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onClickCrear();
		}
	}

	/* EDITAR */

	function onClickEditar(item: RegionWithRelationItem) {
		itemSeleccionado = item;
		showEditarModal = true;
	}

	function onKeydownEditar(e: KeyboardEvent, item: RegionWithRelationItem) {
		if (e.key === 'Enter') {
			onClickEditar(item);
		}
	}

	/* BORRAR */

	function onClickBorrar(item: RegionWithRelationItem) {
		itemSeleccionado = item;
		showBorrarModal = true;
	}

	function onKeydownBorrar(e: KeyboardEvent, item: RegionWithRelationItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurar(item: RegionWithRelationItem) {
		itemSeleccionado = item;
		showRestaurarModal = true;
	}

	function onKeydownRestaurar(e: KeyboardEvent, item: RegionWithRelationItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
		}
	}

	/* RESTAURAR */
	function onClickDetalle(item: RegionWithRelationItem) {
		goto(resolve(`/region/${item.code}`));
	}

	function onKeydownDetalle(e: KeyboardEvent, item: RegionWithRelationItem) {
		if (e.key === 'Enter') {
			onClickDetalle(item);
		}
	}

	function handleCerrar() {
		showCrearModal = false;
		showEditarModal = false;
		showBorrarModal = false;
		showRestaurarModal = false;
		itemSeleccionado = null;
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
	<Toolbar
		{onClickCrear}
		onKeydownCrear={(e) => onKeydownCrear(e)}
		showExport={true}
		showFilter={true}
	/>

	<Region
		{regionItems}
		onClickEditar={(item: RegionWithRelationItem) => onClickEditar(item)}
		onKeydownEditar={(e, item: RegionWithRelationItem) => onKeydownEditar(e, item)}
		onClickBorrar={(item: RegionWithRelationItem) => onClickBorrar(item)}
		onKeydownBorrar={(e, item: RegionWithRelationItem) => onKeydownBorrar(e, item)}
		onClickRestaurar={(item: RegionWithRelationItem) => onClickRestaurar(item)}
		onKeydownRestaurar={(e: KeyboardEvent, item: RegionWithRelationItem) =>
			onKeydownRestaurar(e, item)}
		onClickDetalle={(item: RegionWithRelationItem) => onClickDetalle(item)}
		onKeydownDetalle={(e: KeyboardEvent, item: RegionWithRelationItem) => onKeydownDetalle(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearRegionForm bind:open={showCrearModal} refs={puestos} onClose={handleCerrar} />

	<!-- MODAL EDITAR -->
	{#if showEditarModal && itemSeleccionado}
		<EditarRegionForm
			bind:open={showEditarModal}
			selectedItem={itemSeleccionado}
			refs={puestos}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL BORRAR -->
	{#if showBorrarModal && itemSeleccionado}
		<BorrarRegionForm
			bind:open={showBorrarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL RESTAURAR -->
	{#if showRestaurarModal && itemSeleccionado}
		<RestaurarRegionForm
			bind:open={showRestaurarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
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
			'navbar toolbar'
			'navbar main'
			'footer footer';
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto auto 1fr auto;
		height: 100vh;
		position: relative;
	}
</style>
