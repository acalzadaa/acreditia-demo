<script lang="ts">
	import type {
		EvaluacionEtapaIndicadorItem,
		EvaluacionEtapaIndicadorItemFor
	} from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import type { IdentifyParentChildItemSchema } from '$lib/schemas/shared.schema';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	import ConfirmRemoveModalParentChild from '$lib/components/ui/confirm/ConfirmRemoveModalParentChild.svelte';
	import { extractEtapaItems } from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import EvaluacionEtapaEvidenciaList from './EvaluacionEtapaEvidenciaList.svelte';
	import AddEtapaEvidenciaFileForm from './AddEtapaEvidenciaFileForm.svelte';
	import AddEtapaEvidenciaUrlForm from './AddEtapaEvidenciaUrlForm.svelte';
	import ConfirmFinishModal from '../ConfirmFinishModal.svelte';
	import ConfirmAcceptInvalidateModal from '../ConfirmAcceptInvalidateModal.svelte';
	import ConfirmRejectInvalidateModal from '../ConfirmRejectInvalidateModal.svelte';
	import InvalidarEtapaEvidenciaForm from './InvalidarEtapaEvidenciaForm.svelte';

	interface Props {
		items: EvaluacionEtapaIndicadorItem[];
	}

	const { items }: Props = $props();
	const evidenciaItems = $derived(extractEtapaItems(items, 'evidencia'));
	const modalEvidencia = createModalManager<EvaluacionEtapaIndicadorItemFor<'evidencia'>>();
	const modalEvidenciaChildren = createModalManager<IdentifyParentChildItemSchema>();
</script>

<EvaluacionEtapaEvidenciaList
	items={evidenciaItems}
	onClickNoAplica={(item) => modalEvidencia.handlers('invalidar').onClickItem(item)}
	onClickFinish={(item) => modalEvidencia.handlers('finish').onClickItem(item)}
	onClickAceptar={(item) => modalEvidencia.handlers('accept').onClickItem(item)}
	onClickRechazar={(item) => modalEvidencia.handlers('reject').onClickItem(item)}
	onClickAddFile={(item) => modalEvidenciaChildren.handlers('addFile').onClickItem(item)}
	onClickAddUrl={(item) => modalEvidenciaChildren.handlers('addUrl').onClickItem(item)}
	onClickRemoveFile={(item) => modalEvidenciaChildren.handlers('removeFile').onClickItem(item)}
	onClickRemoveUrl={(item) => modalEvidenciaChildren.handlers('removeUrl').onClickItem(item)}
/>

{#if modalEvidenciaChildren.selectedItem}
	<ConfirmRemoveModalParentChild
		demo={true}
		id={modalEvidenciaChildren.selectedItem}
		formAction="?/removeFile"
		open={modalEvidenciaChildren.isOpen('removeFile')}
		onClose={modalEvidenciaChildren.close}
	/>
	<ConfirmRemoveModalParentChild
		demo={true}
		id={modalEvidenciaChildren.selectedItem}
		formAction="?/removeUrl"
		open={modalEvidenciaChildren.isOpen('removeUrl')}
		onClose={modalEvidenciaChildren.close}
	/>
	<AddEtapaEvidenciaFileForm
		open={modalEvidenciaChildren.isOpen('addFile')}
		onClose={modalEvidenciaChildren.close}
	/>

	<AddEtapaEvidenciaUrlForm
		open={modalEvidenciaChildren.isOpen('addUrl')}
		onClose={modalEvidenciaChildren.close}
	/>
{/if}

{#if modalEvidencia.selectedItem}
	<ConfirmFinishModal
		demo={true}
		open={modalEvidencia.isOpen('finish')}
		id={modalEvidencia.selectedItem.id}
		onClose={modalEvidencia.close}
	/>

	<ConfirmAcceptInvalidateModal
		demo={true}
		open={modalEvidencia.isOpen('accept')}
		id={modalEvidencia.selectedItem.id}
		onClose={modalEvidencia.close}
	/>

	<ConfirmRejectInvalidateModal
		demo={true}
		open={modalEvidencia.isOpen('reject')}
		id={modalEvidencia.selectedItem.id}
		onClose={modalEvidencia.close}
	/>
	<InvalidarEtapaEvidenciaForm
		open={modalEvidencia.isOpen('invalidar')}
		selectedItem={modalEvidencia.selectedItem}
		onClose={modalEvidencia.close}
	/>
{/if}
