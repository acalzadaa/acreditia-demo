<script lang="ts">
	import ListActions from '$lib/components/actions/ListActions.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import type { InstitucionItem } from '$lib/schemas/institucion.schema';

	interface Props {
		items: InstitucionItem[];
		onClickEditar: (item: InstitucionItem) => void;
		onClickBorrar: (item: InstitucionItem) => void;
		onClickRestaurar: (item: InstitucionItem) => void;
	}

	const { items, onClickEditar, onClickBorrar, onClickRestaurar }: Props = $props();
</script>

<div class="table-container">
	<table class="data-table text-body">
		<thead class="text-body-strong">
			<tr>
				<th class="col-code">Entidad Legal</th>
				<th class="col-code">Código</th>
				<th class="col-label">Nombre</th>
				<th class="col-badge">Estatus</th>
				<th class="col-actions-md">Acciones</th>
			</tr>
		</thead>
		<tbody class="text-body">
			{#each items as item (item.id)}
				<tr class="table-row tr-expandable">
					<td class="col-code">
						{item.entidadLegal?.code}
					</td>
					<td class="col-code">{item.code}</td>
					<td class="col-label">{item.name}</td>
					<td class="col-badge">
						<Badge variant={item.isDeleted ? 'error' : 'success'}>
							{item.isDeleted ? 'borrado' : 'activo'}
						</Badge>
					</td>
					<td class="col-actions-md">
						<ListActions
							{item}
							onClickEdit={() => onClickEditar(item)}
							isEditDisabled={item.isDeleted}
							onClickDelete={() => onClickBorrar(item)}
							isDeleteDisabled={item.isDeleted}
							onClickRestore={() => onClickRestaurar(item)}
							isRestoreDisabled={!item.isDeleted}
						/>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
