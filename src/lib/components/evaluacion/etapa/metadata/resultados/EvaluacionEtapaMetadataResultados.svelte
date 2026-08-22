<script lang="ts">
	import { extractEtapaItems } from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import type {
		EvaluacionEtapaIndicadorItem,
		EvaluacionEtapaIndicadorItemFor
	} from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import ConfirmAcceptInvalidateModal from '../ConfirmAcceptInvalidateModal.svelte';
	import ConfirmFinishModal from '../ConfirmFinishModal.svelte';
	import ConfirmRejectInvalidateModal from '../ConfirmRejectInvalidateModal.svelte';
	import EditarEtapaResultadosMetaForm from './EditarEtapaResultadosMetaForm.svelte';
	import EvaluacionEtapaResultadosList from './EvaluacionEtapaResultadosList.svelte';
	import InvalidarEtapaResultadosForm from './InvalidarEtapaResultadosForm.svelte';

	interface Props {
		items: EvaluacionEtapaIndicadorItem[];
	}

	const { items }: Props = $props();

	const resultadosItems = $derived(extractEtapaItems(items, 'resultados'));
	const modalResultados = createModalManager<EvaluacionEtapaIndicadorItemFor<'resultados'>>();
</script>

<EvaluacionEtapaResultadosList
	items={resultadosItems}
	onClickEditar={(item) => modalResultados.handlers('edit').onClickItem(item)}
	onClickNoAplica={(item) => modalResultados.handlers('invalidar').onClickItem(item)}
	onClickFinish={(item) => modalResultados.handlers('finish').onClickItem(item)}
	onClickAceptar={(item) => modalResultados.handlers('accept').onClickItem(item)}
	onClickRechazar={(item) => modalResultados.handlers('reject').onClickItem(item)}
/>

{#if modalResultados.selectedItem}
	<EditarEtapaResultadosMetaForm
		open={modalResultados.isOpen('edit')}
		selectedItem={modalResultados.selectedItem}
		onClose={modalResultados.close}
	/>
	<ConfirmFinishModal
		demo={true}
		open={modalResultados.isOpen('finish')}
		id={modalResultados.selectedItem.id}
		onClose={modalResultados.close}
	/>
	<ConfirmAcceptInvalidateModal
		demo={true}
		open={modalResultados.isOpen('accept')}
		id={modalResultados.selectedItem.id}
		onClose={modalResultados.close}
	/>
	<ConfirmRejectInvalidateModal
		demo={true}
		open={modalResultados.isOpen('reject')}
		id={modalResultados.selectedItem.id}
		onClose={modalResultados.close}
	/>
	<InvalidarEtapaResultadosForm
		open={modalResultados.isOpen('invalidar')}
		selectedItem={modalResultados.selectedItem}
		onClose={modalResultados.close}
	/>
{/if}