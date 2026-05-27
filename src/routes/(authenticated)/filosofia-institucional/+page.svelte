<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import FilosofiaInstitucional from '$lib/components/filosofia-institucional/FilosofiaInstitucional.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import CrearFilosofiaInstitucional from '$lib/components/filosofia-institucional/CrearFilosofiaInstitucionalForm.svelte';
	import {  type FilosofiaInstitucionalItem } from '$lib/schemas/filosofiaInstitucional.schema';
	import BorrarFilosofiaInstitucionalForm from '$lib/components/filosofia-institucional/BorrarFilosofiaInstitucionalForm.svelte';
	import EditarFilosofiaInstitucionalForm from '$lib/components/filosofia-institucional/EditarFilosofiaInstitucionalForm.svelte';
	import RestaurarFilosofiaInstitucionalForm from '$lib/components/filosofia-institucional/RestaurarFilosofiaInstitucionalForm.svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth.svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { getFilosofias } from '$lib/stores/data.svelte';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let filosofiaInstitucionalItems = getFilosofias().filter((item) => item.isCurrent);
	let navigationItems = $derived(page.data.navigationItems);

	let itemSeleccionado: FilosofiaInstitucionalItem | null = $state(null);

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
	function onClickEditar(item: FilosofiaInstitucionalItem) {
		itemSeleccionado = item;
		showEditarModal = true;
	}

	function onKeydownEditar(e: KeyboardEvent, item: FilosofiaInstitucionalItem) {
		if (e.key === 'Enter') {
			onClickEditar(item);
		}
	}

	/* BORRAR */
	function onClickBorrar(item: FilosofiaInstitucionalItem) {
		itemSeleccionado = item;
		showBorrarModal = true;
	}

	function onKeydownBorrar(e: KeyboardEvent, item: FilosofiaInstitucionalItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurar(item: FilosofiaInstitucionalItem) {
		itemSeleccionado = item;
		showRestaurarModal = true;
	}

	function onKeydownRestaurar(e: KeyboardEvent, item: FilosofiaInstitucionalItem) {
		if (e.key === 'Enter') {
			onClickRestaurar(item);
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
	<FilosofiaInstitucional
		{filosofiaInstitucionalItems}
		onClickEditar={(item) => onClickEditar(item)}
		onKeydownEditar={(e, item) => onKeydownEditar(e, item)}
		onClickBorrar={(item) => onClickBorrar(item)}
		onKeydownBorrar={(e, item) => onKeydownBorrar(e, item)}
		onClickRestaurar={(item) => onClickRestaurar(item)}
		onKeydownRestaurar={(e, item) => onKeydownRestaurar(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearFilosofiaInstitucional bind:open={showCrearModal} onClose={handleCerrar} />

	<!-- MODAL EDITAR -->
	{#if showEditarModal && itemSeleccionado}
		<EditarFilosofiaInstitucionalForm
			bind:open={showEditarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL BORRAR -->
	{#if showBorrarModal && itemSeleccionado}
		<BorrarFilosofiaInstitucionalForm
			bind:open={showBorrarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL RESTAURAR -->
	{#if showRestaurarModal && itemSeleccionado}
		<RestaurarFilosofiaInstitucionalForm
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
		min-width: 1277px;
	}
</style>
