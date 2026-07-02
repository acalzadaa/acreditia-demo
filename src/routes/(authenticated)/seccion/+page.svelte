<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import RestaurarSeccionForm from '$lib/components/seccion/RestaurarSeccionForm.svelte';
	import BorrarSeccionForm from '$lib/components/seccion/BorrarSeccionForm.svelte';
	import CrearSeccionForm from '$lib/components/seccion/CrearSeccionForm.svelte';
	import EditarSeccionForm from '$lib/components/seccion/EditarSeccionForm.svelte';
	import Seccion from '$lib/components/seccion/Seccion.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { getCapituloRef, getSeccion } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import type { SeccionItem } from '$lib/schemas/seccion.schema';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let seccionItems = getSeccion();
	let capituloRef = getCapituloRef();
	let navigationItems = $derived(page.data.navigationItems);

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
	let modal = createModalManager<SeccionItem>();
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
		crearTitle="Nueva seccion"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={true}
		showFilter={true}
	/>
	<Seccion
		items={seccionItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearSeccionForm open={modal.isOpen('create')} refs={capituloRef} onClose={modal.close} />

	{#if modal.selectedItem}
		<!-- MODAL EDITAR -->
		<EditarSeccionForm
			open={modal.isOpen('edit')}
			item={modal.selectedItem}
			refs={capituloRef}
			onClose={modal.close}
		/>

		<!-- MODAL BORRAR -->
		<BorrarSeccionForm
			open={modal.isOpen('delete')}
			item={modal.selectedItem}
			onClose={modal.close}
		/>

		<!-- MODAL RESTAURAR -->
		<RestaurarSeccionForm
			open={modal.isOpen('restore')}
			item={modal.selectedItem}
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
		min-width: 1277px;
	}
</style>
