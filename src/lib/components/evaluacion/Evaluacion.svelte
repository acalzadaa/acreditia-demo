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
						<th class="col-label">Nombre</th>
						<th class="col-code">Año</th>
						<th class="col-code">Ciclo</th>
						<th class="col-badge">Estatus</th>
						<th class="col-actions-md">Acciones</th>
					</tr>
				</thead>

				<tbody class="text-body">
					{#each items as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.modelo?.code}</td>
							<td class="col-code">{item.institucion?.code}</td>
							<td class="col-code">{item.code}</td>
							<td class="col-label">{item.name}</td>
							<td class="col-small-number">{item.year}</td>
							<td class="col-small-number">{item.cycle}</td>
							<td class="col-badge">
								<Badge variant={convertStatusToBadgeVariant(item.status).badgeStatus}>
									{convertStatusToBadgeVariant(item.status).label}
								</Badge>
							</td>
							<td class="col-actions-md">
								<div class="col-actions-row">
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
										tooltipLabel="Ejecutar proceso"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickIniciarEvaluacion(item)}
									/>
									<IconButton
										isDisabled={convertStatusToBadgeVariant(item.status).evaluacionStatus !==
											'planned' || item.isDeleted}
										name="edit"
										tooltipLabel="Editar registro"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickEditar(item)}
									/>
									<IconButton
										isDisabled={convertStatusToBadgeVariant(item.status).evaluacionStatus !==
											'planned' || item.isDeleted}
										name="delete"
										tooltipLabel="Borrar registro"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickBorrar(item)}
									/>
									<IconButton
										isDisabled={convertStatusToBadgeVariant(item.status).evaluacionStatus !==
											'planned' || !item.isDeleted}
										name="restore"
										tooltipLabel="Restaurar registro"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickRestaurar(item)}
									/>
								</div>
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
