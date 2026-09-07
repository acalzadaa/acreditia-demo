<script lang="ts">
	import { page } from '$app/state';
	import AddIndicadorNormativa from '$lib/components/features/indicador/normativa/AddIndicadorNormativa.svelte';
	import IndicadorNormativaList from '$lib/components/features/indicador/normativa/IndicadorNormativaList.svelte';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import type { IndicadorNormativaItem } from '$lib/schemas/indicadorNormativa.schema';
	import {
		getIndicador,
		getIndicadorNormativa,
		getNormativaRef
	} from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import IndicadorDetail from '$lib/components/features/indicador/IndicadorDetail.svelte';

	let indicadorCode = page.params.indicadorCode;
	let indicadorItem = getIndicador().find((item) => item.code === indicadorCode);

	let indicadorNormativaItems = getIndicadorNormativa().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let modal = createModalManager<IndicadorNormativaItem>();
	let normativaRef = getNormativaRef();
</script>

<main class="detail-panel">
	<div class="detail-panel--static">
		<IndicadorDetail title="Indicador" subtitle={indicadorCode} item={indicadorItem} />
	</div>

	<div class="detail-content">
		<IndicadorNormativaList
			onClickCrear={modal.handlers('create').onClick}
			onClickRemover={modal.handlers('remove').onClickItem}
			items={indicadorNormativaItems}
		/>
	</div>
</main>

<AddIndicadorNormativa open={modal.isOpen('create')} {normativaRef} onClose={modal.close} />

{#if modal.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modal.isOpen('remove')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>
{/if}
