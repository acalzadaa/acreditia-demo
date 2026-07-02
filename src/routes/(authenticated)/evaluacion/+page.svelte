<script lang="ts">
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import type { EvaluacionItem } from '$lib/schemas/evaluacion.schema';
	import Evaluacion from '$lib/components/evaluacion/Evaluacion.svelte';
	import CrearEvaluacionForm from '$lib/components/evaluacion/CrearEvaluacionForm.svelte';
	import EditarEvaluacionForm from '$lib/components/evaluacion/EditarEvaluacionForm.svelte';
	import BorrarEvaluacionForm from '$lib/components/evaluacion/BorrarEvaluacionForm.svelte';
	import RestaurarEvaluacionForm from '$lib/components/evaluacion/RestaurarEvaluacionForm.svelte';
	import { getEvaluacion, getInstitucionRef, getModeloRef } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import IniciarEvaluacionForm from '$lib/components/evaluacion/IniciarEvaluacionForm.svelte';

	let evaluacionItems = getEvaluacion();
	let modeloRef = getModeloRef();
	let institucionRef = getInstitucionRef();

	// ===== HEADER =====

	let modal = createModalManager<EvaluacionItem>();
</script>

<div class="app-grid">
	<Toolbar
		crearTitle="Nueva evaluacion"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={true}
		showFilter={true}
	/>
	<Evaluacion
		items={evaluacionItems}
		onClickEditar={modal.handlers('edit').onClickItem}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		onClickIniciarEvaluacion={modal.handlers('iniciar').onClickItem}
	/>
</div>

<CrearEvaluacionForm
	open={modal.isOpen('create')}
	{modeloRef}
	{institucionRef}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<IniciarEvaluacionForm
		open={modal.isOpen('iniciar')}
		item={modal.selectedItem}
		onClose={modal.close}
	/>

	<!-- MODAL EDITAR -->
	<EditarEvaluacionForm
		open={modal.isOpen('edit')}
		item={modal.selectedItem}
		{modeloRef}
		{institucionRef}
		onClose={modal.close}
	/>

	<!-- MODAL BORRAR -->
	<BorrarEvaluacionForm
		open={modal.isOpen('delete')}
		item={modal.selectedItem}
		onClose={modal.close}
	/>

	<!-- MODAL RESTAURAR -->
	<RestaurarEvaluacionForm
		open={modal.isOpen('restore')}
		item={modal.selectedItem}
		onClose={modal.close}
	/>
{/if}

<style>
	.app-grid {
		display: grid;
		grid-template-areas:
			'toolbar'
			'main';
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
		height: 100vh;
		position: relative;
		min-width: 600px;
	}
</style>
