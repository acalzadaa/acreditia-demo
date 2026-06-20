<script lang="ts">
	import IndicadorDetail from '$lib/components/indicador/IndicadorDetail.svelte';
	import { getIndicadorDetail } from '$lib/stores/data.svelte';

	let indicadorDetailItem = getIndicadorDetail();
</script>

<main>
	<IndicadorDetail items={indicadorDetailItem} />
</main>
