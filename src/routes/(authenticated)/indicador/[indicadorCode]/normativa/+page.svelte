<script lang="ts">
	import { page } from '$app/state';
	import AddIndicadorNormativa from '$lib/components/indicador/normativa/AddIndicadorNormativa.svelte';
	import IndicadorNormativaList from '$lib/components/indicador/normativa/IndicadorNormativaList.svelte';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import type { IndicadorNormativaItem } from '$lib/schemas/indicadorNormativa';
	import { getIndicadorNormativa, getNormativaRef } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let indicadorNormativaItems = getIndicadorNormativa().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let modal = createModalManager<IndicadorNormativaItem>();
	let normativaRef = getNormativaRef();
</script>

<IndicadorNormativaList
	onClickCrear={modal.handlers('create').onClick}
	onClickRemover={modal.handlers('remove').onClickItem}
	items={indicadorNormativaItems}
/>

<AddIndicadorNormativa open={modal.isOpen('create')} {normativaRef} onClose={modal.close} />

{#if modal.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modal.isOpen('remove')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>
{/if}
