<script lang="ts">
	import type { EtapaCode } from '$lib/schemas/etapaMetadata.schema';
	import type {
		EvaluacionEtapaIndicadorItem,
		EvaluacionEtapaIndicadorItemFor
	} from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	import { extractEtapaItems } from '../../utils/EvaluacionEtapaIndicadorUtils';
	import EvaluacionEtapaMetaList from './meta/EvaluacionEtapaMetaList.svelte';
	import InvalidarEtapaMetaForm from './meta/InvalidarEtapaMetaForm.svelte';
	import EditarEtapaMetaForm from './meta/EditarEtapaMetaForm.svelte';
	import ConfirmFinishModal from './ConfirmFinishModal.svelte';
	import ConfirmAcceptInvalidateModal from './ConfirmAcceptInvalidateModal.svelte';
	import ConfirmRejectInvalidateModal from './ConfirmRejectInvalidateModal.svelte';
	import InvalidarEtapaEvidenciaForm from './evidencia/InvalidarEtapaEvidenciaForm.svelte';
	import EvaluacionEtapaEvidenciaList from './evidencia/EvaluacionEtapaEvidenciaList.svelte';
	import type { IdentifyParentChildItemSchema } from '$lib/schemas/shared.schema';
	import ConfirmRemoveModalParentChild from '$lib/components/ui/confirm/ConfirmRemoveModalParentChild.svelte';
	import AddEtapaEvidenciaFileForm from './evidencia/AddEtapaEvidenciaFileForm.svelte';
	import AddEtapaEvidenciaUrlForm from './evidencia/AddEtapaEvidenciaUrlForm.svelte';

	interface Props {
		items: EvaluacionEtapaIndicadorItem[];
		etapaCode: EtapaCode;
	}

	const { items, etapaCode }: Props = $props();
</script>

{#if etapaCode === 'meta'}
	{@const metaItems = extractEtapaItems(items, 'meta')}
	{@const modalMeta = createModalManager<EvaluacionEtapaIndicadorItemFor<'meta'>>()}

	<EvaluacionEtapaMetaList
		items={metaItems}
		onClickEditar={(item) => modalMeta.handlers('edit').onClickItem(item)}
		onClickNoAplica={(item) => modalMeta.handlers('invalidar').onClickItem(item)}
		onClickFinish={(item) => modalMeta.handlers('finish').onClickItem(item)}
		onClickAceptar={(item) => modalMeta.handlers('accept').onClickItem(item)}
		onClickRechazar={(item) => modalMeta.handlers('reject').onClickItem(item)}
	/>

	{#if modalMeta.selectedItem}
		<EditarEtapaMetaForm
			open={modalMeta.isOpen('edit')}
			selectedItem={modalMeta.selectedItem}
			onClose={modalMeta.close}
		/>
		<ConfirmFinishModal
			demo={true}
			open={modalMeta.isOpen('finish')}
			id={modalMeta.selectedItem.id}
			onClose={modalMeta.close}
		/>

		<ConfirmAcceptInvalidateModal
			demo={true}
			open={modalMeta.isOpen('accept')}
			id={modalMeta.selectedItem.id}
			onClose={modalMeta.close}
		/>

		<ConfirmRejectInvalidateModal
			demo={true}
			open={modalMeta.isOpen('reject')}
			id={modalMeta.selectedItem.id}
			onClose={modalMeta.close}
		/>
		<InvalidarEtapaMetaForm
			open={modalMeta.isOpen('invalidar')}
			selectedItem={modalMeta.selectedItem}
			onClose={modalMeta.close}
		/>
	{/if}
{:else if etapaCode === 'evidencia'}
	{@const evidenciaItems = extractEtapaItems(items, 'evidencia')}
	{@const modalEvidencia = createModalManager<EvaluacionEtapaIndicadorItemFor<'evidencia'>>()}
	{@const modalEvidenciaChildren = createModalManager<IdentifyParentChildItemSchema>()}

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
{:else if etapaCode === 'captura'}
	<!-- TODO -->
{:else if etapaCode === 'autoevaluacion'}
	<!-- TODO -->
{:else if etapaCode === 'revision'}
	<!-- TODO -->
{:else if etapaCode === 'planeacion'}
	<!-- TODO -->
{:else if etapaCode === 'ejecucion'}
	<!-- TODO -->
{:else}
	<h1>Etapa aún no implementada</h1>
{/if}
