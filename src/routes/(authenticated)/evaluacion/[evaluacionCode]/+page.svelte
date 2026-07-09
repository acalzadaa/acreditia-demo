<script lang="ts">
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import Evaluacion from '$lib/components/evaluacion/Evaluacion.svelte';
	import { type EvaluacionItem } from '$lib/schemas/evaluacion.schema';
	import EditarEvaluacionForm from '$lib/components/evaluacion/EditarEvaluacionForm.svelte';
	import BorrarEvaluacionForm from '$lib/components/evaluacion/BorrarEvaluacionForm.svelte';
	import RestaurarEvaluacionForm from '$lib/components/evaluacion/RestaurarEvaluacionForm.svelte';
	import {
		getEvaluacion,
		getEvaluacionDetail,
		getInstitucionRef,
		getModeloRef
	} from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import IniciarEvaluacionForm from '$lib/components/evaluacion/IniciarEvaluacionForm.svelte';
	import EvaluacionDetail from '$lib/components/evaluacion/EvaluacionDetail.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let evaluacionItems = getEvaluacion().filter((item) => item.code === evaluacionCode);
	let modeloRef = getModeloRef();
	let institucionRef = getInstitucionRef();
	let evaluacionDetail = getEvaluacionDetail();

	let modal = createModalManager<EvaluacionItem>();
</script>

<div class="detail-panel">
	<Evaluacion
		gridArea="evaluacion"
		showHeader={true}
		title="Evaluacion"
		subtitle={evaluacionCode}
		showDetailIcon={false}
		items={evaluacionItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onClickIniciarEvaluacion={modal.handlers('iniciar').onClickItem}
	/>

	<main class="detail-content">
		<EvaluacionDetail items={evaluacionDetail} />
	</main>
</div>

{#if modal.selectedItem}
	<IniciarEvaluacionForm
		open={modal.isOpen('iniciar')}
		item={modal.selectedItem}
		onClose={modal.close}
	/>

	<EditarEvaluacionForm
		open={modal.isOpen('edit')}
		item={modal.selectedItem}
		{modeloRef}
		{institucionRef}
		onClose={modal.close}
	/>

	<BorrarEvaluacionForm
		open={modal.isOpen('delete')}
		item={modal.selectedItem}
		onClose={modal.close}
	/>

	<RestaurarEvaluacionForm
		open={modal.isOpen('restore')}
		item={modal.selectedItem}
		onClose={modal.close}
	/>
{/if}

<style>
	.detail-content {
		padding-top: var(--space-2);
	}
</style>
