<script lang="ts">
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';
	import { getEvaluacionEtapa } from '$lib/stores/data.svelte';
	import type { EvaluacionEtapaItem } from '$lib/schemas/evaluacionEtapa.schema';
	import EvaluacionEtapa from '$lib/components/evaluacion/etapa/EvaluacionEtapa.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let etapaCode = page.params.etapaCode;
	let etapaItems = getEvaluacionEtapa().filter(
		(item) => item.evaluacion.code === evaluacionCode && item.etapa.code === etapaCode
	);

	let modalEtapa = createModalManager<EvaluacionEtapaItem>();
	let { children }: LayoutProps = $props();
</script>

<main>
	<EvaluacionEtapa
		gridArea="etapa"
		showHeader={true}
		title="Etapas asignadas a la evaluacion"
		items={etapaItems}
		onClickEditar={modalEtapa.handlers('edit').onClickItem}
	/>
	{@render children()}
</main>
