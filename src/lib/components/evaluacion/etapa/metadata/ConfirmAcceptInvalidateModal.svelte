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
	message="¿Deseas aceptar la solicitud de invalidación de este indicador? Este indicador ya no va a estar disponible en el resto de las etapas."
	{open}
	title="Confirmar invalidacion"
	onClose={handleClose}
	formAction="?/accept"
	buttonLabel="Aceptar"
	actionButtonVariant="critical"
/>
