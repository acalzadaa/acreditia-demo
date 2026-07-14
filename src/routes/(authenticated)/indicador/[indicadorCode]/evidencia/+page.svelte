<script lang="ts">
	import { page } from '$app/state';
	import Toolbar from '$lib/components/common/Toolbar.svelte';
	import AddIndicadorEvidenciaPicker from '$lib/components/indicador/evidencia/AddIndicadorEvidenciaPicker.svelte';
	import IndicadorEvidenciaList from '$lib/components/indicador/evidencia/IndicadorEvidenciaList.svelte';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';
	import type { EvidenciaItem } from '$lib/schemas/evidencia.schema';
	import { getIndicadorEvidencia } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { isTelemetryModuleEnabled } from 'storybook/internal/telemetry';

	let indicadorCode = page.params.indicadorCode;
	let indicadorEvidenciaItem = getIndicadorEvidencia().filter(
		(item) => item.indicador.code === indicadorCode
	);

	let evidenciaItem = indicadorEvidenciaItem.map(item => item.evidencia);
	
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
	<IndicadorEvidenciaList
		onClickBorrar={modal.handlers('delete').onClickItem}
		showDetailIcon={false}
		items={evidenciaItem}
	/>
</main>

<!-- MODAL CREAR -->
<AddIndicadorEvidenciaPicker
	open={modal.isOpen('create')}
	{indicadorEstrategicoRef}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<ConfirmModal open={modal.isOpen('delete')} id={modal.selectedItem.id} onClose={modal.close} />
{/if}
