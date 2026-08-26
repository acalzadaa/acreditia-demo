<script lang="ts">
	import { page } from '$app/state';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import CrearRubricaCriterioForm from '$lib/components/features/indicador/rubrica/CrearRubricaCriterioForm.svelte';
	import RubricaCriterioList from '$lib/components/features/indicador/rubrica/RubricaCriterioList.svelte';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import type { RemoverRubricaCriterioItem } from '$lib/schemas/rubricaCriterio.schema';
	import { getRubrica } from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';

	let indicadorCode = page.params.indicadorCode;
	let rubricaItems = getRubrica().filter((item) => item.indicador.code === indicadorCode);

	let modal = createModalManager<RubricaItem>();
	let modalCriterio = createModalManager<RemoverRubricaCriterioItem>();
</script>

<main class="detail-panel">
	<PageHeader title="Niveles de desempeño" subtitle='Agrégue los critérios de evaluación'/>
	<RubricaCriterioList
		items={rubricaItems}
		onClickRemover={modalCriterio.handlers('remove').onClickItem}
		onClickAdd={modal.handlers('add').onClickItem}
	/>

	<CrearRubricaCriterioForm
		open={modal.isOpen('add')}
		onClose={modal.close}
	/>

	{#if modalCriterio.selectedItem}
		<ConfirmModal
			demo={true}
			message="¿Desea remover el registro?"
			title="Remover criterio"
			buttonLabel="Remover"
			open={modalCriterio.isOpen('remove')}
			id={modalCriterio.selectedItem.id}
			onClose={modalCriterio.close}
			actionButtonVariant="critical"
		/>
	{/if}
</main>
