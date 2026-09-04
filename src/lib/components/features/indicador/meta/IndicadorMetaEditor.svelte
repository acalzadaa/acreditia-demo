<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import CardColumn from '$lib/components/ui/card/CardColumn.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardContent from '$lib/components/ui/card/CardContent.svelte';
	import CardContentItem from '$lib/components/ui/card/CardContentItem.svelte';
	import CardHeaderCustom from '$lib/components/ui/card/CardHeaderCustom.svelte';
	import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
	import { getSafeText } from '$lib/components/evaluacion/utils/EvaluacionUtils';
	import Button from '$lib/components/ui/Button.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import type { IndicadorMetaItem } from '$lib/schemas/indicadorMeta.schema';

	interface Props {
		item?: IndicadorMetaItem;
		onClickEditar: (item: IndicadorMetaItem) => void;
	}

	const { item, onClickEditar }: Props = $props();
</script>

<main class="main-panel--inline">
	<section class="list-view--cards">
		{#if item}
			<CardColumn minWidth="360px" maxWidth="2500px">
				<Card>
					<CardHeaderCustom>
						{#snippet title()}
							<div class="text-caption">
								<Tag variant="info">Configuración del indicador</Tag>
							</div>

							<p>Meta del indicador</p>
						{/snippet}
						<Badge variant="success">Completo</Badge>
					</CardHeaderCustom>

					<CardContent>
						<CardContentItem label="Modelo">
							<Button onClick={() => onClickEditar(item)} variant="text">
								{getSafeText(item.target, 'Falta definir la meta')}
							</Button>
						</CardContentItem>
						<CardContentItem label="Capítulo">
							<Button onClick={() => onClickEditar(item)} variant="text">
								{getSafeText(item.targetUnit, 'Falta definir la unidad de la meta')}
							</Button>
						</CardContentItem>
					</CardContent>

					<CardFooter>
						<div class="col-actions-row text-body">
							<Button name="edit" variant="ghost" onClick={() => onClickEditar(item)}>
								Editar
							</Button>
						</div>
					</CardFooter>
				</Card>
			</CardColumn>
		{:else}
			<EmptySection message="No hay elementos"></EmptySection>
		{/if}
	</section>
</main>

<style>
	.main-panel--inline {
		flex: none;
		min-height: auto;
		overflow: visible;
	}

	/* Por default (>= 1500px) gana la tabla; las cards quedan ocultas
	   y fuera del flujo para no pelear por el flex del panel. */
	.list-view--table {
		display: contents;
	}

	.list-view--cards {
		display: none;
	}

	/* Ajustar el max-width dependiendo el contenido! */
	@media (max-width: 2500px) {
		.list-view--table {
			display: none;
		}

		.list-view--cards {
			display: grid;
		}
	}
</style>
