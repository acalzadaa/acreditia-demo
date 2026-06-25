<script lang="ts">
	import { page } from '$app/state';
	import { getEvaluacionEtapaIndicadorCampus } from '$lib/stores/data.svelte';
	import IndicadorCampus from '$lib/components/evaluacion/etapa/indicador-campus/IndicadorCampus.svelte';
	import type {
		EtapaEvidenciaItem,
		EtapaMetaItem,
		EtapaResultadosItem,
		EvidenciaFileRef,
		EvidenciaUrlRef
	} from '$lib/schemas/etapaMetadata.schema';
	import AddEtapaMetaForm from '$lib/components/evaluacion/etapa/metadata/AddEtapaMetaForm.svelte';
	import AddEtapaEvidenciaForm from '$lib/components/evaluacion/etapa/metadata/AddEtapaEvidenciaForm.svelte';
	import EvidenciaFile from '$lib/components/evaluacion/etapa/metadata/evidencia/EvidenciaFile.svelte';
	import EvidenciaUrl from '$lib/components/evaluacion/etapa/metadata/evidencia/EvidenciaUrl.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import BorrarEvidenciaFileForm from '$lib/components/evaluacion/etapa/metadata/evidencia/BorrarEvidenciaFileForm.svelte';
	import BorrarEvidenciaUrlForm from '$lib/components/evaluacion/etapa/metadata/evidencia/BorrarEvidenciaUrlForm.svelte';
	import AddEtapaResultadosForm from '$lib/components/evaluacion/etapa/metadata/AddEtapaResultadosForm.svelte';

	let etapaCode = page.params.etapaCode;
	let indicadorCampusCode = page.params.indicadorCampusCode;

	let evaluacionEtapaIndicadorCampusItems = getEvaluacionEtapaIndicadorCampus().filter(
		(item) => item.code === indicadorCampusCode && item.etapa.code === etapaCode
	);

	let etapaMetadataItem = getEvaluacionEtapaIndicadorCampus()
		.filter((item) => item.code === indicadorCampusCode)
		.flatMap((item) => item.metadata)[0];

	let modalFile = createModalManager<EvidenciaFileRef>();
	let modalUrl = createModalManager<EvidenciaUrlRef>();

	$inspect(etapaMetadataItem, etapaCode, indicadorCampusCode);
</script>

<main class="page-grid">
	<div class="header-area">
		<IndicadorCampus
			showDetails={false}
			showEdit={false}
			items={evaluacionEtapaIndicadorCampusItems}
		/>
	</div>
	<div class="content-area">
		{#if etapaCode === 'meta'}
			<AddEtapaMetaForm selectedItem={etapaMetadataItem as EtapaMetaItem} />
		{:else if etapaCode === 'evidencia'}
			{@const evidenciaItem = etapaMetadataItem as EtapaEvidenciaItem}
			{@const fileRefs = evidenciaItem.file ?? []}
			{@const urlRefs = evidenciaItem.url ?? []}

			<AddEtapaEvidenciaForm />
			<EvidenciaFile
				items={fileRefs}
				onClickBorrar={(item) => modalFile.handlers('delete').onClickItem(item)}
			/>
			<EvidenciaUrl
				items={urlRefs}
				onClickBorrar={(item) => modalUrl.handlers('delete').onClickItem(item)}
			/>

			{#if modalFile.selectedItem}
				<BorrarEvidenciaFileForm
					open={modalFile.isOpen('delete')}
					item={modalFile.selectedItem}
					onClose={modalFile.close}
				/>
			{/if}

			{#if modalUrl.selectedItem}
				<BorrarEvidenciaUrlForm
					open={modalUrl.isOpen('delete')}
					item={modalUrl.selectedItem}
					onClose={modalUrl.close}
				/>
			{/if}
		{:else if etapaCode === 'resultados'}
			{@const resultadosItems = etapaMetadataItem as EtapaResultadosItem}
			<AddEtapaResultadosForm selectedItem={resultadosItems} />
		{:else}
			<h1>Etapa aun no implementada</h1>
		{/if}
	</div>
</main>

{#if modalFile.isOpen('delete')}
	<h1>add delete file {modalFile.selectedItem?.filename}</h1>
{/if}

{#if modalUrl.isOpen('delete')}
	<h1>delete url {modalUrl.selectedItem?.url}</h1>
{/if}

<style>
	.page-grid {
		display: grid;
		grid-template-areas:
			'header'
			'content';
		grid-template-rows: auto 1fr;
		height: 100%;
		width: 100%;
		min-height: 0;
		overflow: hidden;
	}

	.header-area {
		grid-area: header;
		position: sticky;
		top: 0;
		z-index: 10;
		background-color: var(--bg-ground);
		padding: 1rem;
	}

	.content-area {
		grid-area: content;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		min-height: 0;
	}
</style>
