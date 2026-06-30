<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import Badge, { type BadgeStatus } from '$lib/components/ui/Badge.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import { navigateTo } from '$lib/helpers/navigation';
	import type {
		EvaluacionEtapaIndicadorCampusItem,
		EvaluacionEtapaIndicadorCampusStatus
	} from '$lib/schemas/evaluacionEtapaIndicadorCampus.schema';

	interface Props {
		gridArea?: string;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		showDetails?: boolean;
		showEdit?: boolean;
		onClickEdit?: (item: EvaluacionEtapaIndicadorCampusItem) => void;
		items?: EvaluacionEtapaIndicadorCampusItem[] | null;
	}

	const {
		gridArea = 'main',
		showHeader = false,
		title = '',
		subtitle = '',
		showDetails = true,
		showEdit = false,
		onClickEdit,
		items
	}: Props = $props();

	const STATUS_TO_BADGE_CONFIG: Record<
		EvaluacionEtapaIndicadorCampusStatus,
		{
			indicadorCampusStatus: EvaluacionEtapaIndicadorCampusStatus;
			badgeStatus: BadgeStatus;
			label: string;
		}
	> = {
		new: { indicadorCampusStatus: 'new', badgeStatus: 'info', label: 'Nuevo' },
		working: { indicadorCampusStatus: 'working', badgeStatus: 'warning', label: 'En proceso' },
		ready: { indicadorCampusStatus: 'ready', badgeStatus: 'success', label: 'Enviado' }
	};

	export function convertStatusToBadgeVariant(status: EvaluacionEtapaIndicadorCampusStatus): {
		indicadorCampusStatus: EvaluacionEtapaIndicadorCampusStatus;
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
						<th class="col-code">Evaluacion</th>
						<th class="col-code">Etapa</th>
						<th class="col-code">Indicador</th>
						<th class="col-code">Campus</th>
						<th class="col-status">Estatus</th>
						<th class="col-actions">Acciones</th>
					</tr>
				</thead>

				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-small-number">{item.evaluacion.name}</td>
							<td class="col-name">{item.etapa.name}</td>
							<td class="col-code">{item.indicador.name}</td>
							<td class="col-code">{item.campus.name}</td>
							<td class="col-status">
								<Badge
									variant={convertStatusToBadgeVariant(
										item.status as EvaluacionEtapaIndicadorCampusStatus
									).badgeStatus}
								>
									{convertStatusToBadgeVariant(item.status as EvaluacionEtapaIndicadorCampusStatus)
										.label}
								</Badge>
							</td>
							<td class="col-actions">
								{#if showDetails}
									<IconButton
										isDisabled={convertStatusToBadgeVariant(item.status).indicadorCampusStatus ===
											'ready' || item.isDeleted}
										name="detail"
										tooltipLabel="Ver detalle"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => navigateTo(item.code)}
									/>
								{/if}

								{#if showEdit && onClickEdit}
									<IconButton
										isDisabled={convertStatusToBadgeVariant(item.status).indicadorCampusStatus ===
											'ready' || item.isDeleted}
										name="edit"
										tooltipLabel="Editar registro"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => navigateTo('edit')}
									/>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message="No hay elementos de indicador-campus"></EmptySection>
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
