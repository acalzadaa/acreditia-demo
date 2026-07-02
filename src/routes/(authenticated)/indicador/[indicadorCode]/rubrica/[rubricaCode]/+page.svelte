<script lang="ts">
	import { page } from '$app/state';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import BorrarCriterioForm from '$lib/components/indicador/rubrica/criterio/BorrarCriterioForm.svelte';
	import CrearCriterioForm from '$lib/components/indicador/rubrica/criterio/CrearCriterioForm.svelte';
	import EditarCriterioForm from '$lib/components/indicador/rubrica/criterio/EditarCriterioForm.svelte';
	import RestaurarCriterioForm from '$lib/components/indicador/rubrica/criterio/RestaurarCriterioForm.svelte';
	import RubricaCriterio from '$lib/components/indicador/rubrica/criterio/RubricaCriterio.svelte';
	import type { RubricaCriterioItem } from '$lib/schemas/rubricaCriterio.schema';
	import { getRubricaCriterio } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let rubricaCode = page.params.rubricaCode;
	let rubricaCriterioItems = getRubricaCriterio().filter(
		(item) => item.rubrica.code === rubricaCode
	);
	let modal = createModalManager<RubricaCriterioItem>();
</script>

<main>
	<Toolbar
		gridArea="toolbar"
		crearTitle="Crear criterio"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={false}
		showFilter={false}
	/>
	<RubricaCriterio
		onClickEditar={modal.handlers('edit').onClickItem}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onClickRestaurar={modal.handlers('restore').onClickItem}
		items={rubricaCriterioItems}
	/>

	<!-- MODAL CREAR -->
	<CrearCriterioForm open={modal.isOpen('create')} onClose={modal.close} />

	{#if modal.selectedItem}
		<EditarCriterioForm
			open={modal.isOpen('edit')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<BorrarCriterioForm
			open={modal.isOpen('delete')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>

		<RestaurarCriterioForm
			open={modal.isOpen('restore')}
			selectedItem={modal.selectedItem}
			onClose={modal.close}
		/>
	{/if}
</main>
