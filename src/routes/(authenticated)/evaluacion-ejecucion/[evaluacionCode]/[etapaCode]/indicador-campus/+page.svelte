<script lang="ts">
	import { page } from '$app/state';
	import Indicador from '$lib/components/evaluacion/etapa/indicador-campus/Indicador.svelte';
	import { getEvaluacionEtapaIndicador } from '$lib/stores/data.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let etapaCode = page.params.etapaCode;

	let evaluacionEtapaIndicadorItems = getEvaluacionEtapaIndicador().filter(
		(item) => item.evaluacion.code === evaluacionCode && item.etapa.code === etapaCode
	);
</script>

<main>
	<Indicador
		showHeader={true}
		title="Lista de indicadores por campus"
		items={evaluacionEtapaIndicadorItems}
	/>
</main>
