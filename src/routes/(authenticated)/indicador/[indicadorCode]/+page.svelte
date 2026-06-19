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
	import {
		getIndicador,
		getIndicadorAreaFuncional,
		getIndicadorAreaResponsable,
		getIndicadorNormativa,
		getModeloFullRef,
		getRubrica
	} from '$lib/stores/data.svelte';
	import IndicadorRubricaManager from '$lib/components/indicador/rubrica/IndicadorRubricaManager.svelte';
	import IndicadorAreaResponsableManager from '$lib/components/indicador/area-responsable/IndicadorAreaResponsableManager.svelte';
	import IndicadorAreaFuncionalManager from '$lib/components/indicador/area-funcional/IndicadorAreaFuncionalManager.svelte';
	import IndicadorNormativaManager from '$lib/components/indicador/normativa/IndicadorNormativaManager.svelte';

	let username = auth.user?.email?.split('@')[0] || 'Usuario';
	let indicadorCode = page.params.indicadorCode;

	let indicadorItems = getIndicador().filter((item) => item.code === indicadorCode);
	let rubricaItems = getRubrica().filter((item) => item.indicador.code === indicadorCode);
	let indicadorAreaResponsableItems = getIndicadorAreaResponsable().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let indicadorAreaFuncionalItems = getIndicadorAreaFuncional();
	let indicadorNormativaItems = getIndicadorNormativa();
	let modeloFullRef = getModeloFullRef();
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

	<div class="main-panel">
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

		<main class="detail-content">
			<IndicadorRubricaManager gridArea="rubrica" items={rubricaItems} />
			<IndicadorAreaResponsableManager items={indicadorAreaResponsableItems} />
			<IndicadorAreaFuncionalManager items={indicadorAreaFuncionalItems} />
			<IndicadorNormativaManager items={indicadorNormativaItems} />
		</main>
	</div>
	{#if modal.selectedItem}
		<EditarIndicadorForm
			open={modal.isOpen('edit')}
			{modeloFullRef}
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
			'navbar main' /* ← solo un área "main", que ocupa las 2 filas */
			'footer footer';
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto 1fr auto;
		height: 100vh;
		position: relative;
	}

	/* Este div ocupa el grid-area "main" del layout global */
	.main-panel {
		grid-area: main;
		display: flex;
		flex-direction: column;
		min-height: 0; /* ← crítico: permite que flex respete el límite del grid */
		overflow: auto; /* el panel en sí no scrollea */
	}

	.detail-content {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}
</style>
