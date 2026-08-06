<script lang="ts">
	import { getEvaluacion, getEvaluacionEtapa } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import EvaluacionDetail from '$lib/components/evaluacion/EvaluacionDetail.svelte';
	import EvaluacionEtapaNavigationList from '$lib/components/evaluacion/etapa/EvaluacionEtapaNavigationList.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let evaluacionItems = getEvaluacion().filter((item) => item.code === evaluacionCode);
	let evaluacionEtapaItems = getEvaluacionEtapa().filter(
		(item) => item.evaluacion.code === evaluacionCode
	);
	let currentDate = new Date(2025, 10, 10);
</script>

<div class="detail-panel">
	<EvaluacionDetail items={evaluacionItems} title="Detalle de evaluación" />
	<EvaluacionEtapaNavigationList items={evaluacionEtapaItems} {currentDate} />
</div>
