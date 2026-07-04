<script lang="ts">
	import IndicadorDetail from '$lib/components/indicador/IndicadorDetail.svelte';
	import { getIndicadorDetail } from '$lib/stores/data.svelte';

	let indicadorDetailItem = getIndicadorDetail();
</script>

<main class="rubrica-page">
	<IndicadorDetail items={indicadorDetailItem} />
</main>

<style>
	.rubrica-page {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
	}
</style>
