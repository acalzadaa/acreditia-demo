<script lang="ts">
	import { page } from '$app/state';
	import IndicadorAreaResponsable from '$lib/components/indicador/area-responsable/IndicadorAreaResponsable.svelte';
	import { getIndicadorAreaResponsable } from '$lib/stores/data.svelte';
	import type { LayoutProps } from './$types';

	let indicadorCode = page.params.indicadorCode;
	let areaResponsableCode = page.params.areaResponsableCode;
	let indicadorAreaResponsable = getIndicadorAreaResponsable().filter(
		(item) => item.indicador.code === indicadorCode && item.code === areaResponsableCode
	);
	let { children }: LayoutProps = $props();
</script>

<main>
	<IndicadorAreaResponsable
		onClickBorrar={() => {}}
		showDetailIcon={false}
		items={indicadorAreaResponsable}
	/>
	{@render children()}
</main>
