<script lang="ts">
	import EvaluacionDetail from '$lib/components/evaluacion/EvaluacionDetail.svelte';
	import { getEvaluacionDetail } from '$lib/stores/data.svelte';

	let evaluacionDetail = getEvaluacionDetail();
</script>

<main>
	<EvaluacionDetail items={evaluacionDetail} />
</main>
