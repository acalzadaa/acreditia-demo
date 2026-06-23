<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';
	import { getEvaluacionEtapaIndicadorCampus } from '$lib/stores/data.svelte';
	import IndicadorCampus from '$lib/components/evaluacion/etapa/indicador-campus/IndicadorCampus.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import type { EvaluacionEtapaIndicadorCampusItem } from '$lib/schemas/evaluacionEtapaIndicadorCampus.schema';

	let indicadorCampusCode = page.params.indicadorCampusCode;

	let evaluacionEtapaIndicadorCampusItems = getEvaluacionEtapaIndicadorCampus().filter(
		(item) => item.code === indicadorCampusCode
	);
	let modal = createModalManager<EvaluacionEtapaIndicadorCampusItem>();

	let { children }: LayoutProps = $props();
</script>

<main>
	<IndicadorCampus
		showDetails={false}
		showEdit={true}
		onClickEdit={modal.handlers('edit').onClickItem}
		items={evaluacionEtapaIndicadorCampusItems}
	/>

	<div class="detail">
		{@render children()}
	</div>
</main>

<style>
	.detail {
		padding-top: 10px;
	}
</style>
