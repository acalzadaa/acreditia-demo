<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import type { NormativaItem } from '$lib/schemas/normativa.schema';
	import BorrarNormativaForm from '$lib/components/normativa/BorrarNormativaForm.svelte';
	import RestaurarNormativaForm from '$lib/components/normativa/RestaurarNormativaForm.svelte';
	import EditarNormativaForm from '$lib/components/normativa/EditarNormativaForm.svelte';
	import CrearNormativaForm from '$lib/components/normativa/CrearNormativaForm.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth.svelte';
	import Normativa from '$lib/components/normativa/Normativa.svelte';
	import { page } from '$app/state';
	import { getNormativa } from '$lib/stores/data.svelte';


	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let normativaItems = getNormativa();

	let navigationItems = $derived(page.data.navigationItems);


	let itemSeleccionado: NormativaItem | null = $state(null);

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
	function onClickEditar(item: NormativaItem) {
		itemSeleccionado = item;
		showEditarModal = true;
	}

	function onKeydownEditar(e: KeyboardEvent, item: NormativaItem) {
		if (e.key === 'Enter') {
			onClickEditar(item);
		}
	}

	/* BORRAR */

	function onClickBorrar(item: NormativaItem) {
		itemSeleccionado = item;
		showBorrarModal = true;
	}

	function onKeydownBorrar(e: KeyboardEvent, item: NormativaItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurar(item: NormativaItem) {
		itemSeleccionado = item;
		showRestaurarModal = true;
	}

	function onKeydownRestaurar(e: KeyboardEvent, item: NormativaItem) {
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
	<Normativa
		{normativaItems}
		onClickEditar={(item: NormativaItem) => onClickEditar(item)}
		onKeydownEditar={(e: KeyboardEvent, item: NormativaItem) => onKeydownEditar(e, item)}
		onClickBorrar={(item: NormativaItem) => onClickBorrar(item)}
		onKeydownBorrar={(e: KeyboardEvent, item: NormativaItem) => onKeydownBorrar(e, item)}
		onClickRestaurar={(item: NormativaItem) => onClickRestaurar(item)}
		onKeydownRestaurar={(e: KeyboardEvent, item: NormativaItem) => onKeydownRestaurar(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearNormativaForm bind:open={showCrearModal} onClose={handleCerrar} />

	<!-- MODAL EDITAR -->
	{#if showEditarModal && itemSeleccionado}
		<EditarNormativaForm
			bind:open={showEditarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL BORRAR -->
	{#if showBorrarModal && itemSeleccionado}
		<BorrarNormativaForm
			bind:open={showBorrarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL RESTAURAR -->
	{#if showRestaurarModal && itemSeleccionado}
		<RestaurarNormativaForm
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
