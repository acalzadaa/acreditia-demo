<script lang="ts">
	import type { EtapaCode } from '$lib/schemas/etapaMetadata.schema';
	import type {
		EvaluacionEtapaIndicadorItem,
		EvaluacionEtapaIndicadorItemFor
	} from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import { createModalManager } from '$lib/utils/modalManager.svelte';

	import { extractEtapaItems } from '../../utils/EvaluacionEtapaIndicadorUtils';
	import EvaluacionEtapaMetaList from './meta/EvaluacionEtapaMetaList.svelte';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';
	import InvalidarEtapaMetaForm from './meta/InvalidarEtapaMetaForm.svelte';
	import EditarEtapaMetaForm from './meta/EditarEtapaMetaForm.svelte';

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
	/>

	{#if modalMeta.selectedItem}
		<EditarEtapaMetaForm
			open={modalMeta.isOpen('edit')}
			selectedItem={modalMeta.selectedItem}
			onClose={modalMeta.close}
		/>
		<ConfirmModal
			demo={true}
			open={modalMeta.isOpen('finish')}
			formAction="?/finish"
			title="Enviar resultados"
			message="¿Desea enviar sus resultados para revision? Una vez enviados ya no se podran hacer cambios."
			buttonLabel="Enviar"
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
	<!-- TODO: mover aquí el bloque `evidencia` de +page.svelte, mismo patrón:
	     extractEtapaMetadata(items, 'evidencia') -> EtapaEvidenciaItem[] -->
{:else if etapaCode === 'autoevaluacion'}
	<!-- TODO -->
{:else if etapaCode === 'revision'}
	<!-- TODO -->
{:else if etapaCode === 'captura'}
	<!-- TODO -->
{:else if etapaCode === 'planeacion'}
	<!-- TODO -->
{:else if etapaCode === 'ejecucion'}
	<!-- TODO -->
{:else}
	<h1>Etapa aún no implementada</h1>
{/if}
