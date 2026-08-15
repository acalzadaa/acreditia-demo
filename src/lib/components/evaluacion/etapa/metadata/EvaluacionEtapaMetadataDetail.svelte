<script lang="ts">
	import type { EtapaCode } from '$lib/schemas/etapaMetadata.schema';
	import type { EvaluacionEtapaIndicadorItem } from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import EvaluacionEtapaMetadataAutoevaluacionRevisionDetail from './autoevaluacion-revision/EvaluacionEtapaMetadataAutoevaluacionRevisionDetail.svelte';
	
	interface Props {
		etapaCode: EtapaCode;
		items: EvaluacionEtapaIndicadorItem[];
		rubricaItems?: RubricaItem[];
	}

	const { items, rubricaItems = [], etapaCode }: Props = $props();
</script>

{#if etapaCode === 'autoevaluacion-revision'}
	<EvaluacionEtapaMetadataAutoevaluacionRevisionDetail {items} {rubricaItems} />
{:else}
	<h1>Etapa aún no implementada</h1>
{/if}
