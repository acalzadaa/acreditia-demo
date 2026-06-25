<script lang="ts">
	import { page } from '$app/state';
	import IndicadorCampus from '$lib/components/evaluacion/etapa/indicador-campus/IndicadorCampus.svelte';
	import { getEvaluacionEtapaIndicadorCampus } from '$lib/stores/data.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let etapaCode = page.params.etapaCode;

	let evaluacionEtapaIndicadorCampusItems = getEvaluacionEtapaIndicadorCampus().filter(
		(item) => item.evaluacion.code === evaluacionCode && item.etapa.code === etapaCode
	);
</script>

<main>
	<IndicadorCampus showHeader={true} title='Lista de indicadores por campus' items={evaluacionEtapaIndicadorCampusItems} />
</main>
