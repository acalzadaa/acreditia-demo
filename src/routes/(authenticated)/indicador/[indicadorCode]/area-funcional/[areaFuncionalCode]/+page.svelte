<script lang="ts">
	import { page } from '$app/state';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import AddIndicadorSubareaFuncionalPicker from '$lib/components/indicador/area-funcional/subarea-funcional/AddIndicadorSubareaFuncional.svelte';
	import BorrarIndicadorSubareaFuncionalForm from '$lib/components/indicador/area-funcional/subarea-funcional/BorrarIndicadorSubareaFuncionalForm.svelte';
	import IndicadorSubareaFuncional from '$lib/components/indicador/area-funcional/subarea-funcional/IndicadorSubareaFuncional.svelte';
	import type { AreaFuncionalRef } from '$lib/schemas/shared.schema';
	import { getAreaFuncionalRef, getIndicadorAreaFuncional } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let areaFuncionalCode = page.params.areaFuncionalCode;
	let subareaFuncionalItems = getIndicadorAreaFuncional()
		.filter((item) => item.indicador.code === indicadorCode && item.code === areaFuncionalCode)
		.flatMap((item) => item.subareasFuncionales);
	let subareaFuncionalRef = getAreaFuncionalRef();
	let modal = createModalManager<AreaFuncionalRef>();
</script>

<main>
	<Toolbar
		gridArea="toolbar"
		actionTitle="Agregar subarea funcional"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={false}
		showFilter={false}
	/>
	<IndicadorSubareaFuncional
		onClickBorrar={modal.handlers('delete').onClickItem}
		items={subareaFuncionalItems}
	/>

	<!-- MODAL CREAR -->
	<AddIndicadorSubareaFuncionalPicker
		open={modal.isOpen('create')}
		{subareaFuncionalRef}
		onClose={modal.close}
	/>

	{#if modal.selectedItem}
		<BorrarIndicadorSubareaFuncionalForm
			open={modal.isOpen('delete')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>
	{/if}
</main>
