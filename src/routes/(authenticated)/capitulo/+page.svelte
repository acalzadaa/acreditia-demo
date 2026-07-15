<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NotificationBarContainer from '$lib/components/notification/NotificationBarContainer.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import RestaurarCapituloForm from '$lib/components/capitulo/RestaurarCapituloForm.svelte';
	import BorrarCapituloForm from '$lib/components/capitulo/BorrarCapituloForm.svelte';
	import EditarCapituloForm from '$lib/components/capitulo/EditarCapituloForm.svelte';
	import CrearCapituloForm from '$lib/components/capitulo/CrearCapituloForm.svelte';
	import Capitulo from '$lib/components/capitulo/Capitulo.svelte';
	import { getCapitulo, getModeloRef } from '$lib/stores/data.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { page } from '$app/state';
	import type { CapituloItem } from '$lib/schemas/capitulo.schema';
	import NavigationBarContainer from '$lib/components/navigation/NavigationBarContainer.svelte';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let capituloItems = getCapitulo();
	let modeloRef = getModeloRef();
	let navigationItems = $derived(page.data.navigationItems);

	// ===== HEADER =====

	/* LOGOUT */
	async function onClickLogout() {
		auth.logout();
		goto(resolve('/login'), { replaceState: true });
	}

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let modal = createModalManager<CapituloItem>();
	let navigationToggle = createToggle(true);
	let notificationToggle = createToggle(false);
</script>

<div class="app-grid">
	<Header
		{username}
		{onClickLogout}
	/>
	<Subheader
		onClickNavigationBar={navigationToggle.onClick}
		onKeydownNavigationBar={(e) => navigationToggle.onKeydown(e)}
		onClickNotificationBar={navigationToggle.onClick}
		onKeydownNotificationBar={(e) => navigationToggle.onKeydown(e)}
		showNavigationBar={navigationToggle.value}
		showNotificationBar={notificationToggle.value}
	/>
	<NavigationBarContainer showNavigationBar={navigationToggle.value} {navigationItems} />
	<NotificationBarContainer showNotificationBar={notificationToggle.value} />
	<Toolbar
		crearTitle="Nuevo capitulo"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={true}
		showFilter={true}
	/>
	<Capitulo
		items={capituloItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearCapituloForm open={modal.isOpen('create')} refs={modeloRef} onClose={modal.close} />

	{#if modal.selectedItem}
		<!-- MODAL EDITAR -->
		<EditarCapituloForm
			open={modal.isOpen('edit')}
			item={modal.selectedItem}
			refs={modeloRef}
			onClose={modal.close}
		/>

		<!-- MODAL BORRAR -->
		<BorrarCapituloForm
			open={modal.isOpen('delete')}
			item={modal.selectedItem}
			onClose={modal.close}
		/>

		<!-- MODAL RESTAURAR -->
		<RestaurarCapituloForm
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
	}
</style>
