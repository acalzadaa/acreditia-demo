<script lang="ts">
	import { page } from '$app/state';
	import EtapaMetaForm from '$lib/components/evaluacion/etapa/EtapaMetaForm.svelte';
	import { getEvaluacionEtapaIndicadorCampus } from '$lib/stores/data.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let etapaCode = page.params.etapaCode;
	let indicadorCampus = page.params.indicadorCampusCode;
    let metaItem = getEvaluacionEtapaIndicadorCampus().filter(item=> item.evaluacion.code === evaluacionCode &&
        item.etapa.code === etapaCode &&
        item.code === indicadorCampus).flatMap(item => item.metadata as EtapaMetaForm)[0];
</script>

{#if etapaCode === 'meta'}
	<EtapaMetaForm item={metaItem}/>
{:else if etapaCode === 'nometa'}
	<h1>test</h1>
{/if}
