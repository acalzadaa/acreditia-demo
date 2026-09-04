<script lang="ts">
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import {
		getIndicador,
		getIndicadorSeccion,
		getModeloFullRef
	} from '$lib/components/common/stores/data.svelte';
	import { page } from '$app/state';
	import IndicadorDetail from '$lib/components/features/indicador/IndicadorDetail.svelte';
	import EditarIndicadorSeccionForm from '$lib/components/features/indicador/seccion/EditarIndicadorSeccionForm.svelte';
	import IndicadorSeccionEditor from '$lib/components/features/indicador/seccion/IndicadorSeccionEditor.svelte';
	import type { IndicadorSeccionItem } from '$lib/schemas/indicadorSeccion.schema';

	let indicadorCode = page.params.indicadorCode;

	let indicadorItem = getIndicador().find((item) => item.code === indicadorCode);
	let modeloFullRef = getModeloFullRef();
	let indicadorSeccionItem = getIndicadorSeccion().find(
		(item) => item.indicador.code === indicadorCode
	);

	let modal = createModalManager<IndicadorSeccionItem>();
</script>

<div class="detail-panel">
	<IndicadorDetail title="Indicador" subtitle={indicadorCode} item={indicadorItem} />
	<IndicadorSeccionEditor
		item={indicadorSeccionItem}
		onClickEditar={modal.handlers('edit').onClickItem}
	/>
</div>

{#if modal.selectedItem}
	<EditarIndicadorSeccionForm
		open={modal.isOpen('edit')}
		{modeloFullRef}
		item={modal.selectedItem}
		onClose={modal.close}
	/>
{/if}

<style>
	.detail-panel {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow-y: auto;
	}
</style>
