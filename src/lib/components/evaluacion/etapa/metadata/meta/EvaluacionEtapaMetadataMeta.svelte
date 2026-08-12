<script lang="ts">
	import { extractEtapaItems } from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import type {
		EvaluacionEtapaIndicadorItem,
		EvaluacionEtapaIndicadorItemFor
	} from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import ConfirmAcceptInvalidateModal from '../ConfirmAcceptInvalidateModal.svelte';
	import ConfirmFinishModal from '../ConfirmFinishModal.svelte';
	import ConfirmRejectInvalidateModal from '../ConfirmRejectInvalidateModal.svelte';
	import EditarEtapaMetaForm from './EditarEtapaMetaForm.svelte';
	import EvaluacionEtapaMetaList from './EvaluacionEtapaMetaList.svelte';
	import InvalidarEtapaMetaForm from './InvalidarEtapaMetaForm.svelte';

		interface Props {
		items: EvaluacionEtapaIndicadorItem[];
	}

	const { items }: Props = $props();

	const metaItems = $derived(extractEtapaItems(items, 'meta'));
	const modalMeta = createModalManager<EvaluacionEtapaIndicadorItemFor<'meta'>>();
</script>

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