<script lang="ts">
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Navigation from '$lib/components/ui/navigation/Navigation.svelte';
	import NavigationColumn from '$lib/components/ui/navigation/NavigationColumn.svelte';
	import NavigationHeader from '$lib/components/ui/navigation/NavigationHeader.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import { navigateTo } from '$lib/helpers/navigation';
	import type { EvaluacionEtapaItem } from '$lib/schemas/evaluacionEtapa.schema';
	import { convertStatusToBadgeVariant } from '../utils/EvaluacionEtapaEjecucionUtils';
	import { formatEtapaDateRange, isEtapaDateRange } from '../utils/EvaluacionEtapaUtils';

	interface Props {
		items: EvaluacionEtapaItem[];
	}

	const { items }: Props = $props();
</script>

<section>
	<PageHeader title="Ejecución de etapas de evaluación" />
	{#if items && items.length > 0}
		<NavigationColumn minWidth="360px" maxWidth="2900px">
			{#each items as item (item.id)}
				<Navigation>
					<NavigationHeader onClickNavigate={() => navigateTo(item.etapa.code)}>
						{#snippet title()}
							<Tag class="text-caption" variant="info">Etapa {item.etapa.order}</Tag>
							<p style="text-transform: capitalize;">
								{item.etapa.name}
							</p>
						{/snippet}
						{#snippet subtitle()}
							{#if isEtapaDateRange(item.fechaInicio, item.fechaFinal)}
								<p>Ordinario: {formatEtapaDateRange(item.fechaInicio, item.fechaFinal)}</p>
							{/if}
							{#if item.periodoExtraordinario}
								<p>
									Extraordinario:
									{formatEtapaDateRange(
										item.periodoExtraordinarioInicio,
										item.periodoExtraordinarioFinal
									)}
								</p>
							{/if}
						{/snippet}
						<Badge
							variant={convertStatusToBadgeVariant(item.status).badgeStatus}
							icon={convertStatusToBadgeVariant(item.status).icon}
							>{convertStatusToBadgeVariant(item.status).label}</Badge
						>
					</NavigationHeader>
				</Navigation>
			{/each}
		</NavigationColumn>
	{/if}
</section>
