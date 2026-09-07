<script lang="ts">
	import { page } from '$app/state';
	import AddIndicadorIndicadorEstrategicoPicker from '$lib/components/features/indicador/indicador-estrategico/AddIndicadorIndicadorEstrategico.svelte';
	import IndicadorIndicadorEstrategicoList from '$lib/components/features/indicador/indicador-estrategico/IndicadorIndicadorEstrategicoList.svelte';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import type { IndicadorIndicadorEstrategicoItem } from '$lib/schemas/indicadorIndicadorEstrategico.schema';
	import {
		getIndicador,
		getIndicadorEstrategicoRef,
		getIndicadorIndicadorEstrategico
	} from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import IndicadorDetail from '$lib/components/features/indicador/IndicadorDetail.svelte';

	let indicadorCode = page.params.indicadorCode;
	let indicadorItem = getIndicador().find((item) => item.code === indicadorCode);

	let indicadorIndicadorEstrategicoItems = getIndicadorIndicadorEstrategico().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let indicadorEstrategicoRef = getIndicadorEstrategicoRef();
	let modal = createModalManager<IndicadorIndicadorEstrategicoItem>();
</script>

<main class="detail-panel">
	<div class="detail-panel--static">
		<IndicadorDetail title="Indicador" subtitle={indicadorCode} item={indicadorItem} />
	</div>

	<div class="detail-content">
		<IndicadorIndicadorEstrategicoList
			onClickRemover={modal.handlers('remove').onClickItem}
			onClickCrear={modal.handlers('create').onClick}
			items={indicadorIndicadorEstrategicoItems}
		/>
	</div>
</main>

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
