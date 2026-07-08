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
	message="¿Esta seguro que desea restaurar este elemento?"
	{open}
	title="Confirmar restauracion"
	onClose={handleClose}
	formAction="?/restore"
	buttonLabel="Restaurar"
	actionButtonVariant="primary"
/>
