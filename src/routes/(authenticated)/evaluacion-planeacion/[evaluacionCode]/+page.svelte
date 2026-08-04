<script lang="ts">
	import { getEvaluacion, getEvaluacionEtapa } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import EvaluacionDetail from '$lib/components/evaluacion/EvaluacionDetail.svelte';
	import EvaluacionPlaneacionEtapaList from '$lib/components/evaluacion/planeacion/EvaluacionPlaneacionEtapaList.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import type { EvaluacionEtapaItem } from '$lib/schemas/evaluacionEtapa.schema';
	import EditarEvaluacionEtapaForm from '$lib/components/evaluacion/planeacion/EditarEvaluacionEtapaForm.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let evaluacionItems = getEvaluacion().filter((item) => item.code === evaluacionCode);
	let evaluacionEtapaItems = getEvaluacionEtapa().filter(
		(item) => item.evaluacion.code === evaluacionCode
	);

	let modal = createModalManager<EvaluacionEtapaItem>();
</script>

<div class="detail-panel">
	<EvaluacionDetail items={evaluacionItems} title="Detalle de evaluación" />
	<EvaluacionPlaneacionEtapaList
		items={evaluacionEtapaItems}
		onEditCalendar={modal.handlers('edit').onClickItem}
	/>
</div>

{#if modal.selectedItem}
	<EditarEvaluacionEtapaForm
		item={modal.selectedItem}
		onClose={modal.close}
		open={modal.isOpen('edit')}
	/>
{/if}
