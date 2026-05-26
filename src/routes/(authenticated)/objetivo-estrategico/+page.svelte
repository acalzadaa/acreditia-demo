<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import DeleteConfirmationModal from '$lib/components/modal/DeleteConfirmationModal.svelte';
	import ObjetivoEstrategico from '$lib/components/objetivo-estrategico/ObjetivoEstrategico.svelte';
	import type { ObjetivoEstrategicoWithPlaneacionItem } from '$lib/schemas/objetivoEstrategico.schema';
	import CrearObjetivoEstrategico from '$lib/components/objetivo-estrategico/CrearObjetivoEstrategico.svelte';
	import EditarObjetivoEstrategico from '$lib/components/objetivo-estrategico/EditarObjetivoEstrategico.svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth.svelte';
	import { getObjetivos, getPlaneaciones } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let objetivoEstrategicoItems = getObjetivos().filter((item) => item.isCurrent);
	let navigationItems = $derived(page.data.navigationItems);

	let planeaciones = getPlaneaciones().filter((item) => item.isCurrent && !item.isDeleted);

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

	function handleCerrarCrear() {
		showCrearModal = false;
	}

	function handleCerrarEditar() {
		showEditarModal = false;
		itemSeleccionado = null;
	}

	function handleCerrarBorrar() {
		showBorrarModal = false;
		itemSeleccionado = null;
	}

	async function handleConfirmarBorrar() {
		if (itemSeleccionado) {
			/* TODO action server delete */
			const formData = new FormData();
			formData.append('id', itemSeleccionado.id);

			await fetch('?/delete', {
				method: 'POST',
				body: formData
			});
			showBorrarModal = false;
			itemSeleccionado = null;
		}
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

	<ObjetivoEstrategico
		{objetivoEstrategicoItems}
		onClickEditar={(item) => onClickEditar(item)}
		onKeydownEditar={(e, item) => onKeydownEditar(e, item)}
		onClickBorrar={(item) => onClickBorrar(item)}
		onKeydownBorrar={(e, item) => onKeydownBorrar(e, item)}
	></ObjetivoEstrategico>

	<!-- MODAL CREAR -->
	<CrearObjetivoEstrategico
		bind:open={showCrearModal}
		refs={planeaciones}
		onClose={handleCerrarCrear}
	/>

	<!-- MODAL EDITAR -->
	{#if showEditarModal && itemSeleccionado}
		<EditarObjetivoEstrategico
			bind:open={showEditarModal}
			selectedItem={itemSeleccionado}
			refs={planeaciones}
			onClose={handleCerrarEditar}
		/>
	{/if}

	<!-- MODAL BORRAR -->
	{#if showBorrarModal && itemSeleccionado}
		<DeleteConfirmationModal
			bind:open={showBorrarModal}
			selectedItem={itemSeleccionado}
			onClose={handleCerrarBorrar}
			onConfirm={handleConfirmarBorrar}
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
