<script lang="ts">
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { page } from '$app/state';
	import { getEtapaDetail, getEvaluacionEtapa } from '$lib/stores/data.svelte';
	import type { EvaluacionEtapaItem } from '$lib/schemas/evaluacionEtapa.schema';
	import EvaluacionEtapa from '$lib/components/evaluacion/etapa/EvaluacionEtapa.svelte';
	import EtapaDetail from '$lib/components/evaluacion/etapa/EtapaDetail.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let etapaCode = page.params.etapaCode;
	let etapaItems = getEvaluacionEtapa().filter(
		(item) => item.evaluacion.code === evaluacionCode && item.etapa.code === etapaCode
	);

	let modalEtapa = createModalManager<EvaluacionEtapaItem>();
	let etapaDetail = getEtapaDetail();
</script>

<main>
	<EvaluacionEtapa
		gridArea="etapa"
		showHeader={true}
		title="Etapas asignadas a la evaluacion"
		items={etapaItems}
		onClickEditar={modalEtapa.handlers('edit').onClickItem}
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
