<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import Indicador from '$lib/components/indicador/Indicador.svelte';
	import { type IndicadorItem } from '$lib/schemas/indicador.schema';
	import BorrarIndicadorForm from '$lib/components/indicador/BorrarIndicadorForm.svelte';
	import RestaurarIndicadorForm from '$lib/components/indicador/RestaurarIndicadorForm.svelte';
	import EditarIndicadorForm from '$lib/components/indicador/EditarIndicadorForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { page } from '$app/state';
	import { getIndicador } from '$lib/stores/data.svelte';
	import type { IndicadorRubricaItem, RubricaCriterioItem } from '$lib/schemas/rubrica.schema';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let indicadorCode = page.params.indicadorCode;

	let indicadorItems = getIndicador().filter(item => item.code === indicadorCode);
	let navigationItems = $derived(page.data.navigationItems);

	/* LOGOUT */
	async function onClickLogout() {
		await auth.logout();
		goto(resolve('/login'), { replaceState: true });
	}

	function onKeydownLogout(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onClickLogout();
		}
	}

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let modal = createModalManager<IndicadorItem>();
		let modalRubrica = createModalManager<IndicadorRubricaItem>();
	let modalRubricaCriterio = createModalManager<RubricaCriterioItem>();
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

	<Indicador
		gridArea="indicador"
		showHeader={true}
		title="Indicador"
		subtitle={indicadorCode}
		showDetailIcon={true}
		{indicadorItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
	></Indicador>

	{#if modal.selectedItem}
		<EditarIndicadorForm
			open={modal.isOpen('edit')}
			selectedItem={modal.selectedItem}
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
			'navbar indicador'
			'footer footer';
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto 1fr auto;
		height: 100vh;
		position: relative;
	}
</style>
