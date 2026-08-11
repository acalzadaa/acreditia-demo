<script lang="ts">
	import type { IdentifyParentChildItemSchema } from '$lib/schemas/shared.schema';
	import ConfirmModalParentChild from './ConfirmModalParentChild.svelte';

	interface Props {
		demo: boolean;
		id: IdentifyParentChildItemSchema;
		formAction?: string;
		open: boolean;
		onClose: () => void;
	}

	let { open = false, onClose, id, formAction = '?/remove', demo = false }: Props = $props();

	function handleClose() {
		onClose();
	}
</script>

<ConfirmModalParentChild
	{demo}
	{id}
	message="¿Estas seguro que deseas remover este elemento?"
	{open}
	title="Confirmar"
	onClose={handleClose}
	{formAction}
	buttonLabel="Remover"
	actionButtonVariant="critical"
/>
