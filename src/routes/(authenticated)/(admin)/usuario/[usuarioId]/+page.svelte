<script lang="ts">
	import { getPuestoRef, getUsuario, getUsuarioPuesto } from '$lib/components/common/stores/data.svelte';
	import { createModalManager } from '$lib/components/ui/modal/stores/modalManager.svelte';
	import UsuarioDetail from '$lib/components/features/usuario/UsuarioDetail.svelte';
	import UsuarioPuestoList from '$lib/components/features/usuario/puesto/UsuarioPuestoList.svelte';
	import { createToggle } from '$lib/components/common/stores/toggle.svelte';
	import type { UsuarioPuestoItem } from '$lib/schemas/usuarioPuesto.schema';
	import { page } from '$app/state';
	import AddUsuarioPuestoForm from '$lib/components/features/usuario/puesto/AddUsuarioPuestoForm.svelte';
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';

	const usuarioId = page.params.usuarioId;
	let item = getUsuario().filter((item) => item.authUserId === usuarioId)[0];
	let usuarioPuestoItems = getUsuarioPuesto().filter((item) => item.usuarioId === usuarioId);
	let puestoRef = getPuestoRef('responsable');
	let usuarioPuestoModal = createModalManager<UsuarioPuestoItem>();
	let usuarioPuestoToggle = createToggle(true);
</script>

<div class="detail-panel">
	<UsuarioDetail {item} showHeader={true} title="Detalle de usuario" subtitle="" />

	<UsuarioPuestoList
		items={usuarioPuestoItems}
		isVisible={usuarioPuestoToggle.value}
		onClickToggle={usuarioPuestoToggle.onClick}
		onClickAdd={usuarioPuestoModal.handlers('add').onClick}
		onClickRemover={usuarioPuestoModal.handlers('remove').onClickItem}
	/>

	<AddUsuarioPuestoForm
		open={usuarioPuestoModal.isOpen('add')}
		{puestoRef}
		onClose={usuarioPuestoModal.close}
	/>

	{#if usuarioPuestoModal.selectedItem}
		<ConfirmModal
			demo={true}
			message="¿Desea remover el registro?"
			title="Remover puesto"
			buttonLabel="Remover"
			open={usuarioPuestoModal.isOpen('remove')}
			id={usuarioPuestoModal.selectedItem.id}
			onClose={usuarioPuestoModal.close}
			actionButtonVariant="critical"
		/>
	{/if}
</div>
