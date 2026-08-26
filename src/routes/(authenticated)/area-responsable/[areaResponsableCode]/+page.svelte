<script lang="ts">
	import {
		getAreaResponsable,
		getAreaResponsableEvidencia,
		getAreaResponsablePuesto,
		getEvidenciaRef,
		getPuestoRef
	} from '$lib/components/common/stores/data.svelte';
	import { page } from '$app/state';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import AreaResponsableDetail from '$lib/components/features/area-responsable/AreaResponsableDetail.svelte';
	import AreaResponsablePuestoList from '$lib/components/features/area-responsable/puesto/AreaResponsablePuestoList.svelte';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import type { AreaResponsablePuestoItem } from '$lib/schemas/areaResponsablePuesto.schema';
	import AddAreaResponsablePuestoForm from '$lib/components/features/area-responsable/puesto/AddAreaResponsablePuestoForm.svelte';
	import AreaResponsableEvidenciaList from '$lib/components/features/area-responsable/evidencia/AreaResponsableEvidenciaList.svelte';
	import AddAreaResponsableEvidenciaForm from '$lib/components/features/area-responsable/evidencia/AddAreaResponsableEvidenciaForm.svelte';
	import type { AreaResponsableEvidenciaItem } from '$lib/schemas/areaResponsableEvidencia.schema';

	let areaResponsableCode = page.params.areaResponsableCode;

	let areaResponsableItems = getAreaResponsable().filter(
		(item) => item.code === areaResponsableCode
	);

	let areaResponsablePuestoItems = getAreaResponsablePuesto().filter(
		(item) => item.areaResponsable.code === areaResponsableCode
	);
	let areaResponsableTotalPuestosItem = areaResponsableItems[0].totalPuestos;

	let areaResponsableEvidenciaItems = getAreaResponsableEvidencia().filter(
		(item) => item.areaResponsable.code === areaResponsableCode
	);

	let puestosRef = getPuestoRef('responsable');
	let evidenciaRef = getEvidenciaRef();
	let modalPuesto = createModalManager<AreaResponsablePuestoItem>();
	let modalEvidencia = createModalManager<AreaResponsableEvidenciaItem>();
</script>

<div class="detail-panel">
	<AreaResponsableDetail items={areaResponsableItems} title="Detalle de área responsable" />
	<AreaResponsablePuestoList
		items={areaResponsablePuestoItems}
		totales={areaResponsableTotalPuestosItem}
		onClickAdd={modalPuesto.handlers('add').onClick}
		onClickRemover={modalPuesto.handlers('remove').onClickItem}
	/>
	<AreaResponsableEvidenciaList
		items={areaResponsableEvidenciaItems}
		totales={areaResponsableTotalPuestosItem}
		onClickAdd={modalEvidencia.handlers('add').onClick}
		onClickRemover={modalEvidencia.handlers('remove').onClickItem}
	/>
</div>

<AddAreaResponsablePuestoForm
	open={modalPuesto.isOpen('add')}
	ref={puestosRef}
	onClose={modalPuesto.close}
/>

{#if modalPuesto.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modalPuesto.isOpen('remove')}
		id={modalPuesto.selectedItem.id}
		onClose={modalPuesto.close}
	/>
{/if}

<AddAreaResponsableEvidenciaForm
	open={modalEvidencia.isOpen('add')}
	ref={evidenciaRef}
	onClose={modalEvidencia.close}
/>

{#if modalEvidencia.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modalEvidencia.isOpen('remove')}
		id={modalEvidencia.selectedItem.id}
		onClose={modalEvidencia.close}
	/>
{/if}
