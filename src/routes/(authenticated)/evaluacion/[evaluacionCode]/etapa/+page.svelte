<script lang="ts">
	import {
		getEvaluacion,
		getEvaluacionEtapa,
		getInstitucionRef,
		getModeloRef
	} from '$lib/stores/data.svelte';
	import EvaluacionEtapa from '$lib/components/evaluacion/etapa/EvaluacionEtapa.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import type { EvaluacionEtapaItem } from '$lib/schemas/evaluacionEtapa.schema';
	import { page } from '$app/state';
	import EditarEvaluacionEtapaForm from '$lib/components/evaluacion/etapa/EditarEvaluacionEtapaForm.svelte';
	import type { EvaluacionItem } from '$lib/schemas/evaluacion.schema';
	import Evaluacion from '$lib/components/evaluacion/Evaluacion.svelte';
	import IniciarEvaluacionForm from '$lib/components/evaluacion/IniciarEvaluacionForm.svelte';
	import EditarEvaluacionForm from '$lib/components/evaluacion/EditarEvaluacionForm.svelte';
	import BorrarEvaluacionForm from '$lib/components/evaluacion/BorrarEvaluacionForm.svelte';
	import RestaurarEvaluacionForm from '$lib/components/evaluacion/RestaurarEvaluacionForm.svelte';

	let evaluacionCode = page.params.evaluacionCode;

	let evaluacionEtapaItems = getEvaluacionEtapa().filter(
		(item) => item.evaluacion.code === evaluacionCode
	);
	let evaluacionItems = getEvaluacion().filter((item) => item.code === evaluacionCode);
	let modeloRef = getModeloRef();
	let institucionRef = getInstitucionRef();
	let modal = createModalManager<EvaluacionItem>();

	let modalEtapa = createModalManager<EvaluacionEtapaItem>();
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
		<EvaluacionEtapa
			gridArea="etapa"
			showHeader={true}
			title="Etapas de la evaluacion"
			items={evaluacionEtapaItems}
			onClickEditar={modalEtapa.handlers('calendar').onClickItem}
		/>
	</main>
</div>

{#if modalEtapa.selectedItem}
	<EditarEvaluacionEtapaForm
		open={modalEtapa.isOpen('calendar')}
		item={modalEtapa.selectedItem}
		onClose={modalEtapa.close}
	/>
{/if}

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
	.detail-panel {
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
