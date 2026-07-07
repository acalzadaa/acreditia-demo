<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/navigation/NavigationBar.svelte';
	import NotificationBarContainer from '$lib/components/notification/NotificationBarContainer.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	import { createToggle } from '$lib/utils/toggle.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { getModelo } from '$lib/stores/data.svelte';
	import { page } from '$app/state';

	import Modelo from '$lib/components/modelo/Modelo.svelte';
	import type { ModeloItem } from '$lib/schemas/modelo.schema';
	import EditarModeloForm from '$lib/components/modelo/EditarModeloForm.svelte';
	import BorrarModeloForm from '$lib/components/modelo/BorrarModeloForm.svelte';
	import RestaurarModeloForm from '$lib/components/modelo/RestaurarModeloForm.svelte';
	import CrearModeloForm from '$lib/components/modelo/CrearModeloForm.svelte';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let calidadModeloItems = getModelo();
	let navigationItems = $derived(page.data.navigationItems);

	// ===== HEADER =====

	/* LOGOUT */
	async function onClickLogout() {
		auth.logout();
		goto(resolve('/login'), { replaceState: true });
	}

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let modal = createModalManager<ModeloItem>();
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
	<NavigationBar showNavigationBar={navigationToggle.value} {navigationItems} />
	<NotificationBarContainer showNotificationBar={notificationToggle.value} />
	<Toolbar
		crearTitle="Nuevo modelo"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={true}
		showFilter={true}
	/>
	<Modelo
		items={calidadModeloItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearModeloForm open={modal.isOpen('create')} onClose={modal.close} />
	{#if modal.selectedItem}
		<!-- MODAL EDITAR -->
		<EditarModeloForm open={modal.isOpen('edit')} item={modal.selectedItem} onClose={modal.close} />

		<!-- MODAL BORRAR -->
		<BorrarModeloForm
			open={modal.isOpen('delete')}
			item={modal.selectedItem}
			onClose={modal.close}
		/>

		<!-- MODAL RESTAURAR -->
		<RestaurarModeloForm
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
