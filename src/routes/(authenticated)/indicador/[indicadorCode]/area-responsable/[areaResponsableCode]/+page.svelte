<script lang="ts">
	import { page } from '$app/state';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import AddUnidadAcademicaForm from '$lib/components/indicador/area-responsable/unidad-academica/AddIndicadorUnidadAcademicaPicker.svelte';
	import IndicadorUnidadAcademica from '$lib/components/indicador/area-responsable/unidad-academica/IndicadorUnidadAcademica.svelte';
	import BorrarUnidadAcademicaForm from '$lib/components/unidad-academica/BorrarUnidadAcademicaForm.svelte';
	import type { UnidadAcademicaRef } from '$lib/schemas/shared.schema';
	import { getIndicadorAreaResponsable, getUnidadAcademicaRef } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let areaResponsableCode = page.params.areaResponsableCode;
	let unidadAcademicaItems = getIndicadorAreaResponsable()
		.filter((item) => item.indicador.code === indicadorCode && item.code === areaResponsableCode)
		.flatMap((item) => item.unidadesAcademicas);
	let unidadAcademicaRef = getUnidadAcademicaRef();
	let modal = createModalManager<UnidadAcademicaRef>();
</script>

<main>
	<Toolbar
		gridArea="toolbar"
		crearTitle="Agregar unidad academica"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={false}
		showFilter={false}
	/>
	<IndicadorUnidadAcademica
		onClickBorrar={modal.handlers('delete').onClickItem}
		items={unidadAcademicaItems}
	/>

	<!-- MODAL CREAR -->
	<AddUnidadAcademicaForm
		open={modal.isOpen('create')}
		{unidadAcademicaRef}
		onClose={modal.close}
	/>

	{#if modal.selectedItem}
		<BorrarUnidadAcademicaForm
			open={modal.isOpen('delete')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>
	{/if}
</main>
