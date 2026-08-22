<script lang="ts">
	import { extractEtapaItems } from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';
	import type {
		EvaluacionEtapaIndicadorItem,
		EvaluacionEtapaIndicadorItemFor
	} from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import EvaluacionEtapaAutoevaluacionRevisionDetail from './EvaluacionEtapaAutoevaluacionRevisionDetail.svelte';
	import RetroalimentarEtapaAutoevaluacionRevisionForm from './RetroalimentarEtapaAutoevaluacionRevisionForm.svelte';
	import SeleccionarEtapaAutoevaluacionRevisionForm from './SeleccionarEtapaAutoevaluacionRevisionForm.svelte';

	interface Props {
		items: EvaluacionEtapaIndicadorItem[];
		rubricaItems: RubricaItem[];
	}

	const { items, rubricaItems }: Props = $props();

	const evaluacionRevisionItems = $derived(extractEtapaItems(items, 'autoevaluacion-revision'));
	const modalEvaluacionRevision =
		createModalManager<EvaluacionEtapaIndicadorItemFor<'autoevaluacion-revision'>>();
</script>

<EvaluacionEtapaAutoevaluacionRevisionDetail
	items={evaluacionRevisionItems}
	{rubricaItems}
	onClickSeleccionar={(item) => modalEvaluacionRevision.handlers('select').onClickItem(item)}
	onClickConfirm={(item) => modalEvaluacionRevision.handlers('confirm').onClickItem(item)}
	onClickFeedback={(item) => modalEvaluacionRevision.handlers('feedback').onClickItem(item)}
/>

{#if modalEvaluacionRevision.selectedItem}
	<SeleccionarEtapaAutoevaluacionRevisionForm
		open={modalEvaluacionRevision.isOpen('select')}
		selectedItem={modalEvaluacionRevision.selectedItem}
		onClose={modalEvaluacionRevision.close}
	/>
	<ConfirmModal
		demo={true}
		open={modalEvaluacionRevision.isOpen('confirm')}
		id={modalEvaluacionRevision.selectedItem.id}
		onClose={modalEvaluacionRevision.close}
		message="¿Desea confirmar la revisión de la autoevalución? Una vez confirmada la selección ya no podrá hacer cambios."
		buttonLabel="Confirmar"
	/>
	<RetroalimentarEtapaAutoevaluacionRevisionForm
		open={modalEvaluacionRevision.isOpen('feedback')}
		selectedItem={modalEvaluacionRevision.selectedItem}
		onClose={modalEvaluacionRevision.close}
	/>
{/if}
