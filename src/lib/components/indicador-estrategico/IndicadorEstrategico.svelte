<script lang="ts">
	import type { IndicadorEstrategicoItem } from '$lib/schemas/indicadorEstrategico.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		indicadorEstrategicoItems: IndicadorEstrategicoItem[];
		onClickEditar: (item: IndicadorEstrategicoItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: IndicadorEstrategicoItem) => void;
		onClickBorrar: (item: IndicadorEstrategicoItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: IndicadorEstrategicoItem) => void;
		onClickRestaurar: (item: IndicadorEstrategicoItem) => void;
		onKeydownRestaurar: (e: KeyboardEvent, item: IndicadorEstrategicoItem) => void;
	}

	const {
		indicadorEstrategicoItems,
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
		{#if indicadorEstrategicoItems && indicadorEstrategicoItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th class="col-parent">Objetivo</th>
						<th class="col-code">Código</th>
						<th class="col-name">Nombre</th>
						<th class="col-description">Descripción</th>
						<th class="col-meta">Meta</th>
						<th class="col-origen">Origen de Datos</th>
						<th class="col-formula">Formula de Datos</th>
						<th class="col-frecuencia">Frecuencia</th>
						<th class="col-status">Estatus</th>
						<th class="col-actions">Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each indicadorEstrategicoItems as item (item.id)}
						<tr class="table-row tr-expandable">
							<td class="col-parent">
								{item?.objetivo?.code}
							</td>
							<td class="col-code">{item.code}</td>
							<td class="col-name">{item.name}</td>
							<td class="col-description">{item.description}</td>
							<td class="col-meta">{item.target} {item.targetUnit}</td>
							<td class="col-origen">{item.dataOrigin}</td>
							<td class="col-formula">{item.dataFormula}</td>
							<td class="col-frecuencia">{item.frequencyValue} {item.frequencyUnit}</td>
							<td class="col-frecuencia">
								<Badge variant={item.isDeleted ? 'error' : 'success'}>
									{item.isDeleted ? 'borrado' : 'activo'}
								</Badge>
							</td>
							<td class="col-actions">
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
			<EmptySection message="No hay elementos de indicador estrategico"></EmptySection>
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
 *   parent   ~20 chars ~10rem  (min: 7rem)
 *   nombre      ~50 chars ~18rem  (min: 12rem)
 *   descripción ~255 chars flex   (min: 14rem, max: auto)
 *   meta ~20 chars ~10rem  (min: 7rem)
 *   origen de datos ~50 chars ~18rem  (min: 12rem)
 *   formula de datos  ~100 chars flex   (min: 14rem, max: auto)
 *   frecuencia ~20 chars ~10rem  (min: 7rem)
 *   badge       ~20 chars ~8rem   (min: 6rem)
 *   acciones      4 iconos  ~9rem   (min: 9rem, fijo)
 *
 * Total mínimo: 7 + 7 + 12 + 14 + 7 + 12 + 14 + 7 +  6 + 9 = 95rem
 */
	.data-table {
		min-width: 95rem;
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

	/* Parent — corto, no hace wrap */
	.data-table .col-parent {
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

	/* Meta — corto, no hace wrap */
	.data-table .col-meta {
		width: 10rem;
		min-width: 7rem;
		white-space: nowrap;
	}

	/* Origen de Datos — mediano, puede hacer wrap si hay presión */
	.data-table .col-origen {
		width: 18rem;
		min-width: 12rem;
		/* wrap controlado */
		overflow-wrap: break-word;
		word-break: break-word;
		hyphens: auto;
	}

	/* Formula — columna flexible; toma el espacio sobrante.
   Hace wrap y tiene un mínimo para no volverse ilegible.     */
	.data-table .col-formula {
		width: 18rem;
		min-width: 14rem;
		/* wrap controlado */
		overflow-wrap: break-word;
		word-break: break-word;
		hyphens: auto;
	}

	/* Frecuencia — corto, no hace wrap */
	.data-table .col-frecuencia {
		width: 10rem;
		min-width: 7rem;
		white-space: nowrap;
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
