<script lang="ts">
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { type IndicadorItem } from '$lib/schemas/indicador.schema';
	import CrearIndicadorForm from '$lib/components/indicador/CrearIndicadorForm.svelte';
	import EditarIndicadorForm from '$lib/components/indicador/EditarIndicadorForm.svelte';
	import { getIndicador, getModeloFullRef } from '$lib/stores/data.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import IndicadorList from '$lib/components/indicador/IndicadorList.svelte';

	let items = getIndicador();
	let modeloFullRef = getModeloFullRef();

	let modal = createModalManager<IndicadorItem>();
</script>

<main class="detail-panel">
	<IndicadorList
		{items}
		onClickEditar={modal.handlers('edit').onClickItem}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onClickCrear={modal.handlers('create').onClick}
		onClickFilter={modal.handlers('filter').onClick}
		onClickExport={modal.handlers('export').onClick}
	/>
</main>

<!-- MODAL CREAR -->
<CrearIndicadorForm open={modal.isOpen('create')} {modeloFullRef} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarIndicadorForm
		open={modal.isOpen('edit')}
		selectedItem={modal.selectedItem}
		{modeloFullRef}
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
