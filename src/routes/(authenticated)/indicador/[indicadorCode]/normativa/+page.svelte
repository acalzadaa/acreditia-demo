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
	import { createToggleManager } from '$lib/components/common/stores/toogleManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let indicadorItem = getIndicador().find((item) => item.code === indicadorCode);

	let indicadorNormativaItems = getIndicadorNormativa().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let modal = createModalManager<IndicadorNormativaItem>();
	let normativaRef = getNormativaRef();
	let toggle = createToggleManager({ defaultOpen: true, exclusive: false });
</script>

<main class="detail-panel">
	<IndicadorDetail title="Indicador" subtitle={indicadorCode} item={indicadorItem} />
	<IndicadorNormativaList
		isVisible={toggle.isOpen('normativa')}
		onClickToggle={toggle.handlers('normativa').onClick}
		onClickAdd={modal.handlers('add').onClick}
		onClickRemover={modal.handlers('remove').onClickItem}
		items={indicadorNormativaItems}
	/>
</main>

<AddIndicadorNormativa open={modal.isOpen('add')} {normativaRef} onClose={modal.close} />

{#if modal.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modal.isOpen('remove')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>
{/if}
