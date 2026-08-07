<script lang="ts">
	import { page } from '$app/state';
	import EvaluacionEtapaDetail from '$lib/components/evaluacion/etapa/EvaluacionEtapaDetail.svelte';
	import EvaluacionEtapaMetadataList from '$lib/components/evaluacion/etapa/metadata/EvaluacionEtapaMetadataList.svelte';
	import type { EtapaCode } from '$lib/schemas/etapaMetadata.schema';
	import { getEvaluacionEtapa, getEvaluacionEtapaIndicador } from '$lib/stores/data.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let etapaCode = page.params.etapaCode as EtapaCode;
	let etapaItems = getEvaluacionEtapa().filter(
		(item) => item.evaluacion.code === evaluacionCode && item.etapa.code === etapaCode
	);

	let evaluacionEtapaIndicadorItems = getEvaluacionEtapaIndicador().filter(
		(item) => item.evaluacion.code === evaluacionCode && item.etapa.code === etapaCode
	);
</script>

<EvaluacionEtapaDetail items={etapaItems}/>
<EvaluacionEtapaMetadataList etapaCode={etapaCode} items={evaluacionEtapaIndicadorItems}/>
