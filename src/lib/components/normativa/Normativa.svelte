<script lang="ts">
	import type { NormativaItem } from '$lib/schemas/normativa.schema';
	import EmptySection from '../common/EmptySection.svelte';
	import Badge from '../ui/Badge.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		normativaItems: NormativaItem[];
		onClickEditar: (item: NormativaItem) => void;
		onKeydownEditar: (e: KeyboardEvent, item: NormativaItem) => void;
		onClickBorrar: (item: NormativaItem) => void;
		onKeydownBorrar: (e: KeyboardEvent, item: NormativaItem) => void;
	}

	const {
		normativaItems,
		onClickEditar,
		onKeydownEditar,
		onClickBorrar,
		onKeydownBorrar
	}: Props = $props();
</script>

<main class="main-panel">
	<section class="table-container">
		{#if normativaItems.length > 0}
			<table class="data-table text-body">
				<thead class="text-body-strong">
					<tr>
						<th>Codigo</th>
						<th>Nombre</th>
						<th>Estatus</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody class="text-body">
					{#each normativaItems as item (item.id)}
						<tr>
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
			<EmptySection message={'No hay elementos de entidad legal'}></EmptySection>
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
