<script lang="ts">
	import { page } from '$app/state';
	import Rubrica from '$lib/components/indicador/rubrica/Rubrica.svelte';
	import { getRubrica } from '$lib/stores/data.svelte';

	let indicadorCode = page.params.indicadorCode;
	let rubricaItems = getRubrica().filter((item) => item.indicador.code === indicadorCode);
</script>

<main>
	<Rubrica showDetailIcon={true} items={rubricaItems} />
</main>
