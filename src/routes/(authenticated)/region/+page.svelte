<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import RestaurarRegionForm from '$lib/components/region/RestaurarRegionForm.svelte';
	import BorrarRegionForm from '$lib/components/region/BorrarRegionForm.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import CrearRegionForm from '$lib/components/region/CrearRegionForm.svelte';
	import EditarRegionForm from '$lib/components/region/EditarRegionForm.svelte';
	import Region from '$lib/components/region/Region.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { getPuestoRef, getRegion } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import type { RegionWithRelationsItem } from '$lib/schemas/region.schema';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let regionItems = getRegion();
	let puestos = getPuestoRef('region');

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

	/* DETALLE */
	function onClickDetalle(item: RegionWithRelationsItem) {
		goto(resolve(`/region/${item.code}`));
	}

	function onKeydownDetalle(e: KeyboardEvent, item: RegionWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickDetalle(item);
		}
	}

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR + MODALS =====
	let modal = createModalManager<RegionWithRelationsItem>();
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
		onClickNavigationBar={navigationToggle.onclick}
		onKeydownNavigationBar={(e) => navigationToggle.onkeydown(e)}
		onClickNotificationBar={navigationToggle.onclick}
		onKeydownNotificationBar={(e) => navigationToggle.onkeydown(e)}
		showNavigationBar={navigationToggle.value}
		showNotificationBar={notificationToggle.value}
	/>
	<NavigationBar showNavigationBar={navigationToggle.value} {navigationItems} />
	<NotificationBar showNotificationBar={notificationToggle.value} />
	<Toolbar
		crearTitle="Nueva region"
		onClickCrear={modal.handlers('create').onclick}
		onKeydownCrear={(e) => modal.handlers('create').onkeydown(e)}
		showExport={true}
		showFilter={true}
	/>
	<Region
		{regionItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
		onClickDetalle={(item: RegionWithRelationsItem) => onClickDetalle(item)}
		onKeydownDetalle={(e: KeyboardEvent, item: RegionWithRelationsItem) => onKeydownDetalle(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearRegionForm open={modal.isOpen('create')} refs={puestos} onClose={modal.close} />

	<!-- MODAL EDITAR -->
	{#if modal.selectedItem}
		<EditarRegionForm
			open={modal.isOpen('edit')}
			selectedItem={modal.selectedItem}
			refs={puestos}
			onClose={modal.close}
		/>

		<!-- MODAL BORRAR -->
		<BorrarRegionForm
			open={modal.isOpen('delete')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<!-- MODAL RESTAURAR -->
		<RestaurarRegionForm
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
