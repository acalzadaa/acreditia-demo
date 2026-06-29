<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import type { EntidadLegalItem } from '$lib/schemas/entidadLegal.schema';
	import EntidadLegal from '$lib/components/entidad-legal/EntidadLegal.svelte';
	import BorrarEntidadLegalForm from '$lib/components/entidad-legal/BorrarEntidadLegalForm.svelte';
	import EditarEntidadLegalForm from '$lib/components/entidad-legal/EditarEntidadLegalForm.svelte';
	import CrearEntidadLegalForm from '$lib/components/entidad-legal/CrearEntidadLegalForm.svelte';
	import RestaurarEntidadLegalForm from '$lib/components/entidad-legal/RestaurarEntidadLegalForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { page } from '$app/state';
	import { getEntidadLegal } from '$lib/stores/data.svelte';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let entidadLegalItems = getEntidadLegal();
	let navigationItems = $derived(page.data.navigationItems);

	let itemSeleccionado: EntidadLegalItem | null = $state(null);

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

	function onClickEditar(item: EntidadLegalItem) {
		itemSeleccionado = item;
		showEditarModal = true;
	}

	function onKeydownEditar(e: KeyboardEvent, item: EntidadLegalItem) {
		if (e.key === 'Enter') {
			onClickEditar(item);
		}
	}

	/* BORRAR */

	function onClickBorrar(item: EntidadLegalItem) {
		itemSeleccionado = item;
		showBorrarModal = true;
	}

	function onKeydownBorrar(e: KeyboardEvent, item: EntidadLegalItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurar(item: EntidadLegalItem) {
		itemSeleccionado = item;
		showRestaurarModal = true;
	}

	function onKeydownRestaurar(e: KeyboardEvent, item: EntidadLegalItem) {
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
		crearTitle="Nueva entidad"
		{onClickCrear}
		onKeydownCrear={(e) => onKeydownCrear(e)}
		showExport={true}
		showFilter={true}
	/>

	<EntidadLegal
		{entidadLegalItems}
		onClickEditar={(item) => onClickEditar(item)}
		onKeydownEditar={(e, item) => onKeydownEditar(e, item)}
		onClickBorrar={(item) => onClickBorrar(item)}
		onKeydownBorrar={(e, item) => onKeydownBorrar(e, item)}
		onClickRestaurar={(item: EntidadLegalItem) => onClickRestaurar(item)}
		onKeydownRestaurar={(e: KeyboardEvent, item: EntidadLegalItem) => onKeydownRestaurar(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearEntidadLegalForm bind:open={showCrearModal} onClose={handleCerrar} />

	<!-- MODAL EDITAR -->
	{#if showEditarModal && itemSeleccionado}
		<EditarEntidadLegalForm
			bind:open={showEditarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL BORRAR -->
	{#if showBorrarModal && itemSeleccionado}
		<BorrarEntidadLegalForm
			bind:open={showBorrarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}
	<!-- MODAL RESTAURAR -->
	{#if showRestaurarModal && itemSeleccionado}
		<RestaurarEntidadLegalForm
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
