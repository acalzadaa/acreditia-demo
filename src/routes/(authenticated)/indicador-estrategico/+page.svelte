<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import IndicadorEstrategico from '$lib/components/indicador-estrategico/IndicadorEstrategico.svelte';
	import RestaurarIndicadorEstrategicoForm from '$lib/components/indicador-estrategico/RestaurarIndicadorEstrategicoForm.svelte';
	import BorrarIndicadorEstrategicoForm from '$lib/components/indicador-estrategico/BorrarIndicadorEstrategicoForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { IndicadorEstrategicoItem } from '$lib/schemas/indicadorEstrategico.schema';
	import CrearIndicadorEstrategicoForm from '$lib/components/indicador-estrategico/CrearIndicadorEstrategicoForm.svelte';
	import EditarIndicadorEstrategicoForm from '$lib/components/indicador-estrategico/EditarIndicadorEstrategicoForm.svelte';
	import { getIndicadorEstrategico, getObjetivoEstrategico } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let navigationItems = $derived(page.data.navigationItems);
	let indicadorEstrategicoItems = getIndicadorEstrategico().filter((item) => item.isCurrent);
	let objetivos = getObjetivoEstrategico().filter((item) => item.isCurrent && !item.isDeleted);

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
	let modal = createModalManager<IndicadorEstrategicoItem>();
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
		crearTitle="Nuevo indicador"
		onClickCrear={modal.handlers('create').onclick}
		onKeydownCrear={(e) => modal.handlers('create').onkeydown(e)}
		showExport={true}
		showFilter={true}
	/>

	<IndicadorEstrategico
		{indicadorEstrategicoItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
	></IndicadorEstrategico>

	<!-- MODAL CREAR -->
	<CrearIndicadorEstrategicoForm
		open={modal.isOpen('create')}
		refs={objetivos}
		onClose={modal.close}
	/>

	{#if modal.selectedItem}
		<EditarIndicadorEstrategicoForm
			open={modal.isOpen('edit')}
			selectedItem={modal.selectedItem}
			refs={objetivos}
			onClose={modal.close}
		/>

		<BorrarIndicadorEstrategicoForm
			open={modal.isOpen('delete')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<RestaurarIndicadorEstrategicoForm
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
