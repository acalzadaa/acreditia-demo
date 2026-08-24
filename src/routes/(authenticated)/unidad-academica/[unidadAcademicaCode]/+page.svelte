<script lang="ts">
	import {
		getPuestoRef,
		getUnidadAcademica,
		getUnidadAcademicaAreaResponsable
	} from '$lib/components/common/stores/data.svelte';
	import { page } from '$app/state';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import ConfirmRemoveModal from '$lib/components/ui/confirm/ConfirmRemoveModal.svelte';
	import UnidadAcademicaDetail from '$lib/components/features/unidad-academica/UnidadAcademicaDetail.svelte';
	import type { UnidadAcademicaAreaResponsableItem } from '$lib/schemas/unidadAcademicaAreaResponsable.schema';
	import UnidadAcademicaAreaResponsableList from '$lib/components/features/unidad-academica/puesto/UnidadAcademicaAreaResponsableList.svelte';
	import AddUnidadAcademicaAreaResponsableForm from '$lib/components/features/unidad-academica/puesto/AddUnidadAcademicaAreaResponsableForm.svelte';

	let unidadAcademicaCode = page.params.unidadAcademicaCode;
	let unidadAcademicaPuestoItems = getUnidadAcademicaAreaResponsable().filter(
		(item) => item.unidadAcademica.code === unidadAcademicaCode
	);

	let unidadAcademicaItems = getUnidadAcademica().filter(
		(item) => item.code === unidadAcademicaCode
	);

	let puestosRef = getPuestoRef('responsable');

	let modal = createModalManager<UnidadAcademicaAreaResponsableItem>();
</script>

<div class="detail-panel">
	<UnidadAcademicaDetail items={unidadAcademicaItems} title="Detalle de la unidad académica" />
	<UnidadAcademicaAreaResponsableList
		items={unidadAcademicaPuestoItems}
		onClickAdd={modal.handlers('add').onClick}
		onClickRemover={modal.handlers('remove').onClickItem}
	/>
</div>

<AddUnidadAcademicaAreaResponsableForm open={modal.isOpen('add')} ref={puestosRef} onClose={modal.close} />

{#if modal.selectedItem}
	<ConfirmRemoveModal
		demo={true}
		open={modal.isOpen('remove')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>
{/if}
