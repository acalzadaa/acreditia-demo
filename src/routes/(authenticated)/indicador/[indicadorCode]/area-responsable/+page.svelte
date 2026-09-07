<script lang="ts">
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import {
		getAreaResponsableRef,
		getIndicador,
		getIndicadorAreaResponsable
	} from '$lib/components/common/stores/data.svelte';
	import { page } from '$app/state';
	import IndicadorDetail from '$lib/components/features/indicador/IndicadorDetail.svelte';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import AddIndicadorAreaResponsableForm from '$lib/components/features/indicador/area-responsable/AddIndicadorAreaResponsableForm.svelte';
	import type { AreaResponsableRef } from '$lib/schemas/shared.schema';
	import { createToggleManager } from '$lib/components/common/stores/toogleManager.svelte';
	import IndicadorAreaResponsableList from '$lib/components/features/indicador/area-responsable/IndicadorAreaResponsableList.svelte';

	let indicadorCode = page.params.indicadorCode;

	let indicadorItem = getIndicador().find((item) => item.code === indicadorCode);

	let indicadorAreaResponsableItems = getIndicadorAreaResponsable()
		.find((item) => item.indicador.code === indicadorCode)
		?.areaResponsable.filter((item) => item.type === indicadorItem?.indicadorType);

	let areaResponsableRef = getAreaResponsableRef();
	let modalAreaResponsable = createModalManager<AreaResponsableRef>();
	let toggle = createToggleManager({ defaultOpen: true, exclusive: false });
</script>

<div class="detail-panel">
	<IndicadorDetail title="Indicador" subtitle={indicadorCode} item={indicadorItem} />
	<IndicadorAreaResponsableList
		items={indicadorAreaResponsableItems}
		isVisible={toggle.isOpen('area-responsable')}
		onClickToggle={toggle.handlers('area-responsable').onClick}
		onClickAdd={modalAreaResponsable.handlers('add').onClick}
		onClickRemover={modalAreaResponsable.handlers('remove').onClickItem}
	/>
</div>

<AddIndicadorAreaResponsableForm
	open={modalAreaResponsable.isOpen('add')}
	{areaResponsableRef}
	onClose={modalAreaResponsable.close}
/>

{#if modalAreaResponsable.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modalAreaResponsable.isOpen('remove')}
		id={modalAreaResponsable.selectedItem.id}
		onClose={modalAreaResponsable.close}
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
