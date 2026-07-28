<script lang="ts">
	import { page } from '$app/state';
	import AddIndicadorAreaResponsable from '$lib/components/indicador/area-responsable/AddIndicadorAreaResponsable.svelte';
	import IndicadorAreaResponsableList from '$lib/components/indicador/area-responsable/IndicadorAreaResponsableList.svelte';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';
	import type { IndicadorAreaResponsableItem } from '$lib/schemas/indicadorAreaResponsable';
	import { getAreaResponsableRef, getIndicadorAreaResponsable } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let areaResponsableItems = getIndicadorAreaResponsable().filter(
		(item) => item.indicador.code === indicadorCode
	);
	let areaResponsableRef = getAreaResponsableRef();
	let modal = createModalManager<IndicadorAreaResponsableItem>();
</script>

<main>
	<IndicadorAreaResponsableList
		onClickRemover={modal.handlers('remove').onClickItem}
		onClickAdd={modal.handlers('add').onClick}
		items={areaResponsableItems}
	/>
</main>

<!-- MODAL CREAR -->
<AddIndicadorAreaResponsable
	open={modal.isOpen('add')}
	{areaResponsableRef}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<ConfirmModal
		demo={true}
		message="¿Desea remover el registro?"
		title="Remover criterio"
		buttonLabel="Remover"
		open={modal.isOpen('remove')}
		id={modal.selectedItem.id}
		onClose={modal.close}
		actionButtonVariant="critical"
	/>
{/if}
