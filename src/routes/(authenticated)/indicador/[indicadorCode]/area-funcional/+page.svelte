<script lang="ts">
	import { page } from '$app/state';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import AddIndicadorAreaFuncionalPicker from '$lib/components/indicador/area-funcional/AddIndicadorAreaFuncionalPicker.svelte';
	import BorrarIndicadorAreaFuncionalForm from '$lib/components/indicador/area-funcional/BorrarIndicadorAreaFuncionalForm.svelte';
	import IndicadorAreaFuncional from '$lib/components/indicador/area-funcional/IndicadorAreaFuncional.svelte';
	import type { IndicadorAreaFuncionalItem } from '$lib/schemas/indicadorAreaFuncional';
	import { getAreaFuncionalRef, getIndicadorAreaFuncional } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let areaFuncionalItems = getIndicadorAreaFuncional().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let subareaFuncionalRef = getAreaFuncionalRef();
	let modal = createModalManager<IndicadorAreaFuncionalItem>();
</script>

<main>
	<Toolbar
		gridArea="toolbar"
		actionTitle="Agregar area funcional"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={false}
		showFilter={false}
	/>
	<IndicadorAreaFuncional
		onClickBorrar={modal.handlers('delete').onClickItem}
		showDetailIcon={true}
		items={areaFuncionalItems}
	/>
</main>

<!-- MODAL CREAR -->
<AddIndicadorAreaFuncionalPicker
	open={modal.isOpen('create')}
	{subareaFuncionalRef}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<BorrarIndicadorAreaFuncionalForm
		open={modal.isOpen('delete')}
		selectedItem={modal.selectedItem}
		onClose={modal.close}
	/>
{/if}
