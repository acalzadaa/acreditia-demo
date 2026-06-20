<script lang="ts">
	import { page } from '$app/state';
	import Rubrica from '$lib/components/indicador/rubrica/Rubrica.svelte';
	import { getRubrica } from '$lib/stores/data.svelte';
	import type { LayoutProps } from './$types';

	let indicadorCode = page.params.indicadorCode;
	let rubricaCode = page.params.rubricaCode;
	let rubricaItems = getRubrica().filter(
		(item) => item.indicador.code === indicadorCode && item.code === rubricaCode
	);
	let { children }: LayoutProps = $props();
</script>

<main>
	<Rubrica showDetailIcon={false} items={rubricaItems} />
	{@render children()}
</main>
