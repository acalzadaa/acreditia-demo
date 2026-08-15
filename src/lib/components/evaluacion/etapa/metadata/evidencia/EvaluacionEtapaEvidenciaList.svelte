<script lang="ts">
	import {
		convertEvaluacionEtapaIndicadorStatusToBadgeVariant,
		formatNumberOfElementsAndText
	} from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionColumn from '$lib/components/ui/accordion/AccordionColumn.svelte';
	import AccordionContent from '$lib/components/ui/accordion/AccordionContent.svelte';
	import AccordionContentItem from '$lib/components/ui/accordion/AccordionContentItem.svelte';
	import AccordionFooter from '$lib/components/ui/accordion/AccordionFooter.svelte';
	import AccordionHeader from '$lib/components/ui/accordion/AccordionHeader.svelte';
	import AccordionHeaderButton from '$lib/components/ui/accordion/AccordionHeaderButton.svelte';
	import AccordionSection from '$lib/components/ui/accordion/AccordionSection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import type { EvaluacionEtapaIndicadorItemFor } from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import type { IdentifyParentChildItemSchema } from '$lib/schemas/shared.schema';
	import { createToggleManager } from '$lib/utils/toogleManager.svelte';
	import EvalucionEtapaIndicadorFooterActions from '../EvalucionEtapaIndicadorFooterActions.svelte';
	type EvidenciaIndicadorItem = EvaluacionEtapaIndicadorItemFor<'evidencia'>;

	interface Props {
		items: EvidenciaIndicadorItem[];
		onClickNoAplica: (item: EvidenciaIndicadorItem) => void;
		onClickFinish: (item: EvidenciaIndicadorItem) => void;
		onClickAceptar: (item: EvidenciaIndicadorItem) => void;
		onClickRechazar: (item: EvidenciaIndicadorItem) => void;
		onClickAddUrl: (item: IdentifyParentChildItemSchema) => void;
		onClickAddFile: (item: IdentifyParentChildItemSchema) => void;
		onClickRemoveUrl: (item: IdentifyParentChildItemSchema) => void;
		onClickRemoveFile: (item: IdentifyParentChildItemSchema) => void;
	}

	const {
		items,
		onClickNoAplica,
		onClickFinish,
		onClickAceptar,
		onClickRechazar,
		onClickAddUrl,
		onClickAddFile,
		onClickRemoveUrl,
		onClickRemoveFile
	}: Props = $props();

	let toggleManager = createToggleManager({ defaultOpen: false, exclusive: true });
</script>

<main class="main-panel--inline">
	<section class="list-view--cards text-body">
		{#each items as item (item.id)}
			<AccordionColumn minWidth="360px" maxWidth="2500px">
				<Accordion>
					<AccordionHeader>
						{#snippet title()}
							<Tag class="text-caption" variant="info">Indicador</Tag>
							<p style="text-transform: capitalize;">
								{item.indicador.name}
							</p>
						{/snippet}

						<Badge
							variant={convertEvaluacionEtapaIndicadorStatusToBadgeVariant(item.status).badgeStatus}
							icon={convertEvaluacionEtapaIndicadorStatusToBadgeVariant(item.status).icon}
						>
							{convertEvaluacionEtapaIndicadorStatusToBadgeVariant(item.status).label}
						</Badge>
					</AccordionHeader>
					<AccordionContent isCollapsible={false}>
						<AccordionContentItem dot={false} label="Campus" value={item.campus.name} />
						<AccordionContentItem
							dot={false}
							label="Unidad académica"
							value={item.unidadAcademica.name}
						/>

						{#if item.metadata.invalidate}
							<AccordionContentItem
								label="Razón de invalidación"
								value={item.metadata.invalidateReason}
							/>
						{/if}
					</AccordionContent>

					<!-- Listado de archivos -->
					<AccordionSection>
						<AccordionHeaderButton
							id={item.id + 'file'}
							isVisible={toggleManager.isOpen(item.id + 'file')}
							onToggle={toggleManager.handlers(item.id + 'file').onClick}
						>
							<Button
								variant="ghost"
								size="sm"
								name="add"
								onClick={() => onClickAddFile({ parentId: item.id })}
							>
								Agregar archivo
							</Button>
							<Tag variant="info"
								>{formatNumberOfElementsAndText(
									item.metadata.file,
									'archivo cargado',
									'archivos cargados'
								)}</Tag
							>
						</AccordionHeaderButton>

						<AccordionContent
							isCollapsible={true}
							isVisible={toggleManager.isOpen(item.id + 'file')}
						>
							{#each item.metadata.file as file (file.id)}
								<AccordionContentItem
									label="Nombre de archivo"
									value={file.filename}
									isVisible={toggleManager.isOpen(item.id + 'file')}
									onAction={() => onClickRemoveFile({ parentId: item.id, childId: file.id })}
									actionIcon="remove"
									actionAriaLabel="remover elemento"
								/>
							{/each}
						</AccordionContent>
					</AccordionSection>

					<!-- Listado de urls -->
					<AccordionSection>
						<AccordionHeaderButton
							id={item.id + 'url'}
							isVisible={toggleManager.isOpen(item.id + 'url')}
							onToggle={toggleManager.handlers(item.id + 'url').onClick}
						>
							<Button
								variant="ghost"
								size="sm"
								name="add"
								onClick={() => onClickAddUrl({ parentId: item.id })}
							>
								Agregar url
							</Button>
							<Tag variant="info"
								>{formatNumberOfElementsAndText(
									item.metadata.url,
									'url agregado',
									'urls agregados'
								)}</Tag
							>
						</AccordionHeaderButton>

						<AccordionContent
							isCollapsible={true}
							isVisible={toggleManager.isOpen(item.id + 'url')}
						>
							{#each item.metadata.url as url (url.id)}
								<AccordionContentItem
									label="Url"
									value={url.url}
									isVisible={toggleManager.isOpen(item.id + 'file')}
									onAction={() => onClickRemoveUrl({ parentId: item.id, childId: url.id })}
									actionIcon="remove"
									actionAriaLabel="remover elemento"
								/>
							{/each}
						</AccordionContent>
					</AccordionSection>

					<AccordionFooter class="accordion-footer">
						<EvalucionEtapaIndicadorFooterActions
							{item}
							{onClickNoAplica}
							{onClickFinish}
							{onClickAceptar}
							{onClickRechazar}
						/>
					</AccordionFooter>
				</Accordion>
			</AccordionColumn>
		{/each}
	</section>
</main>
