<script lang="ts">
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import { type IndicadorItem } from '$lib/schemas/indicador.schema';
	import CrearIndicadorForm from '$lib/components/features/indicador/CrearIndicadorForm.svelte';
	import EditarIndicadorForm from '$lib/components/features/indicador/EditarIndicadorForm.svelte';
	import { getIndicador, getModeloFullRef } from '$lib/components/common/stores/data.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import IndicadorList from '$lib/components/features/indicador/IndicadorList.svelte';

	let items = getIndicador();
	let modeloFullRef = getModeloFullRef();

	let modal = createModalManager<IndicadorItem>();
</script>

<div class="detail-panel">
	<IndicadorList
		{items}
		onClickEditar={modal.handlers('edit').onClickItem}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onClickCrear={modal.handlers('create').onClick}
		onClickFilter={modal.handlers('filter').onClick}
		onClickExport={modal.handlers('export').onClick}
	/>
</div>

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
