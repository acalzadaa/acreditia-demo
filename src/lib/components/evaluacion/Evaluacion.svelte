<script lang="ts">
	import type {
		EvaluacionStatus,
		EvaluacionWithRelationsItem
	} from '$lib/schemas/evaluacion.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge, { type BadgeStatus } from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		items?: EvaluacionWithRelationsItem[] | null;
		onClickEditar: (item: EvaluacionWithRelationsItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: EvaluacionWithRelationsItem) => void;
		onClickBorrar: (item: EvaluacionWithRelationsItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: EvaluacionWithRelationsItem) => void;
		onClickRestaurar: (item: EvaluacionWithRelationsItem) => void;
		onKeydownRestaurar: (e: KeyboardEvent, item: EvaluacionWithRelationsItem) => void;
		onClickDetalle: (item: EvaluacionWithRelationsItem) => void;
		onKeydownDetalle: (e: KeyboardEvent, item: EvaluacionWithRelationsItem) => void;
		onClickIniciarEvaluacion: (item: EvaluacionWithRelationsItem) => void;
		onKeydownIniciarEvaluacion: (e: KeyboardEvent, item: EvaluacionWithRelationsItem) => void;
	}

	const {
		items,
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar,
		onClickRestaurar,
		onKeydownRestaurar,
		onClickDetalle,
		onKeydownDetalle,
		onClickIniciarEvaluacion,
		onKeydownIniciarEvaluacion
	}: Props = $props();

	const STATUS_TO_BADGE_CONFIG: Record<EvaluacionStatus, { status: BadgeStatus; label: string }> = {
		planned: { status: 'info', label: 'Planeado' },
		active: { status: 'success', label: 'Activo' },
		completed: { status: 'warning', label: 'Finalizado' },
		cancelled: { status: 'error', label: 'Cancelado' }
	};

	export function convertStatusToBadgeVariant(status: EvaluacionStatus): {
		status: BadgeStatus;
		label: string;
	} {
		return STATUS_TO_BADGE_CONFIG[status];
	}
</script>

<main class="main-panel">
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
								<Badge variant={convertStatusToBadgeVariant(item.status).status}>
									{convertStatusToBadgeVariant(item.status).label}
								</Badge>
							</td>
							<td class="col-actions">
								<IconButton
									isDisabled={item.isDeleted}
									name="detail"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickDetalle(item)}
									onKeydown={(e) => onKeydownDetalle(e, item)}
								/>
								<IconButton
									isDisabled={convertStatusToBadgeVariant(item.status).status !== 'info' ||
										item.isDeleted}
									name="play"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickIniciarEvaluacion(item)}
									onKeydown={(e) => onKeydownIniciarEvaluacion(e, item)}
								/>

								<IconButton
									isDisabled={convertStatusToBadgeVariant(item.status).status !== 'info' ||
										item.isDeleted}
									name="edit"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickEditar(item)}
									onKeydown={(e) => onKeydownEditar(e, item)}
								/>
								<IconButton
									isDisabled={convertStatusToBadgeVariant(item.status).status !== 'info' ||
										item.isDeleted}
									name="delete"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickBorrar(item)}
									onKeydown={(e) => onKeydownBorrar(e, item)}
								/>
								<IconButton
									isDisabled={convertStatusToBadgeVariant(item.status).status !== 'info' ||
										!item.isDeleted}
									name="restore"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickRestaurar(item)}
									onKeydown={(e) => onKeydownRestaurar(e, item)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message="No hay elementos de capitulo"></EmptySection>
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
