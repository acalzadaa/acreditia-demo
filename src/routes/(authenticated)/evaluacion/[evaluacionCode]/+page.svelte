<script lang="ts">
	import {
		getEvaluacion	} from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import EvaluacionDetail from '$lib/components/evaluacion/EvaluacionDetail.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let evaluacionItems = getEvaluacion().filter((item) => item.code === evaluacionCode);

</script>

<EvaluacionDetail items={evaluacionItems} title="Detalle de evaluación" />
