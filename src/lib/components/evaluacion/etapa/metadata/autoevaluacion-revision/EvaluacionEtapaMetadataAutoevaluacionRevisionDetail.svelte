<script lang="ts">
	import { extractEtapaItems } from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';
	import ConfirmModalParentChild from '$lib/components/ui/confirm/ConfirmModalParentChild.svelte';
	import type {
		EvaluacionEtapaIndicadorItem,
		EvaluacionEtapaIndicadorItemFor
	} from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import type { IdentifyParentChildItemSchema } from '$lib/schemas/shared.schema';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import ConfirmAcceptInvalidateModal from '../ConfirmAcceptInvalidateModal.svelte';
	import ConfirmRejectInvalidateModal from '../ConfirmRejectInvalidateModal.svelte';
	import EvaluacionEtapaAutoevaluacionRevisionDetail from './EvaluacionEtapaAutoevaluacionRevisionDetail.svelte';
	import InvalidarEtapaAutoevaluacionRevisionForm from './InvalidarEtapaAutoevaluacionRevisionForm.svelte';

	interface Props {
		items: EvaluacionEtapaIndicadorItem[];
		rubricaItems: RubricaItem[];
	}

	const { items, rubricaItems }: Props = $props();

	const evaluacionRevisionItems = $derived(extractEtapaItems(items, 'autoevaluacion-revision'));
	const modalEvaluacionRevision =
		createModalManager<EvaluacionEtapaIndicadorItemFor<'autoevaluacion-revision'>>();
	const modalEvaluacionRevisionChildren = createModalManager<IdentifyParentChildItemSchema>();
</script>

<EvaluacionEtapaAutoevaluacionRevisionDetail
	items={evaluacionRevisionItems}
	{rubricaItems}
	onClickSeleccionar={(item) =>
		modalEvaluacionRevisionChildren.handlers('seleccionar').onClickItem(item)}
	onClickFinish={(item) => modalEvaluacionRevision.handlers('finish').onClickItem(item)}
/>

{#if modalEvaluacionRevisionChildren.selectedItem}
	<ConfirmModalParentChild
		demo={true}
		open={modalEvaluacionRevisionChildren.isOpen('seleccionar')}
		id={modalEvaluacionRevisionChildren.selectedItem}
		onClose={modalEvaluacionRevisionChildren.close}
		message="¿Desea modificar el nivel de desempeño seleccionado?"
		title="Modificar nivel de desempeño"
		buttonLabel="Modificar"
		actionButtonVariant="primary"
	/>
{/if}

{#if modalEvaluacionRevision.selectedItem}
	<ConfirmModal
		demo={true}
		open={modalEvaluacionRevision.isOpen('finish')}
		id={modalEvaluacionRevision.selectedItem.id}
		onClose={modalEvaluacionRevision.close}
		message="¿Desea confirmar la revisión de la autoevalución?"
		buttonLabel="Confirmar"
	/>

	<ConfirmAcceptInvalidateModal
		demo={true}
		open={modalEvaluacionRevision.isOpen('accept')}
		id={modalEvaluacionRevision.selectedItem.id}
		onClose={modalEvaluacionRevision.close}
	/>

	<ConfirmRejectInvalidateModal
		demo={true}
		open={modalEvaluacionRevision.isOpen('reject')}
		id={modalEvaluacionRevision.selectedItem.id}
		onClose={modalEvaluacionRevision.close}
	/>
	<InvalidarEtapaAutoevaluacionRevisionForm
		open={modalEvaluacionRevision.isOpen('invalidar')}
		selectedItem={modalEvaluacionRevision.selectedItem}
		onClose={modalEvaluacionRevision.close}
	/>
{/if}
