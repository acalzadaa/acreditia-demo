<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/navigation/NavigationBar.svelte';
	import NotificationBarContainer from '$lib/components/notification/NotificationBarContainer.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import type { AreaResponsableItem } from '$lib/schemas/areaResponsable.schema';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import AreaResponsable from '$lib/components/area-responsable/AreaResponsable.svelte';
	import CrearAreaResponsableForm from '$lib/components/area-responsable/CrearAreaResponsableForm.svelte';
	import EditarAreaResponsableForm from '$lib/components/area-responsable/EditarAreaResponsableForm.svelte';
	import BorrarAreaResponsableForm from '$lib/components/area-responsable/BorrarAreaResponsableForm.svelte';
	import RestaurarAreaResponsableForm from '$lib/components/area-responsable/RestaurarAreaResponsableForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import {
		getAreaResponsable,
		getAreaResponsableRef,
		getInstitucionRef,
		getPuestoRef
	} from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let areaResponsableItems = getAreaResponsable();
	let areaResponsableRef = getAreaResponsableRef();
	let navigationItems = $derived(page.data.navigationItems);
	let puestoRef = getPuestoRef('responsable');
	let institucionRef = getInstitucionRef();

	/* LOGOUT */
	async function onClickLogout() {
		auth.logout();
		goto(resolve('/login'), { replaceState: true });
	}


	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let modal = createModalManager<AreaResponsableItem>();
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
		crearTitle="Nueva area"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={true}
		showFilter={true}
	/>

	<AreaResponsable
		{areaResponsableItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearAreaResponsableForm
		open={modal.isOpen('create')}
		{puestoRef}
		{areaResponsableRef}
		{institucionRef}
		onClose={modal.close}
	/>

	{#if modal.selectedItem}
		<!-- MODAL EDITAR -->
		<EditarAreaResponsableForm
			open={modal.isOpen('edit')}
			selectedItem={modal.selectedItem}
			{puestoRef}
			{areaResponsableRef}
			{institucionRef}
			onClose={modal.close}
		/>

		<!-- MODAL BORRAR -->
		<BorrarAreaResponsableForm
			open={modal.isOpen('delete')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<!-- MODAL RESTAURAR -->
		<RestaurarAreaResponsableForm
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
