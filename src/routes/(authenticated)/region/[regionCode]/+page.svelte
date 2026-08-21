<script lang="ts">
	import { getCampusRef, getRegion, getRegionCampus } from '$lib/components/common/stores/data.svelte';
	import { page } from '$app/state';

	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import type { RegionCampusItem } from '$lib/schemas/regionCampus.schema';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';
	import RegionDetail from '$lib/components/features/region/RegionDetail.svelte';
	import AddRegionCampusForm from '$lib/components/features/region/campus/AddRegionCampusForm.svelte';
	import RegionCampusList from '$lib/components/features/region/campus/RegionCampusList.svelte';
	import { createToggle } from '$lib/components/common/stores/toggle.svelte';

	let regionCode = page.params.regionCode;
	let regionItems = getRegion().filter((item) => item.code === regionCode);
	let regionCampusItems = getRegionCampus().filter(
		(item) => !regionItems.some((regionItem) => regionItem.id === item.regionId)
	);
	let campusRef = getCampusRef().filter(
		(item) => !regionCampusItems.some((campusItem) => campusItem?.id === item.id)
	);

	let modalRegionCampus = createModalManager<RegionCampusItem>();
	let regionCampusToggle = createToggle();
</script>

<div class="detail-panel">
	<RegionDetail items={regionItems} showHeader={true} title="Región" subtitle={regionCode} />

	<RegionCampusList
		items={regionCampusItems}
		isVisible={regionCampusToggle.value}
		onClickToggle={regionCampusToggle.onClick}
		onClickAdd={modalRegionCampus.handlers('add').onClick}
		onClickRemover={modalRegionCampus.handlers('remove').onClickItem}
	/>
</div>

<AddRegionCampusForm
	open={modalRegionCampus.isOpen('add')}
	{campusRef}
	onClose={modalRegionCampus.close}
/>

{#if modalRegionCampus.selectedItem}
	<ConfirmModal
		demo={true}
		message="¿Desea remover el registro?"
		title="Remover campus"
		buttonLabel="Remover"
		open={modalRegionCampus.isOpen('remove')}
		id={modalRegionCampus.selectedItem.id}
		onClose={modalRegionCampus.close}
		actionButtonVariant="critical"
	/>
{/if}

