<script lang="ts">
	import { page } from '$app/state';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import AddIndicadorIndicadorEstrategicoPicker from '$lib/components/indicador/indicador-estrategico/AddIndicadorIndicadorEstrategicoPicker.svelte';
	import BorrarIndicadorIndicadorEstrategicoForm from '$lib/components/indicador/indicador-estrategico/BorrarIndicadorIndicadorEstrategicoForm.svelte';
	import IndicadorIndicadorEstrategico from '$lib/components/indicador/indicador-estrategico/IndicadorIndicadorEstrategico.svelte';
	import type { IndicadorIndicadorEstrategicoItem } from '$lib/schemas/indicadorIndicadorEstrategico';
	import {
		getIndicadorEstrategicoRef,
		getIndicadorIndicadorEstrategico
	} from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let indicadorIndicadorEstrategicoItems = getIndicadorIndicadorEstrategico().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let indicadorEstrategicoRef = getIndicadorEstrategicoRef();
	let modal = createModalManager<IndicadorIndicadorEstrategicoItem>();
</script>

<main>
	<Toolbar
		gridArea="toolbar"
		actionTitle="Agregar indicador estrategico"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={false}
		showFilter={false}
	/>
	<IndicadorIndicadorEstrategico
		onClickBorrar={modal.handlers('delete').onClickItem}
		showDetailIcon={false}
		items={indicadorIndicadorEstrategicoItems}
	/>
</main>

<!-- MODAL CREAR -->
<AddIndicadorIndicadorEstrategicoPicker
	open={modal.isOpen('create')}
	{indicadorEstrategicoRef}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<BorrarIndicadorIndicadorEstrategicoForm
		open={modal.isOpen('delete')}
		selectedItem={modal.selectedItem}
		onClose={modal.close}
	/>
{/if}
