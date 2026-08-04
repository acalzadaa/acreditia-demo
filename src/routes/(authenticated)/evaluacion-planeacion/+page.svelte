<script lang="ts">
	import CrearEvaluacionForm from '$lib/components/evaluacion/CrearEvaluacionForm.svelte';
	import EditarEvaluacionForm from '$lib/components/evaluacion/EditarEvaluacionForm.svelte';
	import EvaluacionList from '$lib/components/evaluacion/EvaluacionList.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import type { EvaluacionItem } from '$lib/schemas/evaluacion.schema';

	import { getEvaluacion, getInstitucionRef, getModeloRef } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let evaluacionItems = getEvaluacion().filter((item) => item.startedAt === null);
	let modeloRef = getModeloRef();
	let institucionRef = getInstitucionRef();

	let modal = createModalManager<EvaluacionItem>();
</script>

<div class="detail-panel">
	<EvaluacionList
		items={evaluacionItems}
		title='Listado de evaluaciones'
		subtitle='Planeacion'
		onClickEditar={modal.handlers('edit').onClickItem}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onClickEjecutarEvaluacion={modal.handlers('iniciar').onClickItem}
		onClickCrear={modal.handlers('create').onClick}
	/>
</div>

<CrearEvaluacionForm
	open={modal.isOpen('create')}
	{modeloRef}
	{institucionRef}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<ConfirmModal
		demo={true}
		formAction='?/execute'
		buttonLabel='iniciar'
		message='¿Deseas iniciar el ciclo de evaluación?'
		title='Iniciar ciclo de evalución'
		open={modal.isOpen('iniciar')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>

	<EditarEvaluacionForm
		open={modal.isOpen('edit')}
		item={modal.selectedItem}
		{modeloRef}
		{institucionRef}
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
