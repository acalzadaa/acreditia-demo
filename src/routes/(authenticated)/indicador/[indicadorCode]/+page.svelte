<script lang="ts">
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { type IndicadorItem } from '$lib/schemas/indicador.schema';
	import EditarIndicadorForm from '$lib/components/indicador/EditarIndicadorForm.svelte';
	import { getIndicador, getIndicadorNavList, getModeloFullRef } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import IndicadorDetail from '$lib/components/indicador/IndicadorDetail.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import IndicadorNavList from '$lib/components/indicador/IndicadorNavList.svelte';

	let indicadorCode = page.params.indicadorCode;

	let indicadorItems = getIndicador().filter((item) => item.code === indicadorCode) || [];
	let modeloFullRef = getModeloFullRef();
	let indicadorNavItem = getIndicadorNavList();

	let modal = createModalManager<IndicadorItem>();
</script>

<div class="detail-panel">
	<IndicadorDetail title="Indicador" subtitle={indicadorCode} items={indicadorItems} />
	<IndicadorNavList showHeader={true} items={indicadorNavItem} title='Agregar complementos'/>
</div>

{#if modal.selectedItem}
	<EditarIndicadorForm
		open={modal.isOpen('edit')}
		{modeloFullRef}
		selectedItem={modal.selectedItem}
		onClose={modal.close}
	/>

	<ConfirmDeleteModal
		demo={true}
		open={modal.isOpen('delete')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>

	<ConfirmRestoreModal
		demo={true}
		open={modal.isOpen('restore')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>
{/if}

<style>
	.detail-panel {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow-y: auto;
	}
</style>
