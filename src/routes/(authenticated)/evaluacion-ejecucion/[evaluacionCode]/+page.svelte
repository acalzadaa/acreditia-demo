<script lang="ts">
	import { getEvaluacion, getEvaluacionEtapa } from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import EvaluacionDetail from '$lib/components/evaluacion/EvaluacionDetail.svelte';
	import EvaluacionEtapa from '$lib/components/evaluacion/etapa/EvaluacionEtapa.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let evaluacionItems = getEvaluacion().filter((item) => item.code === evaluacionCode);
	let evaluacionEtapaItems = getEvaluacionEtapa().filter(item=> item.evaluacion.code=== evaluacionCode);
	
</script>

<div class="detail-panel">
	<EvaluacionDetail items={evaluacionItems} title="Detalle de evaluación" />
	<EvaluacionEtapa onClickEditar={()=>{}} items={evaluacionEtapaItems}/>
</div>
