<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import Subheader from '$lib/components/common/Subheader.svelte';
	import NavigationBar from '$lib/components/common/NavigationBar.svelte';
	import NotificationBar from '$lib/components/notification/NotificationBar.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import { type EtapaWithRelationsItem } from '$lib/schemas/etapa.schema';
	import Etapa from '$lib/components/etapa/Etapa.svelte';
	import EditarEtapaForm from '$lib/components/etapa/EditarEtapaForm.svelte';
	import Evaluacion from '$lib/components/evaluacion/Evaluacion.svelte';
	import { type EvaluacionWithRelationsItem } from '$lib/schemas/evaluacion.schema';
	import EditarEvaluacionForm from '$lib/components/evaluacion/EditarEvaluacionForm.svelte';
	import BorrarEvaluacionForm from '$lib/components/evaluacion/BorrarEvaluacionForm.svelte';
	import RestaurarEvaluacionForm from '$lib/components/evaluacion/RestaurarEvaluacionForm.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import {
		getEtapa,
		getEvaluacion,
		getInstitucionRef,
		getModeloRef
	} from '$lib/stores/data.svelte';
	import { page } from '$app/state';

	let evaluacionCode = page.params.evaluacionCode;
	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let etapaItems = getEtapa().filter((item) => item.evaluacion.code === evaluacionCode);
	let evaluacionItems = getEvaluacion().filter((item) => item.code === evaluacionCode);
	let navigationItems = $derived(page.data.navigationItems);
	let modeloRef = getModeloRef();
	let institucionRef = getInstitucionRef();

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

	/* ACCION */
	function onClickIniciarEvaluacion(item: EvaluacionWithRelationsItem) {
		//llamar a action server /iniciarEvaluacion
		console.log('iniciando evaluacion...', item.year, item.cycle);
	}

	function onKeydownIniciarEvaluacion(e: KeyboardEvent, item: EvaluacionWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickIniciarEvaluacion(item);
		}
	}

	/* DETALLE */
	function onClickDetalle(item: EtapaWithRelationsItem) {
		console.log('mostrando detalle', item.code);
	}

	function onKeydownDetalle(e: KeyboardEvent, item: EtapaWithRelationsItem) {
		if (e.key === 'Enter') {
			onClickDetalle(item);
		}
	}

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let navigationToggle = createToggle(true);
	let notificationToggle = createToggle(false);
	let modal = createModalManager<EvaluacionWithRelationsItem>();
	let modalEtapa = createModalManager<EtapaWithRelationsItem>();
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

	<Evaluacion
		gridArea="evaluacion"
		showHeader={true}
		title="Evaluacion"
		subtitle={evaluacionCode}
		showDetailIcon={false}
		items={evaluacionItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
		onClickIniciarEvaluacion={(item: EvaluacionWithRelationsItem) => onClickIniciarEvaluacion(item)}
		onKeydownIniciarEvaluacion={(e: KeyboardEvent, item: EvaluacionWithRelationsItem) =>
			onKeydownIniciarEvaluacion(e, item)}
	/>

	<Etapa
		gridArea="etapa"
		showHeader={true}
		title="Etapas asignadas a la evaluacion"
		items={etapaItems}
		onClickEditar={modalEtapa.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modalEtapa.handlers('edit').onKeydownItem(e, item)}
		onClickDetalle={(item: EtapaWithRelationsItem) => onClickDetalle(item)}
		onKeydownDetalle={(e: KeyboardEvent, item: EtapaWithRelationsItem) => onKeydownDetalle(e, item)}
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

	{#if modalEtapa.selectedItem}
		<!-- MODAL EDITAR -->
		<EditarEtapaForm
			open={modalEtapa.isOpen('edit')}
			item={modalEtapa.selectedItem}
			onClose={modalEtapa.close}
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
			'navbar evaluacion'
			'navbar etapa'
			'footer footer';
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto auto 1fr auto;
		height: 100vh;
		position: relative;
		min-width: 1277px;
	}
</style>
