<script lang="ts">
	import {
		getAreaResponsable,
		getAreaResponsablePuesto,
		getPuestoRef
	} from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import AreaResponsableDetail from '$lib/components/features/area-responsable/AreaResponsableDetail.svelte';
	import AreaResponsablePuestoList from '$lib/components/features/area-responsable/puesto/AreaResponsablePuestoList.svelte';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import type { AreaResponsablePuestoItem } from '$lib/schemas/areaResponsablePuesto.schema';
	import AddAreaResponsablePuestoForm from '$lib/components/features/area-responsable/puesto/AddAreaResponsablePuestoForm.svelte';

	let areaResponsableCode = page.params.areaResponsableCode;
	let areaResponsablePuestoItems = getAreaResponsablePuesto().filter(
		(item) => item.areaResponsable.code === areaResponsableCode
	);

	let areaResponsableItems = getAreaResponsable().filter(
		(item) => item.code === areaResponsableCode
	);

	let puestosRef = getPuestoRef('responsable');

	let modal = createModalManager<AreaResponsablePuestoItem>();
</script>

<div class="detail-panel">
	<AreaResponsableDetail items={areaResponsableItems} title="Detalle de área responsable" />
	<AreaResponsablePuestoList
		items={areaResponsablePuestoItems}
		onClickAdd={modal.handlers('add').onClick}
		onClickRemover={modal.handlers('remove').onClickItem}
	/>
</div>

<AddAreaResponsablePuestoForm open={modal.isOpen('add')} ref={puestosRef} onClose={modal.close} />

{#if modal.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modal.isOpen('remove')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>
{/if}
