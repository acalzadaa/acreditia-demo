<script lang="ts">
	import { page } from '$app/state';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import AddIndicadorIndicadorEstrategicoPicker from '$lib/components/indicador/indicador-estrategico/AddIndicadorIndicadorEstrategicoPicker.svelte';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';
	import type { EvidenciaItem } from '$lib/schemas/evidencia.schema';
	import { getIndicadorEvidencia } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let indicadorEvidenciaItem = getIndicadorEvidencia().filter(
		(item) => item.indicador.code === indicadorCode
	);
	
	let modal = createModalManager<EvidenciaItem>();
</script>

<main>
	<Toolbar
		gridArea="toolbar"
		crearTitle="Agregar indicador estrategico"
		onClickCrear={modal.handlers('create').onClick}
		onKeydownCrear={(e) => modal.handlers('create').onKeydown(e)}
		showExport={false}
		showFilter={false}
	/>
	<EvidenciaIndicadorIndicadorEstrategico
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
	<ConfirmModal open={modal.isOpen('delete')} id={modal.selectedItem.id} onClose={modal.close} />
{/if}
