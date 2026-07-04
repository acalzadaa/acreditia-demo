<script lang="ts">
	import IndicadorDetail from '$lib/components/indicador/IndicadorDetail.svelte';
	import { getIndicadorDetail } from '$lib/stores/data.svelte';

	let indicadorDetailItem = getIndicadorDetail();
</script>

<main class="rubrica-page">
	<IndicadorDetail showHeader={true} title='Lista de componentes del indicador' items={indicadorDetailItem} />
</main>

<style>
	.rubrica-page {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
	}
</style>
