<script lang="ts">
	import { page } from '$app/state';
	import AddIndicadorEvidenciaPicker from '$lib/components/features/indicador/evidencia/AddIndicadorEvidenciaPicker.svelte';
	import EvidenciaSublist from '$lib/components/features/indicador/evidencia/EvidenciaSublist.svelte';
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

<EvidenciaSublist
	onClickAgregar={modal.handlers('add').onClick}
	onClickRemover={modal.handlers('remove').onClickItem}
	items={evidenciaItem}
/>

<!-- MODAL CREAR -->
<AddIndicadorEvidenciaPicker open={modal.isOpen('add')} {evidenciaRef} onClose={modal.close} />

{#if modal.selectedItem}
	<ConfirmModal
		demo={true}
		message="¿Desea remover el registro?"
		title="Remover evidencia"
		buttonLabel="Remover"
		open={modal.isOpen('remove')}
		id={modal.selectedItem.id}
		onClose={modal.close}
		actionButtonVariant="critical"
	/>
{/if}
