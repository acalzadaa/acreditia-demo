<script lang="ts">
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import Indicador from '$lib/components/indicador/Indicador.svelte';
	import { type IndicadorItem } from '$lib/schemas/indicador.schema';
	import BorrarIndicadorForm from '$lib/components/indicador/BorrarIndicadorForm.svelte';
	import RestaurarIndicadorForm from '$lib/components/indicador/RestaurarIndicadorForm.svelte';
	import CrearIndicadorForm from '$lib/components/indicador/CrearIndicadorForm.svelte';
	import EditarIndicadorForm from '$lib/components/indicador/EditarIndicadorForm.svelte';
	import { getIndicador, getModeloFullRef } from '$lib/stores/data.svelte';

	let indicadorItems = getIndicador();
	let modeloFullRef = getModeloFullRef();

	// ===== SUBHEADER + NAVIGATIONBAR + NOTIFICATIONBAR =====
	let modal = createModalManager<IndicadorItem>();

	/* DETALLE */
	function onClickDetalle(item: IndicadorItem) {
		goto(resolve(`/indicador/${item.code}`));
	}

	function onKeydownDetalle(e: KeyboardEvent, item: IndicadorItem) {
		if (e.key === 'Enter') {
			onClickDetalle(item);
		}
	}
</script>

<div class="detail-panel">
	<Toolbar
		gridArea="toolbar"
		crearTitle="Nuevo indicador"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={true}
		showFilter={true}
	/>
	<main class="detail-content">
		<Indicador
			{indicadorItems}
			onClickEditar={modal.handlers('edit').onClickItem}
			onKeydownEditar={(e, item) => modal.handlers('edit').onKeydownItem(e, item)}
			onClickBorrar={modal.handlers('delete').onClickItem}
			onKeydownBorrar={(e, item) => modal.handlers('delete').onKeydownItem(e, item)}
			onClickRestaurar={modal.handlers('restore').onClickItem}
			onKeydownRestaurar={(e, item) => modal.handlers('restore').onKeydownItem(e, item)}
			onClickDetalle={(item: IndicadorItem) => onClickDetalle(item)}
			onKeydownDetalle={(e: KeyboardEvent, item: IndicadorItem) => onKeydownDetalle(e, item)}
		/>
	</main>
</div>

<!-- MODAL CREAR -->
<CrearIndicadorForm open={modal.isOpen('create')} {modeloFullRef} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarIndicadorForm
		open={modal.isOpen('edit')}
		selectedItem={modal.selectedItem}
		{modeloFullRef}
		onClose={modal.close}
	/>

	<BorrarIndicadorForm
		open={modal.isOpen('delete')}
		selectedItem={modal.selectedItem}
		onClose={modal.close}
	/>

	<RestaurarIndicadorForm
		open={modal.isOpen('restore')}
		selectedItem={modal.selectedItem}
		onClose={modal.close}
	/>
{/if}

<style>
	.detail-panel {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}

	.detail-content {
		flex: 1;
		min-height: 0;
		overflow-y: hidden;
		display: flex;
		flex-direction: column;
	}
</style>
