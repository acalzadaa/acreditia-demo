<script lang="ts">
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import { type IndicadorItem } from '$lib/schemas/indicador.schema';
	import EditarIndicadorForm from '$lib/components/features/indicador/EditarIndicadorForm.svelte';
	import {
		getIndicador,
		getModeloFullRef
	} from '$lib/components/common/stores/data.svelte';
	import { page } from '$app/state';
	import IndicadorDetail from '$lib/components/features/indicador/IndicadorDetail.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	
	let indicadorCode = page.params.indicadorCode;

	let indicadorItem = getIndicador().find((item) => item.code === indicadorCode);
	let modeloFullRef = getModeloFullRef();
	let modal = createModalManager<IndicadorItem>();
</script>

<div class="detail-panel">
	<IndicadorDetail title="Indicador" subtitle={indicadorCode} item={indicadorItem} />
	<IndicadorSeccionDetail
		showHeader={true}
		items={navListItem}
		title="Configuracion del indicador"
	/>
</div>

{#if modal.selectedItem}
	<EditarIndicadorForm
		open={modal.isOpen('edit')}
		{modeloFullRef}
		selectedItem={modal.selectedItem}
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
