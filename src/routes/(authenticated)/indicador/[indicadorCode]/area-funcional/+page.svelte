<script lang="ts">
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import {
	getAreaFuncionalRef,
		getIndicador,
		getIndicadorAreaFuncional	} from '$lib/components/common/stores/data.svelte';
	import { page } from '$app/state';
	import IndicadorDetail from '$lib/components/features/indicador/IndicadorDetail.svelte';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import type { BaseRef } from '$lib/schemas/shared.schema';
	import { createToggleManager } from '$lib/components/common/stores/toogleManager.svelte';
	import IndicadorAreaFuncionalList from '$lib/components/features/indicador/area-funcional/IndicadorAreaFuncionalList.svelte';
	import AddIndicadorAreaFuncionalForm from '$lib/components/features/indicador/area-funcional/AddIndicadorAreaFuncionalForm.svelte';
	
	let indicadorCode = page.params.indicadorCode;

	let indicadorItem = getIndicador().find((item) => item.code === indicadorCode);

	let indicadorAreaFuncionalItems = getIndicadorAreaFuncional()
		.find((item) => item.indicador.code === indicadorCode)
		?.areaFuncional;

	let areaFuncionalRef = getAreaFuncionalRef();
	let modalAreaFuncional = createModalManager<BaseRef>();
	let toggle = createToggleManager({ defaultOpen: true, exclusive: false });
</script>

<div class="detail-panel">
	<IndicadorDetail title="Indicador" subtitle={indicadorCode} item={indicadorItem} />
	<IndicadorAreaFuncionalList
		items={indicadorAreaFuncionalItems}
		isVisible={toggle.isOpen('area-funcional')}
		onClickToggle={toggle.handlers('area-funcional').onClick}
		onClickAdd={modalAreaFuncional.handlers('add').onClick}
		onClickRemover={modalAreaFuncional.handlers('remove').onClickItem}
	/>
</div>

<AddIndicadorAreaFuncionalForm
	open={modalAreaFuncional.isOpen('add')}
	{areaFuncionalRef}
	onClose={modalAreaFuncional.close}
/>

{#if modalAreaFuncional.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modalAreaFuncional.isOpen('remove')}
		id={modalAreaFuncional.selectedItem.id}
		onClose={modalAreaFuncional.close}
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
