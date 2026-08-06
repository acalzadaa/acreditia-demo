<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import Badge, { type BadgeStatus } from '$lib/components/ui/Badge.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { formatDate } from '$lib/helpers/dates';
	import type {
		EvaluacionEtapaItem,
		EvaluacionEtapaPlaneacionStatus
	} from '$lib/schemas/evaluacionEtapa.schema';

	interface Props {
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		items?: EvaluacionEtapaItem[] | null;
	}

	const { showHeader = false, title = '', subtitle = '', items }: Props = $props();

	const STATUS_TO_BADGE_CONFIG: Record<
		EvaluacionEtapaPlaneacionStatus,
		{ etapaStatus: EvaluacionEtapaPlaneacionStatus; badgeStatus: BadgeStatus; label: string }
	> = {
		planning: { etapaStatus: 'planning', badgeStatus: 'success', label: 'Planeado' },
		ready: { etapaStatus: 'ready', badgeStatus: 'success', label: 'Listo' }
	};

	export function convertStatusToBadgeVariant(status: EvaluacionEtapaPlaneacionStatus): {
		etapaStatus: EvaluacionEtapaPlaneacionStatus;
		badgeStatus: BadgeStatus;
		label: string;
	} {
		return STATUS_TO_BADGE_CONFIG[status];
	}
</script>

<main class="main-panel">
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
						<th class="col-code">Periodo extra</th>
						<th class="col-date">Periodo inicio</th>
						<th class="col-date">Periodo final</th>
						<th class="col-badge">Estatus</th>
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
									variant={convertStatusToBadgeVariant(item.status as EvaluacionEtapaPlaneacionStatus)
										.badgeStatus}
								>
									{convertStatusToBadgeVariant(item.status as EvaluacionEtapaPlaneacionStatus).label}
								</Badge>
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
	.main-panel {
		flex-shrink: 0;
	}
</style>
