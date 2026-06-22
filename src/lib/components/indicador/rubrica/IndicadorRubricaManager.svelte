<script lang="ts">
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import type { RubricaCriterioItem } from '$lib/schemas/rubricaCriterio.schema';
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
				onClick={modalGrupo.handlers('create').onclick}
				onKeydown={(e) => modalGrupo.handlers('create').onkeydown(e)}
			/>
		{/if}
	</header>

	{#if cardExpand.value}
		<div class="card-body">
			{#if sortedItems && sortedItems.length > 0}
				<div class="element-grid">
					{#each sortedItems as item, index (item.id)}
						<article
							class="element-item"
							class:element-item--bordered={index < sortedItems.length - 1}
						>
							<header class="element-item__header">
								<div class="element-item__heading">
									<Badge variant={rangoBadgeVariant(item)}>
										{item.rangeStart} – {item.rangeEnd}
									</Badge>
									<span class="element-item__code text-caption-small">{item.code}</span>
								</div>

								<div class="element-item__actions">
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
								<ul class="element-item__childs text-body-small">
									{#each item.criterios as criterio (criterio.id ?? criterio.criterio)}
										<li class="element-item__child">
											<span class="element-item__child-dot" aria-hidden="true"></span>
											<span class="element-item__child-text">{criterio.criterio}</span>
											<IconButton
												name="delete"
												size="sm"
												shape="square"
												variant="ghost"
												class="element-item__child-delete"
												tooltipLabel="Eliminar criterio"
												onClick={() => modalCriterio.handlers('delete').onClickItem(item)}
												onKeydown={(e) => modalCriterio.handlers('delete').onKeydownItem(e, item)}
											/>
										</li>
									{/each}
								</ul>
							{:else}
								<p class="element-item__empty text-body-small">Sin criterios definidos</p>
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

	/*
	 * Lista de criterios: sin border envolvente. La jerarquía se
	 * comunica con indentación y un punto marcador por fila, no
	 * con más líneas. El botón de eliminar de cada criterio solo
	 * aparece en hover, para no competir visualmente con el texto
	 * cuando el usuario solo está leyendo.
	 */
	.element-item__childs {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	.element-item__child {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--border-radius-md);
		transition: background-color 0.15s ease;
	}

	.element-item__child:hover {
		background-color: var(--bg-raised-hover);
	}

	.element-item__child:hover :global(.element-item__child-delete) {
		opacity: 1;
	}

	.element-item__child-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: var(--text-disabled);
		flex-shrink: 0;
	}

	.element-item__child-text {
		flex: 1;
		min-width: 0;
		color: var(--text-primary);
		overflow-wrap: break-word;
		word-break: break-word;
	}

	.element-item__child :global(.element-item__child-delete) {
		opacity: 0;
		transition: opacity 0.1s ease;
		flex-shrink: 0;
	}

	.element-item__empty {
		margin: 0;
		color: var(--text-placeholder);
		font-style: italic;
	}
</style>