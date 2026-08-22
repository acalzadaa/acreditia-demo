<script lang="ts">
	import type { UnidadAcademicaItem } from '$lib/schemas/unidadAcademica.schema';
	import { getUnidadAcademica } from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import UnidadAcademicaList from '$lib/components/features/unidad-academica/UnidadAcademicaList.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import EditarUnidadAcademicaForm from '$lib/components/features/unidad-academica/EditarUnidadAcademicaForm.svelte';
	import CrearUnidadAcademicaForm from '$lib/components/features/unidad-academica/CrearUnidadAcademicaForm.svelte';

	let unidadAcademicaItems = getUnidadAcademica();

	let modal = createModalManager<UnidadAcademicaItem>();
</script>

<UnidadAcademicaList
	items={unidadAcademicaItems}
	onClickEditar={(item) => modal.handlers('edit').onClickItem(item)}
	onClickBorrar={(item) => modal.handlers('delete').onClickItem(item)}
	onClickRestaurar={(item) => modal.handlers('restore').onClickItem(item)}
	onClickCrear={modal.handlers('create').onClick}
	onClickExport={modal.handlers('export').onClick}
	onClickFilter={modal.handlers('filter').onClick}
/>

<CrearUnidadAcademicaForm open={modal.isOpen('create')} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarUnidadAcademicaForm
		open={modal.isOpen('edit')}
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
