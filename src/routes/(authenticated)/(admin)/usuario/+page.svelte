<script lang="ts">
	import { getUsuario } from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import ConfirmDeleteModal from '$lib/components/ui/confirm/ConfirmDeleteModal.svelte';
	import ConfirmRestoreModal from '$lib/components/ui/confirm/ConfirmRestoreModal.svelte';
	import UsuarioList from '$lib/components/features/usuario/UsuarioList.svelte';
	import EditarUsuarioForm from '$lib/components/features/usuario/EditarUsuarioForm.svelte';
	import { type UsuarioItem } from '$lib/schemas/usuario.schema';
	import CrearUsuarioForm from '$lib/components/features/usuario/CrearUsuarioForm.svelte';

	let items = getUsuario();
	let modal = createModalManager<UsuarioItem>();
</script>

<div class="detail-panel">
	<UsuarioList
		{items}
		showHeader={true}
		title="Listado de usuarios"
		onClickCrear={modal.handlers('create').onClick}
		onClickEditar={modal.handlers('edit').onClickItem}
		onClickBorrar={modal.handlers('delete').onClickItem}
		onClickRestaurar={modal.handlers('restore').onClickItem}
	/>
</div>
<CrearUsuarioForm open={modal.isOpen('create')} onClose={modal.close} />

{#if modal.selectedItem}
	<EditarUsuarioForm
		open={modal.isOpen('edit')}
		selectedItem={modal.selectedItem}
		onClose={modal.close}
	/>

	<ConfirmDeleteModal
		demo={true}
		open={modal.isOpen('delete')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>

	<ConfirmRestoreModal
		demo={true}
		open={modal.isOpen('restore')}
		id={modal.selectedItem.id}
		onClose={modal.close}
	/>
{/if}

<style>
	.detail-panel {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow-y: auto;
	}
</style>
