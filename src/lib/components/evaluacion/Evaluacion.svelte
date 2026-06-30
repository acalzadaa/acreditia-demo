<script lang="ts">
	import { navigateTo } from '$lib/helpers/navigation';
	import type { EvaluacionItem, EvaluacionStatus } from '$lib/schemas/evaluacion.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import PageHeader from '../common/PageHeader.svelte';
	import Badge, { type BadgeStatus } from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		gridArea?: string;
		items?: EvaluacionItem[] | null;
		showDetailIcon?: boolean;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		onClickEditar: (item: EvaluacionItem) => void;
		onClickBorrar: (item: EvaluacionItem) => void;
		onClickRestaurar: (item: EvaluacionItem) => void;
		onClickIniciarEvaluacion: (item: EvaluacionItem) => void;
	}

	const {
		gridArea = 'main',
		showDetailIcon = true,
		showHeader = false,
		title = '',
		subtitle = '',
		items,
		onClickEditar,
		onClickBorrar,
		onClickRestaurar,
		onClickIniciarEvaluacion
	}: Props = $props();

	const STATUS_TO_BADGE_CONFIG: Record<
		EvaluacionStatus,
		{ evaluacionStatus: EvaluacionStatus; badgeStatus: BadgeStatus; label: string }
	> = {
		planned: { evaluacionStatus: 'planned', badgeStatus: 'success', label: 'Planeado' },
		active: { evaluacionStatus: 'active', badgeStatus: 'success', label: 'Activo' },
		completed: { evaluacionStatus: 'completed', badgeStatus: 'warning', label: 'Finalizado' },
		cancelled: { evaluacionStatus: 'cancelled', badgeStatus: 'error', label: 'Cancelado' }
	};

	export function convertStatusToBadgeVariant(status: EvaluacionStatus): {
		evaluacionStatus: EvaluacionStatus;
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
						<th class="col-code">Modelo</th>
						<th class="col-code">Institucion</th>
						<th class="col-code">Código</th>
						<th class="col-name">Nombre</th>
						<th class="col-code">Año</th>
						<th class="col-code">Ciclo</th>
						<th class="col-status">Estatus</th>
						<th class="col-actions">Acciones</th>
					</tr>
				</thead>

				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.modelo?.code}</td>
							<td class="col-code">{item.institucion?.code}</td>
							<td class="col-code">{item.code}</td>
							<td class="col-name">{item.name}</td>
							<td class="col-small-number">{item.year}</td>
							<td class="col-small-number">{item.cycle}</td>
							<td class="col-status">
								<Badge variant={convertStatusToBadgeVariant(item.status).badgeStatus}>
									{convertStatusToBadgeVariant(item.status).label}
								</Badge>
							</td>
							<td class="col-actions">
								{#if showDetailIcon}
									<IconButton
										isDisabled={item.isDeleted}
										name="detail"
										tooltipLabel="Ver detalle"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => navigateTo(item.code)}
									/>
								{/if}
								<IconButton
									isDisabled={convertStatusToBadgeVariant(item.status).evaluacionStatus !==
										'planned' || item.isDeleted}
									name="play"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickIniciarEvaluacion(item)}
								/>
								<IconButton
									isDisabled={convertStatusToBadgeVariant(item.status).evaluacionStatus !==
										'planned' || item.isDeleted}
									name="edit"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickEditar(item)}
								/>
								<IconButton
									isDisabled={convertStatusToBadgeVariant(item.status).evaluacionStatus !==
										'planned' || item.isDeleted}
									name="delete"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickBorrar(item)}
								/>
								<IconButton
									isDisabled={convertStatusToBadgeVariant(item.status).evaluacionStatus !==
										'planned' || !item.isDeleted}
									name="restore"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickRestaurar(item)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message="No hay elementos de evaluacion"></EmptySection>
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
