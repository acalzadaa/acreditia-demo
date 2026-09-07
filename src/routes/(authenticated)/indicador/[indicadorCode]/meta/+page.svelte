<script lang="ts">
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import {
		getIndicador,
		getIndicadorMeta	} from '$lib/components/common/stores/data.svelte';
	import { page } from '$app/state';
	import IndicadorDetail from '$lib/components/features/indicador/IndicadorDetail.svelte';
	import IndicadorMetaEditor from '$lib/components/features/indicador/meta/IndicadorMetaEditor.svelte';
	import EditarIndicadorMetaForm from '$lib/components/features/indicador/meta/EditarIndicadorMetaForm.svelte';
	import type { IndicadorMetaItem } from '$lib/schemas/indicadorMeta.schema';

	let indicadorCode = page.params.indicadorCode;

	let indicadorItem = getIndicador().find((item) => item.code === indicadorCode);
	let indicadorMetaItem = getIndicadorMeta().find((item) => item.indicador.code === indicadorCode);

	let modal = createModalManager<IndicadorMetaItem>();
</script>

<div class="detail-panel">
	<IndicadorDetail title="Indicador" subtitle={indicadorCode} item={indicadorItem} />
	<IndicadorMetaEditor
		item={indicadorMetaItem}
		onClickEditar={modal.handlers('edit').onClickItem}
	/>
</div>

{#if modal.selectedItem}
	<EditarIndicadorMetaForm
		open={modal.isOpen('edit')}
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
		overflow-y: auto;
	}
</style>
