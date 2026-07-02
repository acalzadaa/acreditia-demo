<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import EditarPuestoForm from '$lib/components/puesto-de-trabajo/EditarPuestoForm.svelte';
	import CrearPuestoForm from '$lib/components/puesto-de-trabajo/CrearPuestoForm.svelte';
	import Puesto from '$lib/components/puesto-de-trabajo/Puesto.svelte';
	import type { PuestoItem } from '$lib/schemas/puesto.schema';
	import BorrarPuestoForm from '$lib/components/puesto-de-trabajo/BorrarPuestoForm.svelte';
	import RestaurarPuestoForm from '$lib/components/puesto-de-trabajo/RestaurarPuestoForm.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth.svelte';
	import { getPuesto } from '$lib/stores/data.svelte';
	import { page } from '$app/state';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let puestoItems = getPuesto();
	let navigationItems = $derived(page.data.navigationItems);

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
	let modal = createModalManager<PuestoItem>();
	let navigationToggle = createToggle(true);
	let notificationToggle = createToggle(false);
</script>

<div class="app-grid">
	<Header
		isLoggedIn={!!auth.user}
		{username}
		{onClickLogout}
		onKeydownLogout={(e) => onKeydownLogout(e)}
	/>
	<Subheader
		onClickNavigationBar={navigationToggle.onClick}
		onKeydownNavigationBar={(e) => navigationToggle.onKeydown(e)}
		onClickNotificationBar={navigationToggle.onClick}
		onKeydownNotificationBar={(e) => navigationToggle.onKeydown(e)}
		showNavigationBar={navigationToggle.value}
		showNotificationBar={notificationToggle.value}
	/>
	<NavigationBar showNavigationBar={navigationToggle.value} {navigationItems} />
	<NotificationBar showNotificationBar={notificationToggle.value} />
	<Toolbar
		crearTitle="Nuevo puesto"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={true}
		showFilter={true}
	/>
	<Puesto
		{puestoItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearPuestoForm open={modal.isOpen('create')} onClose={modal.close} />

	{#if modal.selectedItem}
		<!-- MODAL EDITAR -->
		<EditarPuestoForm
			open={modal.isOpen('edit')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<!-- MODAL BORRAR -->
		<BorrarPuestoForm
			open={modal.isOpen('delete')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<!-- MODAL RESTAURAR -->
		<RestaurarPuestoForm
			open={modal.isOpen('restore')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
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
