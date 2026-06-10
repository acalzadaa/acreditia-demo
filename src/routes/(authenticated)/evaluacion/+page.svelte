<script lang="ts">
	import type { PageProps } from './$types';
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
	import type { EvaluacionWithRelationsItem } from '$lib/schemas/evaluacion.schema';
	import Evaluacion from '$lib/components/evaluacion/Evaluacion.svelte';
	import CrearEvaluacionForm from '$lib/components/evaluacion/CrearEvaluacionForm.svelte';
	import EditarEvaluacionForm from '$lib/components/evaluacion/EditarEvaluacionForm.svelte';
	import BorrarEvaluacionForm from '$lib/components/evaluacion/BorrarEvaluacionForm.svelte';
	import RestaurarEvaluacionForm from '$lib/components/evaluacion/RestaurarEvaluacionForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { getEvaluacion, getInstitucionRef, getModeloRef } from '$lib/stores/data.svelte';

	let { data }: PageProps = $props();

	let username = auth.user?.email?.split('@')[0] || 'Usuario';

	let evaluacionItems = getEvaluacion();
	let modeloRef = getModeloRef();
	let institucionRef = getInstitucionRef();
	let navigationItems = $derived(data.navigationItems);

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
	let modal = createModalManager<EvaluacionWithRelationsItem>();
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
		crearTitle="Nueva evaluacion"
		onClickCrear={modal.handlers('create').onclick}
		onKeydownCrear={(e) => modal.handlers('create').onkeydown(e)}
		showExport={true}
		showFilter={true}
	/>
	<Evaluacion
		items={evaluacionItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
	/>

	<!-- MODAL CREAR -->
	<CrearEvaluacionForm
		open={modal.isOpen('create')}
		{modeloRef}
		{institucionRef}
		onClose={modal.close}
	/>

	{#if modal.selectedItem}
		<!-- MODAL EDITAR -->
		<EditarEvaluacionForm
			open={modal.isOpen('edit')}
			item={modal.selectedItem}
			{modeloRef}
			{institucionRef}
			onClose={modal.close}
		/>

		<!-- MODAL BORRAR -->
		<BorrarEvaluacionForm
			open={modal.isOpen('delete')}
			item={modal.selectedItem}
			onClose={modal.close}
		/>

		<!-- MODAL RESTAURAR -->
		<RestaurarEvaluacionForm
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
