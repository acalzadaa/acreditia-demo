<script lang="ts">
	import { extractEtapaItems } from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import type {
		EvaluacionEtapaIndicadorItem	} from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import EvaluacionEtapaAutoevaluacionRevisionList from './EvaluacionEtapaAutoevaluacionRevisionList.svelte';
	
	interface Props {
		items: EvaluacionEtapaIndicadorItem[];
	}

	const { items }: Props = $props();

	const evaluacionRevisionItems = $derived(extractEtapaItems(items, 'autoevaluacion-revision'));
</script>

<EvaluacionEtapaAutoevaluacionRevisionList items={evaluacionRevisionItems} />

