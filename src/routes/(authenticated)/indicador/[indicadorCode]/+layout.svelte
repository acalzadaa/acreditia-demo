<script lang="ts">
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import Indicador from '$lib/components/indicador/Indicador.svelte';
	import { type IndicadorItem } from '$lib/schemas/indicador.schema';
	import BorrarIndicadorForm from '$lib/components/indicador/BorrarIndicadorForm.svelte';
	import RestaurarIndicadorForm from '$lib/components/indicador/RestaurarIndicadorForm.svelte';
	import EditarIndicadorForm from '$lib/components/indicador/EditarIndicadorForm.svelte';
	import { getIndicador, getModeloFullRef } from '$lib/stores/data.svelte';
	import type { LayoutProps } from '../$types';
	import { page } from '$app/state';

	let { children }: LayoutProps = $props();

	let indicadorCode = page.params.indicadorCode;

	let indicadorItems = getIndicador().filter((item) => item.code === indicadorCode);
	let modeloFullRef = getModeloFullRef();

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let modal = createModalManager<IndicadorItem>();
</script>

<div class="indicador-detail-panel">
	<Indicador
		title="Indicador"
		subtitle={indicadorCode}
		{indicadorItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
	/>

	<main class="detail-content">
		{@render children()}
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

<style>
	.indicador-detail-panel {
		display: flex;
		flex-direction: column;
		min-height: 0;
		overflow: auto;
	}

	.detail-content {
		flex: 1;
		min-height: 0;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
	}
</style>
