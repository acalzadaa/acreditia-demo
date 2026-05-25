<script lang="ts">
	import type { UnidadAcademicaItem } from '$lib/schemas/unidadAcademica.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		unidadAcademicaItems: UnidadAcademicaItem[];
		onClickEditar: (item: UnidadAcademicaItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: UnidadAcademicaItem) => void;
		onClickBorrar: (item: UnidadAcademicaItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: UnidadAcademicaItem) => void;
	}

	const {
		unidadAcademicaItems,
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar
	}: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container">
		{#if unidadAcademicaItems && unidadAcademicaItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th>Entidad Legal</th>
						<th>Region</th>
						<th>Institucion</th>
						<th>Campus</th>						
						<th>Código</th>
						<th>Nombre</th>
						<th>Estatus</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each unidadAcademicaItems as item (item.id)}
						<tr>
							<td>
								<span class="text-body-small">{item?.entidadLegal?.code}</span>
								<span class="text-body-small"> {item.entidadLegal?.name}</span>
							</td>
							<td>
								<span class="text-body-small">{item?.region?.code}</span>
								<span class="text-body-small"> {item.region?.name}</span>
							</td>
							<td>
								<span class="text-body-small">{item?.institucion?.code}</span>
								<span class="text-body-small"> {item.institucion?.name}</span>
							</td>
							<td>
								<span class="text-body-small">{item?.campus?.code}</span>
								<span class="text-body-small"> {item.campus?.name}</span>
							</td>
							<td>{item.code}</td>
							<td>{item.name}</td>
							<td>
								<Badge variant={item.status === 'activo' ? 'success' : 'warning'}>
									{item.status}
								</Badge>
							</td>
							<td>
								<IconButton
									name={'edit'}
									size={'md'}
									borderShape={'square'}
									variant={'ghost'}
									onClick={() => onClickEditar(item)}
									onKeydown={(e) => onKeydownEditar(e, item)}
								/>
								<IconButton
									name={'delete'}
									size={'md'}
									borderShape={'square'}
									variant={'ghost'}
									onClick={() => onClickBorrar(item)}
									onKeydown={(e) => onKeydownBorrar(e, item)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<EmptySection message={'No hay elementos de unidad academica'}></EmptySection>
		{/if}
	</section>
</main>

<style>


	@media (max-width: 768px) {
		.table-container {
			padding: 0 1rem 1rem 1rem;
		}
	}
</style>
