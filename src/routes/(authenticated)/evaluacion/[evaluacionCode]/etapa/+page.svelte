<script lang="ts">
	import { getEvaluacionEtapa } from '$lib/stores/data.svelte';
	import EvaluacionEtapa from '$lib/components/evaluacion/etapa/EvaluacionEtapa.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import type { EvaluacionEtapaItem } from '$lib/schemas/evaluacionEtapa.schema';
	import { page } from '$app/state';
	import EditarEvaluacionEtapaForm from '$lib/components/evaluacion/etapa/EditarEvaluacionEtapaForm.svelte';

	let evaluacionCode = page.params.evaluacionCode;
	let evaluacionEtapaItems = getEvaluacionEtapa().filter(
		(item) => item.evaluacion.code === evaluacionCode
	);
	let modalEtapa = createModalManager<EvaluacionEtapaItem>();
</script>

<main>
	<EvaluacionEtapa
		gridArea="etapa"
		showHeader={true}
		title="Etapas de la evaluacion"
		items={evaluacionEtapaItems}
		onClickEditar={modalEtapa.handlers('calendar').onClickItem}
	/>

	{#if modalEtapa.selectedItem}
		<EditarEvaluacionEtapaForm
			open={modalEtapa.isOpen('calendar')}
			item={modalEtapa.selectedItem}
			onClose={modalEtapa.close}
		/>
	{/if}
</main>
