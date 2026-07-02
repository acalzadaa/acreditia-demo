<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import type { IndicadorAreaFuncionalItem } from '$lib/schemas/indicadorAreaFuncional';
	import type { AreaFuncionalRef } from '$lib/schemas/shared.schema';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { createToggle } from '$lib/utils/toggle.svelte';

	interface Props {
		gridArea?: string;
		items?: IndicadorAreaFuncionalItem[] | null;
	}

	const { gridArea = 'main', items }: Props = $props();

	let modalAreaFuncional = createModalManager<IndicadorAreaFuncionalItem>();
	let modalSubareaFuncional = createModalManager<AreaFuncionalRef | IndicadorAreaFuncionalItem>();
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
				onClick={cardExpand.onClick}
				onKeydown={(e) => cardExpand.onkeydown(e)}
			/>
			<h3 class="text-h6">Area funcional</h3>
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
				onClick={modalAreaFuncional.handlers('add').onClick}
				onKeydown={(e) => modalAreaFuncional.handlers('add').onKeydown(e)}
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
										{item.areaFuncional.code} - {item.areaFuncional.name}
									</Badge>
									<span class="element-item__code text-caption-small">{item.code}</span>
								</div>

								<div class="element-item__actions">
									<IconButton
										name="add"
										size="sm"
										shape="square"
										variant="ghost"
										tooltipLabel="Agregar subarea funcional"
										onClick={() => modalSubareaFuncional.handlers('add').onClickItem(item)}
										onKeydown={(e) => modalSubareaFuncional.handlers('add').onKeydownItem(e, item)}
									/>
									<IconButton
										name="delete"
tooltipLabel="Borrar registro"
										size="sm"
										shape="square"
										variant="ghost"
										tooltipLabel="Eliminar area funcional"
										onClick={() => modalAreaFuncional.handlers('delete').onClickItem(item)}
										onKeydown={(e) => modalAreaFuncional.handlers('delete').onKeydownItem(e, item)}
									/>
								</div>
							</header>

							{#if item.subareasFuncionales.length > 0}
								<ul class="element-item__children text-body-small">
									{#each item.subareasFuncionales as subareaFuncional (subareaFuncional.id)}
										<li class="element-item__child">
											<span class="element-item__child-dot" aria-hidden="true"></span>
											<span class="element-item__child-text">{subareaFuncional.name}</span>
											<IconButton
												name="delete"
tooltipLabel="Borrar registro"
												size="sm"
												shape="square"
												variant="ghost"
												class="element-item__child-delete"
												tooltipLabel="Eliminar subarea funcional"
												onClick={() =>
													modalSubareaFuncional.handlers('delete').onClickItem(subareaFuncional)}
												onKeydown={(e) =>
													modalSubareaFuncional
														.handlers('delete')
														.onKeydownItem(e, subareaFuncional)}
											/>
										</li>
									{/each}
								</ul>
							{:else}
								<p class="element-item__empty text-body-small">Sin unidades academicas definidos</p>
							{/if}
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

	/*
	 * Lista de criterios: sin border envolvente. La jerarquía se
	 * comunica con indentación y un punto marcador por fila, no
	 * con más líneas. El botón de eliminar de cada criterio solo
	 * aparece en hover, para no competir visualmente con el texto
	 * cuando el usuario solo está leyendo.
	 */
	.element-item__children {
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
