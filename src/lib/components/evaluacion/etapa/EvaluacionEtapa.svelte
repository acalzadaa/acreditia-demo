<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import Badge, { type BadgeStatus } from '$lib/components/ui/Badge.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import { formatDate } from '$lib/helpers/dates';
	import { navigateTo } from '$lib/helpers/navigation';
	import type {
		EvaluacionEtapaItem,
		EvaluacionEtapaStatus
	} from '$lib/schemas/evaluacionEtapa.schema';

	interface Props {
		gridArea?: string;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		items?: EvaluacionEtapaItem[] | null;
		onClickEditar: (item: EvaluacionEtapaItem) => void;
	}

	const {
		gridArea = 'main',
		showHeader = false,
		title = '',
		subtitle = '',
		items,
		onClickEditar
	}: Props = $props();

	const STATUS_TO_BADGE_CONFIG: Record<
		EvaluacionEtapaStatus,
		{ etapaStatus: EvaluacionEtapaStatus; badgeStatus: BadgeStatus; label: string }
	> = {
		planning: { etapaStatus: 'planning', badgeStatus: 'success', label: 'Planeado' },
		ready: { etapaStatus: 'ready', badgeStatus: 'success', label: 'Listo' }
	};

	export function convertStatusToBadgeVariant(status: EvaluacionEtapaStatus): {
		etapaStatus: EvaluacionEtapaStatus;
		badgeStatus: BadgeStatus;
		label: string;
	} {
		return STATUS_TO_BADGE_CONFIG[status];
	}
</script>

<main class="main-panel" style="grid-area: {gridArea}">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<section class="table-container">
		{#if items && items?.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Etapa</th>
						<th class="col-label">Nombre</th>
						<th class="col-date">Fecha inicio</th>
						<th class="col-date">Fecha final</th>
						<th class="col-code">Periodo extraordinario</th>
						<th class="col-date">Periodo inicio</th>
						<th class="col-date">Periodo final</th>
						<th class="col-badge">Estatus</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.etapa.order}</td>
							<td class="col-label">{item.etapa.name}</td>
							<td class="col-date">{formatDate(item.fechaInicio)}</td>
							<td class="col-date">{formatDate(item.fechaFinal)}</td>
							<td class="col-code">
								{#if item.periodoExtraordinario}
									<Icon name="check" />
								{/if}
							</td>
							<td class="col-date">{formatDate(item.periodoExtraordinarioInicio)}</td>
							<td class="col-date">{formatDate(item.periodoExtraordinarioFinal)}</td>
							<td class="col-badge">
								<Badge
									variant={convertStatusToBadgeVariant(item.status as EvaluacionEtapaStatus)
										.badgeStatus}
								>
									{convertStatusToBadgeVariant(item.status as EvaluacionEtapaStatus).label}
								</Badge>
							</td>
							<td class="col-actions-md">
								<div class="col-actions-row">
									<IconButton
										isDisabled={convertStatusToBadgeVariant(item.status).etapaStatus !== 'ready' ||
											item.isDeleted}
										name="detail"
										tooltipLabel="Ver detalle"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => navigateTo(item.etapa.code)}
									/>
									<IconButton
										isDisabled={convertStatusToBadgeVariant(item.status).etapaStatus !==
											'planning' || item.isDeleted}
										name="calendar"
tooltipLabel="Modificar fechas"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickEditar(item)}
									/>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message="No hay elementos de etapa"></EmptySection>
		{/if}
	</section>
</main>

<style>
	/*
 * table-layout: fixed permite que las columnas respeten
 * los anchos declarados en thead th.
 * min-width en la tabla = suma de los min-width de columnas,
 * así la tabla no encoge más allá de donde todo quepa justo.
 *
 * Columnas y sus límites:
 *   parent      → ~20 chars → ~10rem (min: 7rem)
 *   parent      → ~20 chars → ~10rem (min: 7rem)
 *   código      → ~20 chars → ~10rem (min: 7rem)
 *   nombre      → ~50 chars → ~18rem (min: 12rem)
 *   number      → ~20 chars → ~10rem (min: 7rem)
 *   number      → ~20 chars → ~10rem (min: 7rem)
  *   badge       → ~20 chars → ~8rem (min: 6rem)
 *   acciones    → 6 iconos → ~13rem (min: 13rem, fijo)
 *
 * Total mínimo: 7 + 7 + 7 + 12 + 7 + 7 + 6 + 13 = 66rem
 */
	.data-table {
		min-width: 66rem;
	}

	/* =============================================
   COLUMN WIDTHS
   Declara los anchos en thead th para que
   table-layout: fixed los respete en todo el body.
   ============================================= */

	/* Código — corto, no hace wrap */
	.data-table .col-code {
		width: 6rem;
		min-width: 4rem;
		white-space: nowrap;
	}

	.data-table .col-small-number {
		width: 4rem;
		min-width: 2rem;
		white-space: nowrap;
	}

	/* Nombre — mediano, puede hacer wrap si hay presión */
	.data-table .col-name {
		width: 18rem;
		min-width: 12rem;
		/* wrap controlado */
		overflow-wrap: break-word;
		word-break: break-word;
		hyphens: auto;
	}

	/* Badge de estatus — ancho fijo chico */
	.data-table .col-status {
		width: 8rem;
		min-width: 6rem;
		white-space: nowrap;
	}

	/* Acciones — completamente fijo, los 4 iconos siempre caben */
	.data-table .col-actions {
		width: 9rem;
		min-width: 9rem;
		white-space: nowrap;
	}
</style>
