<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import type { PlaneacionEstrategicaWithFilosofiaItem } from '$lib/schemas/planeacionEstrategica.schema';
	
	import { goto } from '$app/navigation';
	import { getFilosofia, getPlaneacion } from '$lib/stores/data.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import PlaneacionEstrategica from '$lib/components/planeacion-estrategica/PlaneacionEstrategica.svelte';
	import CrearPlaneacionEstrategicaForm from '$lib/components/planeacion-estrategica/CrearPlaneacionEstrategicaForm.svelte';
	import EditarPlaneacionEstrategicaForm from '$lib/components/planeacion-estrategica/EditarPlaneacionEstrategicaForm.svelte';
	import BorrarPlaneacionEstrategicaForm from '$lib/components/planeacion-estrategica/BorrarPlaneacionEstrategicaForm.svelte';
	import RestaurarPlaneacionEstrategicaForm from '$lib/components/planeacion-estrategica/RestaurarPlaneacionEstrategicaForm.svelte';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let planeacionEstrategicaItems = getPlaneacion().filter((item) => item.isCurrent);
	let navigationItems = $derived(page.data.navigationItems);

	let filosofias = getFilosofia().filter((item) => item.isCurrent && !item.isDeleted);
	
	let itemSeleccionado: PlaneacionEstrategicaWithFilosofiaItem | null = $state(null);

	// ===== HEADER =====

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
	function onClickEditar(item: PlaneacionEstrategicaWithFilosofiaItem) {
		itemSeleccionado = item;
		showEditarModal = true;
	}

	function onKeydownEditar(e: KeyboardEvent, item: PlaneacionEstrategicaWithFilosofiaItem) {
		if (e.key === 'Enter') {
			onClickEditar(item);
		}
	}

	/* BORRAR */
	function onClickBorrar(item: PlaneacionEstrategicaWithFilosofiaItem) {
		itemSeleccionado = item;
		showBorrarModal = true;
	}

	function onKeydownBorrar(e: KeyboardEvent, item: PlaneacionEstrategicaWithFilosofiaItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurar(item: PlaneacionEstrategicaWithFilosofiaItem) {
		itemSeleccionado = item;
		showRestaurarModal = true;
	}

	function onKeydownRestaurar(e: KeyboardEvent, item: PlaneacionEstrategicaWithFilosofiaItem) {
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
	<PlaneacionEstrategica
		{planeacionEstrategicaItems}
		onClickEditar={(item: PlaneacionEstrategicaWithFilosofiaItem) => onClickEditar(item)}
		onKeydownEditar={(e: KeyboardEvent, item : PlaneacionEstrategicaWithFilosofiaItem) => onKeydownEditar(e, item)}
		onClickBorrar={(item : PlaneacionEstrategicaWithFilosofiaItem) => onClickBorrar(item)}
		onKeydownBorrar={(e: KeyboardEvent, item: PlaneacionEstrategicaWithFilosofiaItem) => onKeydownBorrar(e, item)}
		onClickRestaurar={(item: PlaneacionEstrategicaWithFilosofiaItem) => onClickRestaurar(item)}
		onKeydownRestaurar={(e: KeyboardEvent, item: PlaneacionEstrategicaWithFilosofiaItem) => onKeydownRestaurar(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearPlaneacionEstrategicaForm
		bind:open={showCrearModal}
		refs={filosofias}
		onClose={handleCerrar}
	/>

	<!-- MODAL EDITAR -->
	{#if showEditarModal && itemSeleccionado}
		<EditarPlaneacionEstrategicaForm
			bind:open={showEditarModal}
			selectedItem={itemSeleccionado}
			refs={filosofias}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL BORRAR -->
	{#if showBorrarModal && itemSeleccionado}
		<BorrarPlaneacionEstrategicaForm
			bind:open={showBorrarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL RESTAURAR -->
	{#if showRestaurarModal && itemSeleccionado}
		<RestaurarPlaneacionEstrategicaForm
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
