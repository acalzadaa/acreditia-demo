<script lang="ts">
	import type { IndicadorEstrategicoItem } from '$lib/schemas/indicadorEstrategico.schema';
	import CrearIndicadorEstrategicoForm from '$lib/components/indicador-estrategico/CrearIndicadorEstrategicoForm.svelte';
	import EditarIndicadorEstrategicoForm from '$lib/components/indicador-estrategico/EditarIndicadorEstrategicoForm.svelte';
	import { getIndicadorEstrategico, getObjetivoEstrategico } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import IndicadorEstrategicoList from '$lib/components/indicador-estrategico/IndicadorEstrategicoList.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';

	let items = getIndicadorEstrategico().filter((item) => item.isCurrent);
	let refs = getObjetivoEstrategico().filter((item) => item.isCurrent && !item.isDeleted);
	let modal = createModalManager<IndicadorEstrategicoItem>();
</script>

<IndicadorEstrategicoList
	{items}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<CrearIndicadorEstrategicoForm open={modal.isOpen('create')} {refs} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarIndicadorEstrategicoForm
		open={modal.isOpen('edit')}
		selectedItem={modal.selectedItem}
		{refs}
		onClose={modal.close}
	/>

	<ConfirmDeleteModal
		demo={true}
		id={modal.selectedItem.id}
		open={modal.isOpen('delete')}
		onClose={modal.close}
	/>

	<ConfirmRestoreModal
		demo={true}
		id={modal.selectedItem.id}
		open={modal.isOpen('restore')}
		onClose={modal.close}
	/>
{/if}
