<script lang="ts">
	import { page } from '$app/state';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import AddIndicadorAreaResponsablePicker from '$lib/components/indicador/area-responsable/AddIndicadorAreaResponsablePicker.svelte';
	import BorrarIndicadorAreaResponsableForm from '$lib/components/indicador/area-responsable/BorrarIndicadorAreaResponsableForm.svelte';
	import IndicadorAreaResponsable from '$lib/components/indicador/area-responsable/IndicadorAreaResponsable.svelte';
	import type { IndicadorAreaResponsableItem } from '$lib/schemas/indicadorAreaResponsable';
	import { getAreaResponsableRef, getIndicadorAreaResponsable } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let areaResponsableItems = getIndicadorAreaResponsable().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let areaResponsableRef = getAreaResponsableRef();
	let modal = createModalManager<IndicadorAreaResponsableItem>();
</script>

<main>
	<Toolbar
		gridArea="toolbar"
		crearTitle="Agregar area responsable"
		onClickCrear={modal.handlers('create').onclick}
		onKeydownCrear={(e) => modal.handlers('create').onkeydown(e)}
		showExport={false}
		showFilter={false}
	/>
	<IndicadorAreaResponsable
		onClickBorrar={modal.handlers('delete').onClickItem}
		showDetailIcon={true}
		items={areaResponsableItems}
	/>
</main>

<!-- MODAL CREAR -->
<AddIndicadorAreaResponsablePicker
	open={modal.isOpen('create')}
	{areaResponsableRef}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<BorrarIndicadorAreaResponsableForm
		open={modal.isOpen('delete')}
		selectedItem={modal.selectedItem}
		onClose={modal.close}
	/>
{/if}
