<script lang="ts">
	import type { ObjetivoEstrategicoItem } from '$lib/schemas/objetivoEstrategico.schema';
	import EditarObjetivoEstrategicoForm from '$lib/components/features/objetivo-estrategico/EditarObjetivoEstrategicoForm.svelte';
	import { getObjetivoEstrategico, getPlaneacion } from '$lib/components/common/stores/data.svelte';
	import ObjetivoEstrategicoList from '$lib/components/features/objetivo-estrategico/ObjetivoEstrategicoList.svelte';
	import CrearObjetivoEstrategicoForm from '$lib/components/features/objetivo-estrategico/CrearObjetivoEstrategicoForm.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';

	let items = getObjetivoEstrategico().filter((item) => item.isCurrent);
	let refs = getPlaneacion().filter((item) => item.isCurrent && !item.isDeleted);
	let modal = createModalManager<ObjetivoEstrategicoItem>();
</script>

<ObjetivoEstrategicoList
	{items}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<CrearObjetivoEstrategicoForm open={modal.isOpen('create')} {refs} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarObjetivoEstrategicoForm
		open={modal.isOpen('edit')}
		{refs}
		selectedItem={modal.selectedItem}
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
