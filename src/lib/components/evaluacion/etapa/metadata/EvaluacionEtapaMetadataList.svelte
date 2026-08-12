<script lang="ts">
	import type { EtapaCode } from '$lib/schemas/etapaMetadata.schema';
	import type { EvaluacionEtapaIndicadorItem } from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import EvaluacionEtapaMetadataEvidencia from './evidencia/EvaluacionEtapaMetadataEvidencia.svelte';
	import EvaluacionEtapaMetadataMeta from './meta/EvaluacionEtapaMetadataMeta.svelte';
	import EvaluacionEtapaMetadataResultados from './resultados/EvaluacionEtapaMetadataResultados.svelte';

	interface Props {
		items: EvaluacionEtapaIndicadorItem[];
		etapaCode: EtapaCode;
	}

	const { items, etapaCode }: Props = $props();
</script>

{#if etapaCode === 'meta'}
	<EvaluacionEtapaMetadataMeta {items} />
{:else if etapaCode === 'evidencia'}
	<EvaluacionEtapaMetadataEvidencia {items} />
{:else if etapaCode === 'resultados'}
	<EvaluacionEtapaMetadataResultados {items} />
{:else if etapaCode === 'autoevaluacion'}
	<!-- TODO -->
{:else if etapaCode === 'revision'}
	<!-- TODO -->
{:else if etapaCode === 'planeacion'}
	<!-- TODO -->
{:else if etapaCode === 'ejecucion'}
	<!-- TODO -->
{:else}
	<h1>Etapa aún no implementada</h1>
{/if}
