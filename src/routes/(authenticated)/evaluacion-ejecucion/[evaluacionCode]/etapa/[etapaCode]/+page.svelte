<script lang="ts">
	import { page } from '$app/state';
	import { getEtapaDetail, getEvaluacionEtapa } from '$lib/stores/data.svelte';
	import EtapaDetail from '$lib/components/evaluacion/etapa/EtapaDetail.svelte';
	import EvaluacionEtapaDetail from '$lib/components/evaluacion/etapa/metadata/EvaluacionEtapaDetail.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let etapaCode = page.params.etapaCode;
	let etapaItems = getEvaluacionEtapa().filter(
		(item) => item.evaluacion.code === evaluacionCode && item.etapa.code === etapaCode
	);

	let etapaDetail = getEtapaDetail();
</script>

<main>
	<EvaluacionEtapaDetail
		showHeader={true}
		title="Etapas asignadas a la evaluacion"
		items={etapaItems}
	/>
	<div class="detail">
		<EtapaDetail items={etapaDetail} />
	</div>
</main>

<style>
	.detail {
		padding-top: 10px;
	}
</style>
