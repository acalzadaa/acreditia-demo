<script lang="ts">
	import { page } from '$app/state';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import {
		getIndicador,
		getIndicadorPuesto,
		getPuestoRef
	} from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import IndicadorDetail from '$lib/components/features/indicador/IndicadorDetail.svelte';
	import type { IndicadorPuestoItem } from '$lib/schemas/indicadorPuesto.schema';
	import AddIndicadorPuesto from '$lib/components/features/indicador/puesto/AddIndicadorPuesto.svelte';
	import { createToggleManager } from '$lib/components/common/stores/toogleManager.svelte';
	import IndicadorPuestoList from '$lib/components/features/indicador/puesto/IndicadorPuestoList.svelte';

	let indicadorCode = page.params.indicadorCode;
	let indicadorItem = getIndicador().find((item) => item.code === indicadorCode);

	let indicadorPuestoItems = getIndicadorPuesto().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let modal = createModalManager<IndicadorPuestoItem>();
	let puestoRef = getPuestoRef('responsable').filter((item) => item.type === 'directivo');
	let toggle = createToggleManager({ defaultOpen: true, exclusive: false });
</script>

<main class="detail-panel">
	<IndicadorDetail title="Indicador" subtitle={indicadorCode} item={indicadorItem} />
	
	<IndicadorPuestoList
		onClickAdd={modal.handlers('create').onClick}
		isVisible={toggle.isOpen('puesto')}
		onClickToggle={toggle.handlers('puesto').onClick}
		onClickRemover={modal.handlers('remove').onClickItem}
		items={indicadorPuestoItems}
	/>
	
</main>

<AddIndicadorPuesto open={modal.isOpen('create')} {puestoRef} onClose={modal.close} />

{#if modal.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modal.isOpen('remove')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>
{/if}
