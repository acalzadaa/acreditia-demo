<script lang="ts">
	import { page } from '$app/state';
	import AddIndicadorIndicadorEstrategicoPicker from '$lib/components/features/indicador/indicador-estrategico/AddIndicadorIndicadorEstrategico.svelte';
	import IndicadorIndicadorEstrategicoList from '$lib/components/features/indicador/indicador-estrategico/IndicadorIndicadorEstrategicoList.svelte';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import type { IndicadorIndicadorEstrategicoItem } from '$lib/schemas/indicadorIndicadorEstrategico';
	import {
		getIndicadorEstrategicoRef,
		getIndicadorIndicadorEstrategico
	} from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let indicadorIndicadorEstrategicoItems = getIndicadorIndicadorEstrategico().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let indicadorEstrategicoRef = getIndicadorEstrategicoRef();
	let modal = createModalManager<IndicadorIndicadorEstrategicoItem>();
</script>

<IndicadorIndicadorEstrategicoList
	onClickRemover={modal.handlers('remove').onClickItem}
	onClickCrear={modal.handlers('create').onClick}
	items={indicadorIndicadorEstrategicoItems}
/>

<AddIndicadorIndicadorEstrategicoPicker
	open={modal.isOpen('create')}
	{indicadorEstrategicoRef}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modal.isOpen('remove')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>
{/if}
