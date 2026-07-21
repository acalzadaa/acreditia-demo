<script lang="ts">
	import { getUsuario } from '$lib/stores/data.svelte';
	import { createModalManager } from '$lib/utils/modalManager.svelte';
	import { type UsuarioItem } from '$lib/schemas/usuario.schema';
	import UsuarioDetail from '$lib/components/features/usuario/UsuarioDetail.svelte';

	let items = getUsuario();
	let modal = createModalManager<UsuarioItem>();
</script>

<div class="detail-panel">
	<UsuarioDetail
		{items}
		showHeader={true}
		title="Detalle de usuario"
		subtitle=''
	/>
</div>

<style>
	.detail-panel {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow-y: auto;
	}
</style>
