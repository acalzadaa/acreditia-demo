<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';

	import type { UnidadAcademicaItem } from '$lib/schemas/unidadAcademica.schema';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import BorrarUnidadAcademicaForm from '$lib/components/unidad-academica/BorrarUnidadAcademicaForm.svelte';
	import RestaurarUnidadAcademicaForm from '$lib/components/unidad-academica/RestaurarUnidadAcademicaForm.svelte';
	import UnidadAcademica from '$lib/components/unidad-academica/UnidadAcademica.svelte';
	import CrearUnidadAcademicaForm from '$lib/components/unidad-academica/CrearUnidadAcademicaForm.svelte';
	import EditarUnidadAcademicaForm from '$lib/components/unidad-academica/EditarUnidadAcademicaForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { getUnidadAcademica } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let unidadAcademicaItems = getUnidadAcademica();

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
	let modal = createModalManager<UnidadAcademicaItem>();
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
		crearTitle="Nueva unidad"
		onClickCrear={modal.handlers('create').onclick}
		onKeydownCrear={(e) => modal.handlers('create').onkeydown(e)}
		showExport={true}
		showFilter={true}
	/>

	<UnidadAcademica
		{unidadAcademicaItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearUnidadAcademicaForm open={modal.isOpen('create')} onClose={modal.close} />

	{#if modal.selectedItem}
		<!-- MODAL EDITAR -->
		<EditarUnidadAcademicaForm
			open={modal.isOpen('edit')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<!-- MODAL BORRAR -->
		<BorrarUnidadAcademicaForm
			open={modal.isOpen('delete')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<!-- MODAL RESTAURAR -->
		<RestaurarUnidadAcademicaForm
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
