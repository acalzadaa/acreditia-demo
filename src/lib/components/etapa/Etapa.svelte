<script lang="ts">
	import type { EtapaStatus, EtapaWithRelationsItem } from '$lib/schemas/etapa.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import PageHeader from '../common/PageHeader.svelte';
	import Badge, { type BadgeStatus } from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		gridArea?: string;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		items?: EtapaWithRelationsItem[] | null;
		onClickEditar: (item: EtapaWithRelationsItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: EtapaWithRelationsItem) => void;
		onClickDetalle: (item: EtapaWithRelationsItem) => void;
		onKeydownDetalle: (e: KeyboardEvent, item: EtapaWithRelationsItem) => void;
	}

	const {
		gridArea = 'main',
		showHeader = false,
		title = '',
		subtitle = '',
		items,
		onClickEditar,
		onKeydownEditar,
		onClickDetalle,
		onKeydownDetalle
	}: Props = $props();

	const STATUS_TO_BADGE_CONFIG: Record<
		EtapaStatus,
		{ etapaStatus: EtapaStatus; badgeStatus: BadgeStatus; label: string }
	> = {
		draft: { etapaStatus: 'draft', badgeStatus: 'success', label: 'Planeado' },
		ready: { etapaStatus: 'ready', badgeStatus: 'success', label: 'Listo' }
	};

	export function convertStatusToBadgeVariant(status: EtapaStatus): {
		etapaStatus: EtapaStatus;
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
						<th class="col-code">Nombre</th>
						<th class="col-code">Fecha inicio</th>
						<th class="col-code">Fecha final</th>
						<th class="col-name">Periodo extraordinario</th>
						<th class="col-code">Periodo inicio</th>
						<th class="col-code">Periodo final</th>
						<th class="col-status">Estatus</th>
						<th class="col-actions">Acciones</th>
					</tr>
				</thead>

				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-small-number">{item.numeroEtapa}</td>
							<td class="col-name">{item.name}</td>
							<td class="col-code">{item.fechaInicio}</td>
							<td class="col-code">{item.fechaFinal}</td>
							<td class="col-name">{item.periodoExtraordinario ? 'Si' : 'No'}</td>
							<td class="col-code">{item.periodoExtraordinarioInicio}</td>
							<td class="col-code">{item.periodoExtraordinarioFinal}</td>
							<td class="col-status">
								<Badge
									variant={convertStatusToBadgeVariant(item.status as EtapaStatus).badgeStatus}
								>
									{convertStatusToBadgeVariant(item.status as EtapaStatus).label}
								</Badge>
							</td>
							<td class="col-actions">
								<IconButton
									isDisabled={convertStatusToBadgeVariant(item.status).etapaStatus !== 'ready' ||
										item.isDeleted}
									name="detail"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickDetalle(item)}
									onKeydown={(e) => onKeydownDetalle(e, item)}
								/>
								<IconButton
									isDisabled={convertStatusToBadgeVariant(item.status).etapaStatus !== 'draft' ||
										item.isDeleted}
									name="calendar"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickEditar(item)}
									onKeydown={(e) => onKeydownEditar(e, item)}
								/>
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
