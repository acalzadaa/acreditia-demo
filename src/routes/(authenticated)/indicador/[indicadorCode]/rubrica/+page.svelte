<script lang="ts">
	import { page } from '$app/state';
	import RubricaListViewDetail from '$lib/components/rubrica/RubricaListViewDetail.svelte';
	import { getRubrica } from '$lib/stores/data.svelte';

	let indicadorCode = page.params.indicadorCode;
	let rubricaItems = getRubrica().filter((item) => item.indicador.code === indicadorCode);
</script>

<main>
	<RubricaListViewDetail items={rubricaItems} />
</main>
