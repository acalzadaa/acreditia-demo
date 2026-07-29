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
	message="¿Estas seguro que deseas remover este elemento?"
	{open}
	title="Confirmar"
	onClose={handleClose}
	formAction="?/remove"
	buttonLabel="Remover"
	actionButtonVariant="critical"
/>
