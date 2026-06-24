<script lang="ts">
	import { page } from '$app/state';
	import { getEvaluacionEtapaIndicadorCampus } from '$lib/stores/data.svelte';
	import IndicadorCampus from '$lib/components/evaluacion/etapa/indicador-campus/IndicadorCampus.svelte';
	import type { EtapaMetaItem } from '$lib/schemas/etapaMetadata.schema';
	import AddEtapaMetaForm from '$lib/components/evaluacion/etapa/metadata/AddEtapaMetaForm.svelte';

	let etapaCode = page.params.etapaCode;
	let indicadorCampusCode = page.params.indicadorCampusCode;

	let evaluacionEtapaIndicadorCampusItems = getEvaluacionEtapaIndicadorCampus().filter(
		(item) => item.code === indicadorCampusCode && item.etapa.code === etapaCode
	);

	let etapaMetaItem = getEvaluacionEtapaIndicadorCampus().filter(
		(item) => item.code === indicadorCampusCode
	).flatMap(item => item.metadata as EtapaMetaItem)[0];

</script>

<main>
	<IndicadorCampus
		showDetails={false}
		showEdit={false}
		items={evaluacionEtapaIndicadorCampusItems}
	/>

	<div class="page-center">
		{#if etapaCode === 'meta'}
			<AddEtapaMetaForm selectedItem={etapaMetaItem} />
		{:else}
			<h1>Etapa aun no implementada</h1>
		{/if}
	</div>
</main>

<style>
	.page-center {
		gap: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
