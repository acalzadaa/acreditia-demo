<script lang="ts">
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import Icon from '../ui/Icon.svelte';
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		open: boolean;
		selectedItem: any;
		onConfirm: () => void;
		onClose: () => void;
	}

	let { open = $bindable(false), selectedItem, onConfirm, onClose }: Props = $props();
	let isDeleting = $state(false);

	function onKeydownClose(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onClose();
		}
	}
</script>

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Confirmar eliminación</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={onClose}
				onKeydown={(e) => onKeydownClose(e)}
				isDisabled={isDeleting}
			/>
		</header>

		<div class="modal-form confirm-content">
			<p class="confirm-message text-body-large">
				¿Estás seguro de que deseas eliminar el registro <strong>"{selectedItem?.name}"</strong>?
			</p>
			<span class="confirm-warning text-body">
			<Icon name="warning" color="var(--bg-warning-bold)"></Icon>
				Esta acción no se puede deshacer.</span>
		</div>

		<footer class="modal-footer form-actions text-body">
			<Button type="button" variant="ghost" onClick={onClose} isDisabled={isDeleting}>
				Cancelar
			</Button>
			<Button type="button" variant="critical" onClick={onConfirm} isDisabled={isDeleting}>
				Eliminar
			</Button>
		</footer>
	</div>
</Modal>

<style>
	.confirm-content {
		padding: var(--space-6);
		text-align: center;
	}

	.confirm-message {
		margin-bottom: var(--space-4);
	}

	.confirm-warning {
		display: flex;
		justify-content: center;
		gap: 15px;
	}
</style>
