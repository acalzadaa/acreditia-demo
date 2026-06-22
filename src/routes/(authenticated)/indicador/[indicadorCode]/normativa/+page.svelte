<script lang="ts">
	import { page } from '$app/state';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import AddIndicadorNormativaPicker from '$lib/components/indicador/normativa/AddIndicadorNormativaPicker.svelte';
	import BorrarIndicadorNormativaForm from '$lib/components/indicador/normativa/BorrarIndicadorNormativaForm.svelte';
	import IndicadorNormativa from '$lib/components/indicador/normativa/IndicadorNormativa.svelte';
	import type { IndicadorNormativaItem } from '$lib/schemas/indicadorNormativa';
	import { getIndicadorNormativa, getNormativaRef } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let indicadorNormativaItems = getIndicadorNormativa().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let modal = createModalManager<IndicadorNormativaItem>();
	let normativaRef = getNormativaRef();
</script>

<main>
	<Toolbar
		gridArea="toolbar"
		crearTitle="Agregar normativa"
		onClickCrear={modal.handlers('create').onclick}
		showExport={false}
		showFilter={false}
	/>
	<IndicadorNormativa onClickBorrar={modal.handlers('delete').onClickItem} showDetailIcon={false} items={indicadorNormativaItems} />
</main>

<!-- MODAL CREAR -->
<AddIndicadorNormativaPicker
	open={modal.isOpen('create')}
	{normativaRef}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<BorrarIndicadorNormativaForm
		open={modal.isOpen('delete')}
		selectedItem={modal.selectedItem}
		onClose={modal.close}
	/>
{/if}
