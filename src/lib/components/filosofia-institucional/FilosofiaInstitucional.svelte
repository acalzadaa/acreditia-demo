<script lang="ts">
	import type { FilosofiaInstitucionalItem } from '$lib/schemas/filosofiaInstitucional.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		filosofiaInstitucionalItems: FilosofiaInstitucionalItem[];
		onClickEditar: (item: FilosofiaInstitucionalItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: FilosofiaInstitucionalItem) => void;
		onClickBorrar: (item: FilosofiaInstitucionalItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: FilosofiaInstitucionalItem) => void;
		onClickRestaurar: (item: FilosofiaInstitucionalItem) => void;
		onKeydownRestaurar: (e: KeyboardEvent, item: FilosofiaInstitucionalItem) => void;
	}

	const {
		filosofiaInstitucionalItems,
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar,
		onClickRestaurar,
		onKeydownRestaurar
	}: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container">
		{#if filosofiaInstitucionalItems.length > 0}
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
					{#each filosofiaInstitucionalItems as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-code">{item.code}</td>
							<td class="col-name">{item.name}</td>
							<td class="col-description">{item.description}</td>
							<td class="col-status">
								<Badge variant={item.isCurrent ? 'success' : 'error'}>
									{item.isCurrent ? 'activo' : 'borrado'}
								</Badge>
							</td>
							<td class="col-actions">
								<IconButton
									isDisabled={item.isDeleted}
									name='edit'
									size='md'
									borderShape='square'
									variant='ghost'
									onClick={() => onClickEditar(item)}
									onKeydown={(e) => onKeydownEditar(e, item)}
								/>
								<IconButton
									isDisabled={item.isDeleted}
									name='delete'
									size='md'
									borderShape='square'
									variant='ghost'
									onClick={() => onClickBorrar(item)}
									onKeydown={(e) => onKeydownBorrar(e, item)}
								/>
								<IconButton
									isDisabled={!item.isDeleted}
									name='restore'
									size='md'
									borderShape='square'
									variant='ghost'
									onClick={() => onClickRestaurar(item)}
									onKeydown={(e) => onKeydownRestaurar(e, item)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message='No hay elementos de filosofía institucional'></EmptySection>
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
 *   código      → ~20 chars → ~10rem  (min: 7rem)
 *   nombre      → ~50 chars → ~18rem  (min: 12rem)
 *   descripción → ~255 chars → flex   (min: 14rem, max: auto)
 *   badge       → ~20 chars → ~8rem   (min: 6rem)
 *   acciones    → 4 iconos  → ~9rem   (min: 9rem, fijo)
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
