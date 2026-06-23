<script lang="ts">
	import EtapaDetail from '$lib/components/evaluacion/etapa/EtapaDetail.svelte';
	import { getEtapaDetail } from '$lib/stores/data.svelte';

	let etapaDetail = getEtapaDetail();
</script>

<main>
	<EtapaDetail items={etapaDetail} />
</main>
