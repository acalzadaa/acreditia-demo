<script lang="ts">
	import { getAreaFuncional, getAreaFuncionalPuesto, getPuestoRef } from '$lib/components/common/stores/data.svelte';
	import { page } from '$app/state';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import AreaFuncionalDetail from '$lib/components/features/area-funcional/AreaFuncionalDetail.svelte';
	import AreaFuncionalPuestoList from '$lib/components/features/area-funcional/puesto/AreaFuncionalPuestoList.svelte';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import type { AreaFuncionalPuestoItem } from '$lib/schemas/areaFuncionalPuesto.schema';
	import AddAreaFuncionalPuestoForm from '$lib/components/features/area-funcional/puesto/AddAreaFuncionalPuestoForm.svelte';

	let areaFuncionalCode = page.params.areaFuncionalCode;
	let areaFuncionalPuestoItems = getAreaFuncionalPuesto().filter(
		(item) => item.areaFuncional.code === areaFuncionalCode
	);

	let areaFuncionalItems = getAreaFuncional().filter((item) => item.code === areaFuncionalCode);

	let puestosRef = getPuestoRef('funcional');

	let modal = createModalManager<AreaFuncionalPuestoItem>();
</script>

<div class="detail-panel">
	<AreaFuncionalDetail items={areaFuncionalItems} title="Detalle de área funcional" />
	<AreaFuncionalPuestoList
		items={areaFuncionalPuestoItems}
		onClickAdd={modal.handlers('add').onClick}
		onClickRemover={modal.handlers('remove').onClickItem}
	/>
</div>

<AddAreaFuncionalPuestoForm open={modal.isOpen('add')} ref={puestosRef} onClose={modal.close} />

{#if modal.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modal.isOpen('remove')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>
{/if}
