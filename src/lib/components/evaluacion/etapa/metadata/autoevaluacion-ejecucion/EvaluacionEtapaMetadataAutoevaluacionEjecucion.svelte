<script lang="ts">
	import { extractEtapaItems } from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import ConfirmModalParentChild from '$lib/components/ui/confirm/ConfirmModalParentChild.svelte';
	import type {
		EvaluacionEtapaIndicadorItem,
		EvaluacionEtapaIndicadorItemFor
	} from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import type { IdentifyParentChildItemSchema } from '$lib/schemas/shared.schema';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import ConfirmAcceptInvalidateModal from '../ConfirmAcceptInvalidateModal.svelte';
	import ConfirmFinishModal from '../ConfirmFinishModal.svelte';
	import ConfirmRejectInvalidateModal from '../ConfirmRejectInvalidateModal.svelte';
	import EvaluacionEtapaAutoevaluacionEjecucionList from './EvaluacionEtapaAutoevaluacionEjecucionList.svelte';
	import InvalidarEtapaAutoevaluacionEjecucionForm from './InvalidarEtapaAutoevaluacionEjecucionForm.svelte';

	interface Props {
		items: EvaluacionEtapaIndicadorItem[];
		rubricaItems: RubricaItem[];
	}

	const { items, rubricaItems }: Props = $props();

	const evaluacionEjecucionItems = $derived(extractEtapaItems(items, 'autoevaluacion-ejecucion'));
	const modalEvaluacionEjecucion =
		createModalManager<EvaluacionEtapaIndicadorItemFor<'autoevaluacion-ejecucion'>>();
	const modalEvaluacionEjecucionChildren = createModalManager<IdentifyParentChildItemSchema>();
</script>

<EvaluacionEtapaAutoevaluacionEjecucionList
	items={evaluacionEjecucionItems}
	{rubricaItems}
	onClickSeleccionar={(item) =>
		modalEvaluacionEjecucionChildren.handlers('seleccionar').onClickItem(item)}
	onClickNoAplica={(item) => modalEvaluacionEjecucion.handlers('invalidar').onClickItem(item)}
	onClickFinish={(item) => modalEvaluacionEjecucion.handlers('finish').onClickItem(item)}
	onClickAceptar={(item) => modalEvaluacionEjecucion.handlers('accept').onClickItem(item)}
	onClickRechazar={(item) => modalEvaluacionEjecucion.handlers('reject').onClickItem(item)}
/>

{#if modalEvaluacionEjecucionChildren.selectedItem}
	<ConfirmModalParentChild
		demo={true}
		open={modalEvaluacionEjecucionChildren.isOpen('seleccionar')}
		id={modalEvaluacionEjecucionChildren.selectedItem}
		onClose={modalEvaluacionEjecucionChildren.close}
		message="¿Desea seleccionar este nivel de desempeño?"
		title="Selección de nivel de desempeño"
	/>
{/if}

{#if modalEvaluacionEjecucion.selectedItem}
	<ConfirmFinishModal
		demo={true}
		open={modalEvaluacionEjecucion.isOpen('finish')}
		id={modalEvaluacionEjecucion.selectedItem.id}
		onClose={modalEvaluacionEjecucion.close}
	/>

	<ConfirmAcceptInvalidateModal
		demo={true}
		open={modalEvaluacionEjecucion.isOpen('accept')}
		id={modalEvaluacionEjecucion.selectedItem.id}
		onClose={modalEvaluacionEjecucion.close}
	/>

	<ConfirmRejectInvalidateModal
		demo={true}
		open={modalEvaluacionEjecucion.isOpen('reject')}
		id={modalEvaluacionEjecucion.selectedItem.id}
		onClose={modalEvaluacionEjecucion.close}
	/>
	<InvalidarEtapaAutoevaluacionEjecucionForm
		open={modalEvaluacionEjecucion.isOpen('invalidar')}
		selectedItem={modalEvaluacionEjecucion.selectedItem}
		onClose={modalEvaluacionEjecucion.close}
	/>
{/if}
