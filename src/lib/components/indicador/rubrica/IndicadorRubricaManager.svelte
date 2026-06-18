<script lang="ts">
	import type { RubricaItem, RubricaCriterioItem } from '$lib/schemas/rubrica.schema';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';
	import EmptySection from '../../common/EmptySection.svelte';
	import Badge from '../../ui/Badge.svelte';
	import IconButton from '../../ui/IconButton.svelte';

	interface Props {
		gridArea?: string;
		items?: RubricaItem[] | null;
	}

	const { gridArea = 'main', items }: Props = $props();

	function rangoBadgeVariant(item: RubricaItem) {
		return item.rangeEnd >= 8 ? 'success' : item.rangeEnd >= 4 ? 'warning' : 'error';
	}

	const sortedItems = $derived(items ? [...items].sort((a, b) => a.order - b.order) : items);

	let modalGrupo = createModalManager<RubricaItem>();
	let modalCriterio = createModalManager<RubricaItem | RubricaCriterioItem>();
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
			<h3 class="text-h6">Rúbrica de evaluación</h3>
			{#if items && items.length > 0}
				<Badge variant="info">{items.length} {items.length === 1 ? 'grupo' : 'grupos'}</Badge>
			{/if}
		</div>
		{#if cardExpand.value}
			<IconButton
				name="add"
				size="md"
				shape="round"
				variant="outline"
				tooltipLabel="Agregar grupo"
				onClick={modalGrupo.handlers('create').onclick}
				onKeydown={(e) => modalGrupo.handlers('create').onkeydown(e)}
			/>
		{/if}
	</header>

	{#if cardExpand.value}
		<div class="card-body">
			{#if sortedItems && sortedItems.length > 0}
				<div class="rubrica-grid">
					{#each sortedItems as item, index (item.id)}
						<article
							class="rubrica-item"
							class:rubrica-item--bordered={index < sortedItems.length - 1}
						>
							<header class="rubrica-item__header">
								<div class="rubrica-item__heading">
									<Badge variant={rangoBadgeVariant(item)}>
										{item.rangeStart} – {item.rangeEnd}
									</Badge>
									<span class="rubrica-item__code text-caption-small">{item.code}</span>
								</div>

								<div class="rubrica-item__actions">
									<IconButton
										name="add"
										size="sm"
										shape="square"
										variant="ghost"
										tooltipLabel="Agregar criterio"
										onClick={() => modalCriterio.handlers('add').onClickItem(item)}
										onKeydown={(e) => modalCriterio.handlers('add').onKeydownItem(e, item)}
									/>
									<IconButton
										name="edit"
										size="sm"
										shape="square"
										variant="ghost"
										tooltipLabel="Editar grupo"
										onClick={() => modalGrupo.handlers('edit').onClickItem(item)}
										onKeydown={(e) => modalGrupo.handlers('edit').onKeydownItem(e, item)}
									/>
									<IconButton
										name="delete"
										size="sm"
										shape="square"
										variant="ghost"
										tooltipLabel="Eliminar grupo"
										onClick={() => modalGrupo.handlers('delete').onClickItem(item)}
										onKeydown={(e) => modalGrupo.handlers('delete').onKeydownItem(e, item)}
									/>
								</div>
							</header>

							{#if item.criterios.length > 0}
								<ul class="rubrica-item__criterios text-body-small">
									{#each item.criterios as criterio (criterio.id ?? criterio.descripcion)}
										<li class="rubrica-item__criterio">
											<span class="rubrica-item__criterio-dot" aria-hidden="true"></span>
											<span class="rubrica-item__criterio-text">{criterio.descripcion}</span>
											<IconButton
												name="delete"
												size="sm"
												shape="square"
												variant="ghost"
												class="rubrica-item__criterio-delete"
												tooltipLabel="Eliminar criterio"
												onClick={() => modalCriterio.handlers('delete').onClickItem(item)}
												onKeydown={(e) => modalCriterio.handlers('delete').onKeydownItem(e, item)}
											/>
										</li>
									{/each}
								</ul>
							{:else}
								<p class="rubrica-item__empty text-body-small">Sin criterios definidos</p>
							{/if}
						</article>
					{/each}
				</div>
			{:else}
				<EmptySection message="No hay grupos de rúbrica registrados"></EmptySection>
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
	 * con un divisor sutil (rubrica-item--bordered), no con cajas
	 * anidadas: la card ya delimita el conjunto completo, así que
	 * los grupos solo necesitan un separador entre ellos.
	 */
	.rubrica-grid {
		display: flex;
		flex-direction: column;
	}

	.rubrica-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding-bottom: var(--space-4);
	}

	.rubrica-item:not(:first-child) {
		padding-top: var(--space-4);
	}

	.rubrica-item--bordered {
		border-bottom: var(--divider);
	}

	.rubrica-item__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-2);
	}

	.rubrica-item__heading {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		min-width: 0;
	}

	.rubrica-item__code {
		color: var(--text-secondary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.rubrica-item__actions {
		display: flex;
		gap: var(--space-2);
		flex-shrink: 0;
	}

	/*
	 * Lista de criterios: sin border envolvente. La jerarquía se
	 * comunica con indentación y un punto marcador por fila, no
	 * con más líneas. El botón de eliminar de cada criterio solo
	 * aparece en hover, para no competir visualmente con el texto
	 * cuando el usuario solo está leyendo.
	 */
	.rubrica-item__criterios {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	.rubrica-item__criterio {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--border-radius-md);
		transition: background-color 0.15s ease;
	}

	.rubrica-item__criterio:hover {
		background-color: var(--bg-raised-hover);
	}

	.rubrica-item__criterio:hover :global(.rubrica-item__criterio-delete) {
		opacity: 1;
	}

	.rubrica-item__criterio-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: var(--text-disabled);
		flex-shrink: 0;
	}

	.rubrica-item__criterio-text {
		flex: 1;
		min-width: 0;
		color: var(--text-primary);
		overflow-wrap: break-word;
		word-break: break-word;
	}

	.rubrica-item__criterio :global(.rubrica-item__criterio-delete) {
		opacity: 0;
		transition: opacity 0.1s ease;
		flex-shrink: 0;
	}

	.rubrica-item__empty {
		margin: 0;
		color: var(--text-placeholder);
		font-style: italic;
	}
</style>
