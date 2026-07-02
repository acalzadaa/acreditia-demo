<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import type { IndicadorNormativaItem } from '$lib/schemas/indicadorNormativa';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';

	interface Props {
		gridArea?: string;
		items?: IndicadorNormativaItem[] | null;
	}

	const { gridArea = 'main', items }: Props = $props();

	let modalNormativa = createModalManager<IndicadorNormativaItem>();
	let cardExpand = createToggle(false);
</script>

<section class="card" style="grid-area: {gridArea}">
	<header class="card-header">
		<div class="card-header__title">
			<IconButton
				name="chevron-down"
				size="md"
				shape="round"
				variant="ghost"
				onClick={cardExpand.onclick}
				onKeydown={(e) => cardExpand.onkeydown(e)}
			/>
			<h3 class="text-h6">Normativa</h3>
			{#if items && items.length > 0}
				<Badge variant="info">{items.length} {items.length === 1 ? 'elemento' : 'elementos'}</Badge>
			{/if}
		</div>
		{#if cardExpand.value}
			<IconButton
				name="add"
				size="md"
				shape="round"
				variant="outline"
				tooltipLabel="Agregar grupo"
				onClick={modalNormativa.handlers('add').onClick}
				onKeydown={(e) => modalNormativa.handlers('add').onKeydown(e)}
			/>
		{/if}
	</header>
	{#if cardExpand.value}
		<div class="card-body">
			{#if items && items.length > 0}
				<div class="element-grid">
					{#each items as item, index (item.id)}
						<article class="element-item" class:element-item--bordered={index < items.length - 1}>
							<header class="element-item__header">
								<div class="element-item__heading">
									<Badge variant="info">
										{item.normativa.code}
									</Badge>
									<span class="element-item__code text-caption-small">{item.normativa.name}</span>
								</div>

								<div class="element-item__actions">
									<IconButton
										name="delete"
tooltipLabel="Borrar registro"
										size="sm"
										shape="square"
										variant="ghost"
										tooltipLabel="Eliminar normativa"
										onClick={() => modalNormativa.handlers('delete').onClickItem(item)}
										onKeydown={(e) => modalNormativa.handlers('delete').onKeydownItem(e, item)}
									/>
								</div>
							</header>
						</article>
					{/each}
				</div>
			{:else}
				<EmptySection message="No hay areas responsables"></EmptySection>
			{/if}
		</div>
	{/if}
</section>

<style>
	/*
	 * Card contenedora de la sección. Usa los tokens de superficie
	 * "raised" (layer 0) ya que vive sobre el fondo ground de la página.
	 */
	.card {
		background-color: var(--bg-raised);
		border: var(--border-card);
		border-radius: var(--border-radius-card);
		box-shadow: var(--shadow-card);
		overflow: hidden;
		flex-shrink: 0;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		padding: var(--space-4) var(--inset-md);
		border-bottom: var(--divider);
		background-color: var(--bg-overlay);
	}

	.card-header__title {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.card-header__title h3 {
		color: var(--text-primary);
		margin: 0;
	}

	.card-body {
		padding: var(--inset-md);
	}

	/*
	 * Lista vertical de grupos. Cada grupo se separa del siguiente
	 * con un divisor sutil (element-item--bordered), no con cajas
	 * anidadas: la card ya delimita el conjunto completo, así que
	 * los grupos solo necesitan un separador entre ellos.
	 */
	.element-grid {
		display: flex;
		flex-direction: column;
	}

	.element-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding-bottom: var(--space-4);
	}

	.element-item:not(:first-child) {
		padding-top: var(--space-4);
	}

	.element-item--bordered {
		border-bottom: var(--divider);
	}

	.element-item__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-2);
	}

	.element-item__heading {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		min-width: 0;
	}

	.element-item__code {
		color: var(--text-secondary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.element-item__actions {
		display: flex;
		gap: var(--space-2);
		flex-shrink: 0;
	}
</style>
