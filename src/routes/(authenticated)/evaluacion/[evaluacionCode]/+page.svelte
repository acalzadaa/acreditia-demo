<script lang="ts">
	import { getEvaluacion, getEvaluacionEtapa } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import EvaluacionDetail from '$lib/components/evaluacion/EvaluacionDetail.svelte';
	import EvaluacionPlaneacionEtapaList from '$lib/components/evaluacion/EvaluacionPlaneacionEtapaList.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let evaluacionItems = getEvaluacion().filter((item) => item.code === evaluacionCode);
	let evaluacionEtapa = getEvaluacionEtapa().filter(
		(item) => item.evaluacion.code === evaluacionCode
	);
</script>

<div class="detail-panel">
	<EvaluacionDetail items={evaluacionItems} title="Detalle de evaluación" />
	<EvaluacionPlaneacionEtapaList items={evaluacionEtapa} />
</div>
