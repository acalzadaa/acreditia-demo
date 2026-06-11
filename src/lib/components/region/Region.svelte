<script lang="ts">
	import type { RegionWithRelationItem } from '$lib/schemas/region.schema';


	import EmptySection from '../common/EmptySection.svelte';
	import PageHeader from '../common/PageHeader.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		gridArea?: string;
		regionItems: RegionWithRelationItem[];
		showDetailIcon?: boolean;
		showHeader?: boolean;
		title?: string;
		subtitle?: string;
		onClickEditar: (item: RegionWithRelationItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: RegionWithRelationItem) => void;
		onClickBorrar: (item: RegionWithRelationItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: RegionWithRelationItem) => void;
		onClickRestaurar: (item: RegionWithRelationItem) => void;
		onKeydownRestaurar: (e: KeyboardEvent, item: RegionWithRelationItem) => void;
		onClickDetalle?: (item: RegionWithRelationItem) => void;
		onKeydownDetalle?: (e: KeyboardEvent, item: RegionWithRelationItem) => void;
	}

	const {
		gridArea = 'main',
		regionItems,
		showDetailIcon = true,
		showHeader = false,
		title = '',
		subtitle = '',
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar,
		onClickRestaurar,
		onKeydownRestaurar,
		onClickDetalle,
		onKeydownDetalle
	}: Props = $props();
</script>

<main class="main-panel" style="grid-area: {gridArea}">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<section class="table-container">
		{#if regionItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-code">Código</th>
						<th class="col-name">Nombre</th>
						<th class="col-description">Descripción</th>
						<th class="col-status">Estatus</th>
						<th class="col-actions">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each regionItems as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.code}</td>
							<td class="col-name">{item.name}</td>
							<td class="col-description">{item.description}</td>
							<td class="col-status">
								<Badge variant={item.isDeleted ? 'error' : 'success'}>
									{item.isDeleted ? 'borrado' : 'activo'}
								</Badge>
							</td>
							<td class="col-actions">
								{#if showDetailIcon && onClickDetalle && onKeydownDetalle}
									<IconButton
										isDisabled={item.isDeleted}
										name="detail"
										size="md"
										borderShape="square"
										variant="ghost"
										onClick={() => onClickDetalle(item)}
										onKeydown={(e) => onKeydownDetalle(e, item)}
									/>
								{/if}

								<IconButton
									isDisabled={item.isDeleted}
									name="edit"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickEditar(item)}
									onKeydown={(e) => onKeydownEditar(e, item)}
								/>
								<IconButton
									isDisabled={item.isDeleted}
									name="delete"
									size="md"
									borderShape="square"
									variant="ghost"
									onClick={() => onClickBorrar(item)}
									onKeydown={(e) => onKeydownBorrar(e, item)}
								/>
								<IconButton
									isDisabled={!item.isDeleted}
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
			<EmptySection message="No hay elementos de region"></EmptySection>
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
 *
 *   código      ~20 chars ~10rem  (min: 7rem)
 *   nombre      ~50 chars ~18rem  (min: 12rem)
 *   descripción ~255 chars flex   (min: 14rem, max: auto)
 *   badge       ~20 chars ~8rem   (min: 6rem)
 *   acciones      4 iconos  ~9rem   (min: 9rem, fijo)
 *
 * Total mínimo: 7 + 12 + 14 + 6 + 9 = 48rem
 */
	.data-table {
		min-width: 48rem;
	}

	/* =============================================
   COLUMN WIDTHS
   Declara los anchos en thead th para que
   table-layout: fixed los respete en todo el body.
   ============================================= */

	/* Código — corto, no hace wrap */
	.data-table .col-code {
		width: 10rem;
		min-width: 7rem;
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

	/* Descripción — columna flexible; toma el espacio sobrante.
   Hace wrap y tiene un mínimo para no volverse ilegible.     */
	.data-table .col-description {
		width: 18rem;
		min-width: 14rem;
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
