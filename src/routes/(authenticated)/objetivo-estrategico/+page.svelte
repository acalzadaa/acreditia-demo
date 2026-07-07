<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/navigation/NavigationBar.svelte';
	import NotificationBarContainer from '$lib/components/notification/NotificationBarContainer.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import ObjetivoEstrategico from '$lib/components/objetivo-estrategico/ObjetivoEstrategico.svelte';
	import type { ObjetivoEstrategicoWithPlaneacionItem } from '$lib/schemas/objetivoEstrategico.schema';
	import CrearObjetivoEstrategicoForm from '$lib/components/objetivo-estrategico/CrearObjetivoEstrategicoForm.svelte';
	import EditarObjetivoEstrategicoForm from '$lib/components/objetivo-estrategico/EditarObjetivoEstrategicoForm.svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth.svelte';
	import { getObjetivoEstrategico, getPlaneacion } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import BorrarObjetivoEstrategicoForm from '$lib/components/objetivo-estrategico/BorrarObjetivoEstrategicoForm.svelte';
	import RestaurarObjetivoEstrategicoForm from '$lib/components/objetivo-estrategico/RestaurarObjetivoEstrategicoForm.svelte';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let objetivoEstrategicoItems = getObjetivoEstrategico().filter((item) => item.isCurrent);
	let navigationItems = $derived(page.data.navigationItems);

	let planeaciones = getPlaneacion().filter((item) => item.isCurrent && !item.isDeleted);

	let itemSeleccionado: ObjetivoEstrategicoWithPlaneacionItem | null = $state(null);

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

	function onClickEditar(item: ObjetivoEstrategicoWithPlaneacionItem) {
		itemSeleccionado = item;
		showEditarModal = true;
	}

	function onKeydownEditar(e: KeyboardEvent, item: ObjetivoEstrategicoWithPlaneacionItem) {
		if (e.key === 'Enter') {
			onClickEditar(item);
		}
	}

	/* BORRAR */

	function onClickBorrar(item: ObjetivoEstrategicoWithPlaneacionItem) {
		itemSeleccionado = item;
		showBorrarModal = true;
	}

	function onKeydownBorrar(e: KeyboardEvent, item: ObjetivoEstrategicoWithPlaneacionItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurar(item: ObjetivoEstrategicoWithPlaneacionItem) {
		itemSeleccionado = item;
		showRestaurarModal = true;
	}

	function onKeydownRestaurar(e: KeyboardEvent, item: ObjetivoEstrategicoWithPlaneacionItem) {
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
		crearTitle="Nuevo objetivo"
		{onClickCrear}
		onKeydownCrear={(e) => onKeydownCrear(e)}
		showExport={true}
		showFilter={true}
	/>

	<ObjetivoEstrategico
		{objetivoEstrategicoItems}
		onClickEditar={(item: ObjetivoEstrategicoWithPlaneacionItem) => onClickEditar(item)}
		onKeydownEditar={(e: KeyboardEvent, item: ObjetivoEstrategicoWithPlaneacionItem) =>
			onKeydownEditar(e, item)}
		onClickBorrar={(item: ObjetivoEstrategicoWithPlaneacionItem) => onClickBorrar(item)}
		onKeydownBorrar={(e: KeyboardEvent, item: ObjetivoEstrategicoWithPlaneacionItem) =>
			onKeydownBorrar(e, item)}
		onClickRestaurar={(item: ObjetivoEstrategicoWithPlaneacionItem) => onClickRestaurar(item)}
		onKeydownRestaurar={(e: KeyboardEvent, item: ObjetivoEstrategicoWithPlaneacionItem) =>
			onKeydownRestaurar(e, item)}
	></ObjetivoEstrategico>

	<!-- MODAL CREAR -->
	<CrearObjetivoEstrategicoForm
		bind:open={showCrearModal}
		refs={planeaciones}
		onClose={handleCerrar}
	/>

	<!-- MODAL EDITAR -->
	{#if showEditarModal && itemSeleccionado}
		<EditarObjetivoEstrategicoForm
			bind:open={showEditarModal}
			selectedItem={itemSeleccionado}
			refs={planeaciones}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL BORRAR -->
	{#if showBorrarModal && itemSeleccionado}
		<BorrarObjetivoEstrategicoForm
			bind:open={showBorrarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL RESTAURAR -->
	{#if showRestaurarModal && itemSeleccionado}
		<RestaurarObjetivoEstrategicoForm
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
