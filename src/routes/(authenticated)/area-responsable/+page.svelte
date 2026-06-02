<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import type { AreaResponsableWithRelationsItem } from '$lib/schemas/areaResponsable.schema';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import AreaResponsable from '$lib/components/area-responsable/AreaResponsable.svelte';
	import CrearAreaResponsableForm from '$lib/components/area-responsable/CrearAreaResponsableForm.svelte';
	import EditarAreaResponsableForm from '$lib/components/area-responsable/EditarAreaResponsableForm.svelte';
	import BorrarAreaResponsableForm from '$lib/components/area-responsable/BorrarAreaResponsableForm.svelte';
	import RestaurarAreaResponsableForm from '$lib/components/area-responsable/RestaurarAreaResponsableForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { getAreaResponsable, getPuestoRef } from '$lib/stores/data.svelte';
	import { page } from '$app/state';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let areaResponsableItems = getAreaResponsable();
	let navigationItems = $derived(page.data.navigationItems);
	let puestos = getPuestoRef('responsable');

	let itemSeleccionado: AreaResponsableWithRelationsItem | null = $state(null);

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

	function onClickEditar(item: AreaResponsableWithRelationsItem) {
		itemSeleccionado = item;
		showEditarModal = true;
	}

	function onKeydownEditar(e: KeyboardEvent, item: AreaResponsableWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickEditar(item);
		}
	}

	/* BORRAR */

	function onClickBorrar(item: AreaResponsableWithRelationsItem) {
		itemSeleccionado = item;
		showBorrarModal = true;
	}

	function onKeydownBorrar(e: KeyboardEvent, item: AreaResponsableWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurar(item: AreaResponsableWithRelationsItem) {
		itemSeleccionado = item;
		showRestaurarModal = true;
	}

	function onKeydownRestaurar(e: KeyboardEvent, item: AreaResponsableWithRelationsItem) {
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
	<AreaResponsable
		{areaResponsableItems}
		onClickEditar={(item) => onClickEditar(item)}
		onKeydownEditar={(e, item) => onKeydownEditar(e, item)}
		onClickBorrar={(item) => onClickBorrar(item)}
		onKeydownBorrar={(e, item) => onKeydownBorrar(e, item)}
		onClickRestaurar={(item: AreaResponsableWithRelationsItem) => onClickRestaurar(item)}
		onKeydownRestaurar={(e: KeyboardEvent, item: AreaResponsableWithRelationsItem) =>
			onKeydownRestaurar(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearAreaResponsableForm
		bind:open={showCrearModal}
		refs={puestos}
		onClose={handleCerrar}
	/>

	<!-- MODAL EDITAR -->
	{#if showEditarModal && itemSeleccionado}
		<EditarAreaResponsableForm
			bind:open={showEditarModal}
			selectedItem={itemSeleccionado}
			refs={puestos}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL BORRAR -->
	{#if showBorrarModal && itemSeleccionado}
		<BorrarAreaResponsableForm
			bind:open={showBorrarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL RESTAURAR -->
	{#if showRestaurarModal && itemSeleccionado}
		<RestaurarAreaResponsableForm
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
