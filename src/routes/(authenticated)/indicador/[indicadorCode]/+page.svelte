<script lang="ts">
	import IndicadorNavList from '$lib/components/indicador/IndicadorNavList.svelte';
	import { getIndicadorNavList } from '$lib/stores/data.svelte';

	let indicadorNavItem = getIndicadorNavList();
</script>

<main class="rubrica-page">
	<IndicadorNavList items={indicadorNavItem} />
</main>

<style>
	.rubrica-page {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
	}
</style>
