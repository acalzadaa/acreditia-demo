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
	message="¿Deseas rechazar la solicitud de invalidación de este indicador?"
	{open}
	title="Rechazar invalidacion"
	onClose={handleClose}
	formAction="?/reject"
	buttonLabel="Rechazar"
	actionButtonVariant="primary"
/>
