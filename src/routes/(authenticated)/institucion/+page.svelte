<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBarContainer from '$lib/components/notification/NotificationBarContainer.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import type { InstitucionWithRelationsItem } from '$lib/schemas/institucion.schema';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import CrearInstitucionForm from '$lib/components/institucion/CrearInstitucionForm.svelte';
	import EditarInstitucionForm from '$lib/components/institucion/EditarInstitucionForm.svelte';
	import BorrarInstitucionForm from '$lib/components/institucion/BorrarInstitucionForm.svelte';
	import RestaurarInstitucionForm from '$lib/components/institucion/RestaurarInstitucionForm.svelte';
	import Institucion from '$lib/components/institucion/Institucion.svelte';
	import { getEntidadLegalRef, getInstitucion } from '$lib/stores/data.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { page } from '$app/state';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let institucionItems = getInstitucion();
	let entidadLegalRef = getEntidadLegalRef();
	let navigationItems = $derived(page.data.navigationItems);

	let itemSeleccionado: InstitucionWithRelationsItem | null = $state(null);

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

	function onClickEditar(item: InstitucionWithRelationsItem) {
		itemSeleccionado = item;
		showEditarModal = true;
	}

	function onKeydownEditar(e: KeyboardEvent, item: InstitucionWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickEditar(item);
		}
	}

	/* BORRAR */

	function onClickBorrar(item: InstitucionWithRelationsItem) {
		itemSeleccionado = item;
		showBorrarModal = true;
	}

	function onKeydownBorrar(e: KeyboardEvent, item: InstitucionWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurar(item: InstitucionWithRelationsItem) {
		itemSeleccionado = item;
		showRestaurarModal = true;
	}

	function onKeydownRestaurar(e: KeyboardEvent, item: InstitucionWithRelationsItem) {
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
	<NotificationBarContainer {showNotificationBar} />
	<Toolbar
		crearTitle="Nueva institucion"
		{onClickCrear}
		onKeydownCrear={(e) => onKeydownCrear(e)}
		showExport={true}
		showFilter={true}
	/>

	<Institucion
		{institucionItems}
		onClickEditar={(item: InstitucionWithRelationsItem) => onClickEditar(item)}
		onKeydownEditar={(e: KeyboardEvent, item: InstitucionWithRelationsItem) =>
			onKeydownEditar(e, item)}
		onClickBorrar={(item: InstitucionWithRelationsItem) => onClickBorrar(item)}
		onKeydownBorrar={(e: KeyboardEvent, item: InstitucionWithRelationsItem) =>
			onKeydownBorrar(e, item)}
		onClickRestaurar={(item: InstitucionWithRelationsItem) => onClickRestaurar(item)}
		onKeydownRestaurar={(e: KeyboardEvent, item: InstitucionWithRelationsItem) =>
			onKeydownRestaurar(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearInstitucionForm bind:open={showCrearModal} {entidadLegalRef} onClose={handleCerrar} />

	<!-- MODAL EDITAR -->
	{#if showEditarModal && itemSeleccionado}
		<EditarInstitucionForm
			{entidadLegalRef}
			bind:open={showEditarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL BORRAR -->
	{#if showBorrarModal && itemSeleccionado}
		<BorrarInstitucionForm
			bind:open={showBorrarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL RESTAURAR -->
	{#if showRestaurarModal && itemSeleccionado}
		<RestaurarInstitucionForm
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
