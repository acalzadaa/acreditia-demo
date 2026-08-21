<script lang="ts">
	import { page } from '$app/state';
	import EvaluacionEtapaDetail from '$lib/components/evaluacion/etapa/EvaluacionEtapaDetail.svelte';
	import EvaluacionEtapaMetadataDetail from '$lib/components/evaluacion/etapa/metadata/EvaluacionEtapaMetadataDetail.svelte';
	import { type EtapaCode } from '$lib/schemas/etapaMetadata.schema';
	import {
		getEvaluacionEtapa,
		getEvaluacionEtapaIndicador,
		getRubrica
	} from '$lib/components/common/stores/data.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let etapaCode = page.params.etapaCode as EtapaCode;
	let evaluacionEtapaIndicadorId = page.params.evaluacionEtapaIndicadorId;

	let etapaItems = getEvaluacionEtapa().filter(
		(item) => item.evaluacion.code === evaluacionCode && item.etapa.code === etapaCode
	);

	let evaluacionEtapaIndicadorItems = getEvaluacionEtapaIndicador().filter(
		(item) =>
			item.evaluacion.code === evaluacionCode &&
			item.etapa.code === etapaCode &&
			item.id === evaluacionEtapaIndicadorId
	);

	const indicadorIds = new Set(evaluacionEtapaIndicadorItems.map((item) => item.indicador.id));

	const rubricaItems = getRubrica().filter((item) => {
		return item?.indicador?.id && indicadorIds.has(item.indicador.id);
	});
</script>

<div class="detail-panel">
	<EvaluacionEtapaDetail items={etapaItems} />
	<div class="detail-content">
		<EvaluacionEtapaMetadataDetail {etapaCode} items={evaluacionEtapaIndicadorItems} {rubricaItems} />
	</div>
</div>
