<script lang="ts">
	import type { EtapaCode } from '$lib/schemas/etapaMetadata.schema';
	import type { EvaluacionEtapaIndicadorItem } from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import EvaluacionEtapaMetadataAutoevaluacionEjecucion from './autoevaluacion-ejecucion/EvaluacionEtapaMetadataAutoevaluacionEjecucion.svelte';
	import EvaluacionEtapaMetadataAutoevaluacionRevision from './autoevaluacion-revision/EvaluacionEtapaMetadataAutoevaluacionRevision.svelte';
	import EvaluacionEtapaMetadataEvidencia from './evidencia/EvaluacionEtapaMetadataEvidencia.svelte';
	import EvaluacionEtapaMetadataMeta from './meta/EvaluacionEtapaMetadataMeta.svelte';
	import EvaluacionEtapaMetadataResultados from './resultados/EvaluacionEtapaMetadataResultados.svelte';

	interface Props {
		etapaCode: EtapaCode;
		items: EvaluacionEtapaIndicadorItem[];
		rubricaItems?: RubricaItem[];
	}

	const { items, rubricaItems = [], etapaCode }: Props = $props();
</script>

{#if etapaCode === 'meta'}
	<EvaluacionEtapaMetadataMeta {items} />
{:else if etapaCode === 'evidencia'}
	<EvaluacionEtapaMetadataEvidencia {items} />
{:else if etapaCode === 'resultados'}
	<EvaluacionEtapaMetadataResultados {items} />
{:else if etapaCode === 'autoevaluacion-ejecucion'}
	<EvaluacionEtapaMetadataAutoevaluacionEjecucion {items} {rubricaItems} />
{:else if etapaCode === 'autoevaluacion-revision'}
	<EvaluacionEtapaMetadataAutoevaluacionRevision {items} {rubricaItems} />
{:else if etapaCode === 'planeacion'}
	<!-- TODO -->
{:else if etapaCode === 'ejecucion'}
	<!-- TODO -->
{:else}
	<h1>Etapa aún no implementada</h1>
{/if}
