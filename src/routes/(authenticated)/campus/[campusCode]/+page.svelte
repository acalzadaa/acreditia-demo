<script lang="ts">
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import {
		getAreaResponsableRef,
		getCampus,
		getCampusAreaResponsable,
		getCampusUnidadAcademica,
		getUnidadAcademicaRef
	} from '$lib/stores/data.svelte';
	import { page } from '$app/state';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';
	import type { AreaResponsableRef, UnidadAcademicaRef } from '$lib/schemas/shared.schema';
	import CampusDetail from '$lib/components/features/campus/CampusDetail.svelte';
	import CampusAreaResponsableList from '$lib/components/features/campus/area-responsable/CampusAreaResponsableList.svelte';
	import CampusUnidadAcademicaList from '$lib/components/features/campus/unidad-academica/CampusUnidadAcademicaList.svelte';
	import AddCampusAreaResponsableForm from '$lib/components/features/campus/area-responsable/AddCampusAreaResponsableForm.svelte';
	import AddCampusUnidadAcademicaForm from '$lib/components/features/campus/unidad-academica/AddCampusUnidadAcademicaForm.svelte';

	let campusCode = page.params.campusCode;

	let campusItems = getCampus().filter((item) => item.code === campusCode);
	let campusUnidadAcademicaItems = getCampusUnidadAcademica()
		.filter((item) => item.campus.code === campusCode)
		.map((unidadAcademicaItem) => unidadAcademicaItem.unidadAcademica);

	let campusAreaResponsableItems = getCampusAreaResponsable()
		.filter((item) => item.campus.code === campusCode)
		.map((areaResponsableItem) => areaResponsableItem.areaResponsable);

	let unidadAcademicaRef = getUnidadAcademicaRef();
	let areaResponsableRef = getAreaResponsableRef();

	let modalUnidadAcademica = createModalManager<UnidadAcademicaRef>();
	let modalAreaResponsable = createModalManager<AreaResponsableRef>();

	let areaResponsableToggle = createToggle(true);
	let unidadAcademicaToggle = createToggle(true);
</script>

<div class="detail-panel">
	<CampusDetail items={campusItems} subtitle={campusCode} />

	<CampusAreaResponsableList
		items={campusAreaResponsableItems}
		isVisible={areaResponsableToggle.value}
		onClickToggle={areaResponsableToggle.onClick}
		onClickAdd={modalAreaResponsable.handlers('add').onClick}
		onClickRemover={modalAreaResponsable.handlers('remove').onClickItem}
	/>

	<CampusUnidadAcademicaList
		items={campusUnidadAcademicaItems}
		isVisible={unidadAcademicaToggle.value}
		onClickToggle={unidadAcademicaToggle.onClick}
		onClickAdd={modalUnidadAcademica.handlers('add').onClick}
		onClickRemover={modalUnidadAcademica.handlers('remove').onClickItem}
	/>
</div>

<AddCampusAreaResponsableForm
	open={modalAreaResponsable.isOpen('add')}
	{areaResponsableRef}
	onClose={modalAreaResponsable.close}
/>

{#if modalAreaResponsable.selectedItem}
	<ConfirmModal
		demo={true}
		message="¿Desea remover el registro?"
		title="Remover area responsable"
		buttonLabel="Remover"
		open={modalAreaResponsable.isOpen('remove')}
		id={modalAreaResponsable.selectedItem.id}
		onClose={modalAreaResponsable.close}
		actionButtonVariant="critical"
	/>
{/if}

<AddCampusUnidadAcademicaForm
	open={modalUnidadAcademica.isOpen('add')}
	{unidadAcademicaRef}
	onClose={modalUnidadAcademica.close}
/>

{#if modalUnidadAcademica.selectedItem}
	<ConfirmModal
		demo={true}
		message="¿Desea remover el registro?"
		title="Remover unidad academica"
		buttonLabel="Remover"
		open={modalUnidadAcademica.isOpen('remove')}
		id={modalUnidadAcademica.selectedItem.id}
		onClose={modalUnidadAcademica.close}
		actionButtonVariant="critical"
	/>
{/if}
