<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import type { AreaFuncionalItem, AreaFuncionalWithRelationsItem } from '$lib/schemas/areaFuncional.schema';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import AreaFuncional from '$lib/components/area-funcional/AreaFuncional.svelte';
	import CrearAreaFuncionalForm from '$lib/components/area-funcional/CrearAreaFuncionalForm.svelte';
	import EditarAreaFuncionalForm from '$lib/components/area-funcional/EditarAreaFuncionalForm.svelte';
	import BorrarAreaFuncionalForm from '$lib/components/area-funcional/BorrarAreaFuncionalForm.svelte';
	import RestaurarAreaFuncionalForm from '$lib/components/area-funcional/RestaurarAreaFuncionalForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { getAreaFuncional, getPuestoRef } from '$lib/stores/data.svelte';
	import { page } from '$app/state';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let areaFuncionalItems = getAreaFuncional();
	let navigationItems = $derived(page.data.navigationItems);
	let puestos = getPuestoRef('funcional');

	let itemSeleccionado: AreaFuncionalWithRelationsItem | null = $state(null);

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

	function onClickEditar(item: AreaFuncionalWithRelationsItem) {
		itemSeleccionado = item;
		showEditarModal = true;
	}

	function onKeydownEditar(e: KeyboardEvent, item: AreaFuncionalWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickEditar(item);
		}
	}

	/* BORRAR */

	function onClickBorrar(item: AreaFuncionalWithRelationsItem) {
		itemSeleccionado = item;
		showBorrarModal = true;
	}

	function onKeydownBorrar(e: KeyboardEvent, item: AreaFuncionalWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurar(item: AreaFuncionalItem) {
		itemSeleccionado = item;
		showRestaurarModal = true;
	}

	function onKeydownRestaurar(e: KeyboardEvent, item: AreaFuncionalItem) {
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
	<AreaFuncional
		{areaFuncionalItems}
		onClickEditar={(item) => onClickEditar(item)}
		onKeydownEditar={(e, item) => onKeydownEditar(e, item)}
		onClickBorrar={(item) => onClickBorrar(item)}
		onKeydownBorrar={(e, item) => onKeydownBorrar(e, item)}
		onClickRestaurar={(item: AreaFuncionalItem) => onClickRestaurar(item)}
		onKeydownRestaurar={(e: KeyboardEvent, item: AreaFuncionalItem) => onKeydownRestaurar(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearAreaFuncionalForm bind:open={showCrearModal} refs={puestos} onClose={handleCerrar} />

	<!-- MODAL EDITAR -->
	{#if showEditarModal && itemSeleccionado}
		<EditarAreaFuncionalForm
			bind:open={showEditarModal}
			selectedItem={itemSeleccionado}
			refs={puestos}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL BORRAR -->
	{#if showBorrarModal && itemSeleccionado}
		<BorrarAreaFuncionalForm
			bind:open={showBorrarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL RESTAURAR -->
	{#if showRestaurarModal && itemSeleccionado}
		<RestaurarAreaFuncionalForm
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
