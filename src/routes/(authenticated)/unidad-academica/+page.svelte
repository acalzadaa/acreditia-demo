<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';

	import type { UnidadAcademicaWithRelationsItem } from '$lib/schemas/unidadAcademica.schema';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import BorrarUnidadAcademicaForm from '$lib/components/unidad-academica/BorrarUnidadAcademicaForm.svelte';
	import RestaurarUnidadAcademicaForm from '$lib/components/unidad-academica/RestaurarUnidadAcademicaForm.svelte';
	import UnidadAcademica from '$lib/components/unidad-academica/UnidadAcademica.svelte';
	import CrearUnidadAcademicaForm from '$lib/components/unidad-academica/CrearUnidadAcademicaForm.svelte';
	import EditarUnidadAcademicaForm from '$lib/components/unidad-academica/EditarUnidadAcademicaForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { getCampusRef, getUnidadAcademica } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	
	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let unidadAcademicaItems = getUnidadAcademica();

	let campus = getCampusRef();
	let navigationItems = $derived(page.data.navigationItems);

	let itemSeleccionado: UnidadAcademicaWithRelationsItem | null = $state(null);

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

	function onClickEditar(item: UnidadAcademicaWithRelationsItem) {
		itemSeleccionado = item;
		showEditarModal = true;
	}

	function onKeydownEditar(e: KeyboardEvent, item: UnidadAcademicaWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickEditar(item);
		}
	}

	/* BORRAR */

	function onClickBorrar(item: UnidadAcademicaWithRelationsItem) {
		itemSeleccionado = item;
		showBorrarModal = true;
	}

	function onKeydownBorrar(e: KeyboardEvent, item: UnidadAcademicaWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickBorrar(item);
		}
	}

	/* RESTAURAR */
	function onClickRestaurar(item: UnidadAcademicaWithRelationsItem) {
		itemSeleccionado = item;
		showRestaurarModal = true;
	}

	function onKeydownRestaurar(e: KeyboardEvent, item: UnidadAcademicaWithRelationsItem) {
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

	<UnidadAcademica
		{unidadAcademicaItems}
		onClickEditar={(item: UnidadAcademicaWithRelationsItem) => onClickEditar(item)}
		onKeydownEditar={(e: KeyboardEvent, item: UnidadAcademicaWithRelationsItem) =>
			onKeydownEditar(e, item)}
		onClickBorrar={(item: UnidadAcademicaWithRelationsItem) => onClickBorrar(item)}
		onKeydownBorrar={(e: KeyboardEvent, item: UnidadAcademicaWithRelationsItem) =>
			onKeydownBorrar(e, item)}
		onClickRestaurar={(item: UnidadAcademicaWithRelationsItem) => onClickRestaurar(item)}
		onKeydownRestaurar={(e: KeyboardEvent, item: UnidadAcademicaWithRelationsItem) =>
			onKeydownRestaurar(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearUnidadAcademicaForm
		bind:open={showCrearModal}
		refs={campus}
		onClose={handleCerrar}
	/>

	<!-- MODAL EDITAR -->
	{#if showEditarModal && itemSeleccionado}
		<EditarUnidadAcademicaForm
			{campus}
			bind:open={showEditarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL BORRAR -->
	{#if showBorrarModal && itemSeleccionado}
		<BorrarUnidadAcademicaForm
			bind:open={showBorrarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrar}
		/>
	{/if}

	<!-- MODAL RESTAURAR -->
	{#if showRestaurarModal && itemSeleccionado}
		<RestaurarUnidadAcademicaForm
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
