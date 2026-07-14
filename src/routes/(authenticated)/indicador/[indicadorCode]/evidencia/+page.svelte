<script lang="ts">
	import { page } from '$app/state';
	import AddIndicadorEvidenciaPicker from '$lib/components/indicador/evidencia/AddIndicadorEvidenciaPicker.svelte';
	import EvidenciaSublist from '$lib/components/indicador/evidencia/EvidenciaSublist.svelte';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';
	import type { EvidenciaItem } from '$lib/schemas/evidencia.schema';
	import { getEvidenciaRef, getIndicadorEvidencia } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let indicadorEvidenciaItem = getIndicadorEvidencia().filter(
		(item) => item.indicador.code === indicadorCode
	);

	let evidenciaItem = indicadorEvidenciaItem.map((item) => item.evidencia);

	let evidenciaRef = getEvidenciaRef();
	let modal = createModalManager<EvidenciaItem>();
</script>

<main>
	<EvidenciaSublist
		onClickAgregar={modal.handlers('add').onClick}
		onClickRemover={modal.handlers('remove').onClickItem}
		items={evidenciaItem}
	/>
</main>

<!-- MODAL CREAR -->
<AddIndicadorEvidenciaPicker
	open={modal.isOpen('create')}
	{evidenciaRef}
	onClose={modal.close}
/>

{#if modal.selectedItem}
	<ConfirmModal open={modal.isOpen('delete')} id={modal.selectedItem.id} onClose={modal.close} />
{/if}
