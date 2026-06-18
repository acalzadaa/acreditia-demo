<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import Indicador from '$lib/components/indicador/Indicador.svelte';
	import { type IndicadorItem } from '$lib/schemas/indicador.schema';
	import BorrarIndicadorForm from '$lib/components/indicador/BorrarIndicadorForm.svelte';
	import RestaurarIndicadorForm from '$lib/components/indicador/RestaurarIndicadorForm.svelte';
	import CrearIndicadorForm from '$lib/components/indicador/CrearIndicadorForm.svelte';
	import EditarIndicadorForm from '$lib/components/indicador/EditarIndicadorForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { getIndicador, getModeloFullRef } from '$lib/stores/data.svelte';
	import { page } from '$app/state';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let indicadorItems = getIndicador();
	let modeloFullRef = getModeloFullRef();
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
	let modal = createModalManager<IndicadorItem>();
	let navigationToggle = createToggle(true);
	let notificationToggle = createToggle(false);

	/* DETALLE */
	function onClickDetalle(item: IndicadorItem) {
		goto(resolve(`/indicador/${item.code}`));
	}

	function onKeydownDetalle(e: KeyboardEvent, item: IndicadorItem) {
		if (e.key === 'Enter') {
			onClickDetalle(item);
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
		crearTitle="Crear indicador"
		onClickCrear={modal.handlers('create').onclick}
		onKeydownCrear={(e) => modal.handlers('create').onkeydown(e)}
		showExport={true}
		showFilter={true}
	/>

	<Indicador
		{indicadorItems}
		showDetailIcon={true}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
		onClickDetalle={(item: IndicadorItem) => onClickDetalle(item)}
		onKeydownDetalle={(e: KeyboardEvent, item: IndicadorItem) => onKeydownDetalle(e, item)}
	></Indicador>

	<!-- MODAL CREAR -->
	<CrearIndicadorForm open={modal.isOpen('create')} {modeloFullRef} onClose={modal.close} />

	{#if modal.selectedItem}
		<EditarIndicadorForm
			open={modal.isOpen('edit')}
			selectedItem={modal.selectedItem}
			{modeloFullRef}
			onClose={modal.close}
		/>

		<BorrarIndicadorForm
			open={modal.isOpen('delete')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<RestaurarIndicadorForm
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
