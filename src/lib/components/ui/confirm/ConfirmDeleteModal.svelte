<script lang="ts">
	import ConfirmModal from './ConfirmModal.svelte';

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
	message="¿Estás seguro que deseas borrar este elemento?"
	{open}
	title="Confirmar borrado"
	onClose={handleClose}
	formAction="?/delete"
	buttonLabel="Borrar"
	actionButtonVariant="critical"
/>
