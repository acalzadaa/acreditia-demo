<script lang="ts">
	import ConfirmModal from '$lib/components/ui/confirm/ConfirmModal.svelte';

	interface Props {
		demo: boolean;
		id: string;
		open: boolean;
		onClose: () => void;
	}

	let { open = false, onClose, id, demo = false }: Props = $props();

	function handleClose() {
		onClose();
	}
</script>

<ConfirmModal
	{demo}
	{id}
	message="¿Deseas enviar tus datos de este indicador? Despues de esta accion ya no podras hacer cambios."
	{open}
	title="Confirmar envio de datos"
	onClose={handleClose}
	formAction="?/enviar"
	buttonLabel="enviar"
	actionButtonVariant="critical"
/>
