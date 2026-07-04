<script lang="ts">
	import { page } from '$app/state';
	import RubricaListViewDetail from '$lib/components/rubrica/RubricaListViewDetail.svelte';
	import { getRubrica } from '$lib/stores/data.svelte';

	let indicadorCode = page.params.indicadorCode;
	let rubricaItems = getRubrica().filter((item) => item.indicador.code === indicadorCode);
</script>

<main class="rubrica-page">
	<RubricaListViewDetail showHeader={true} title='Lista de elementos a evaluar' items={rubricaItems} />
</main>

<style>
	.rubrica-page {
		margin-top: var(--space-4);
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
	}
</style>
