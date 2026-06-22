<script lang="ts">
	import { page } from '$app/state';
	import IndicadorAreaFuncional from '$lib/components/indicador/area-funcional/IndicadorAreaFuncional.svelte';
	import { getIndicadorAreaFuncional } from '$lib/stores/data.svelte';
	import type { LayoutProps } from './$types';

	let indicadorCode = page.params.indicadorCode;
	let areaFuncionalCode = page.params.areaFuncionalCode;
	let indicadorAreaFuncional = getIndicadorAreaFuncional().filter(
		(item) => item.indicador.code === indicadorCode && item.code === areaFuncionalCode
	);
	let { children }: LayoutProps = $props();
</script>

<main class="detail">
	<IndicadorAreaFuncional
		showDetailIcon={false}
		onClickBorrar={() => {}}
		items={indicadorAreaFuncional}
	/>
	{@render children()}
</main>
