<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import Campus from '$lib/components/campus/Campus.svelte';
	import CrearCampusForm from '$lib/components/campus/CrearCampusForm.svelte';
	import EditarCampusForm from '$lib/components/campus/EditarCampusForm.svelte';
	import BorrarCampusForm from '$lib/components/campus/BorrarCampusForm.svelte';
	import RestaurarCampusForm from '$lib/components/campus/RestaurarCampusForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { getCampus, getInstitucionRef } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import type { CampusWithRelationsItem } from '$lib/schemas/campus.schema';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let campusItems = getCampus();

	let instituciones = getInstitucionRef();
	let navigationItems = $derived(page.data.navigationItems);

	let itemSeleccionado: CampusWithRelationsItem | null = $state(null);

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

	function onClickEditar(item: CampusWithRelationsItem) {
		itemSeleccionado = item;
		showEditarModal = true;
	}

	function onKeydownEditar(e: KeyboardEvent, item: CampusWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickEditar(item);
		}
	}

	/* BORRAR */

	function onClickBorrar(item: CampusWithRelationsItem) {
		itemSeleccionado = item;
		showBorrarModal = true;
	}

	function onKeydownBorrar(e: KeyboardEvent, item: CampusWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurar(item: CampusWithRelationsItem) {
		itemSeleccionado = item;
		showRestaurarModal = true;
	}

	function onKeydownRestaurar(e: KeyboardEvent, item: CampusWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
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

	<Campus
		{campusItems}
		onClickEditar={(item: CampusWithRelationsItem) => onClickEditar(item)}
		onKeydownEditar={(e: KeyboardEvent, item: CampusWithRelationsItem) => onKeydownEditar(e, item)}
		onClickBorrar={(item: CampusWithRelationsItem) => onClickBorrar(item)}
		onKeydownBorrar={(e: KeyboardEvent, item: CampusWithRelationsItem) => onKeydownBorrar(e, item)}
		onClickRestaurar={(item: CampusWithRelationsItem) => onClickRestaurar(item)}
		onKeydownRestaurar={(e: KeyboardEvent, item: CampusWithRelationsItem) =>
			onKeydownRestaurar(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearCampusForm bind:open={showCrearModal} {instituciones} onClose={handleCerrar} />

	<!-- MODAL EDITAR -->
	{#if showEditarModal && itemSeleccionado}
		<EditarCampusForm
			{instituciones}
			bind:open={showEditarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL BORRAR -->
	{#if showBorrarModal && itemSeleccionado}
		<BorrarCampusForm
			bind:open={showBorrarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL RESTAURAR -->
	{#if showRestaurarModal && itemSeleccionado}
		<RestaurarCampusForm
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
