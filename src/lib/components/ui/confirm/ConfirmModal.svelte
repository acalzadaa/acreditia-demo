<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import type { ButtonVariant } from '../Button.svelte';
	import Button from '../Button.svelte';
	import IconButton from '../IconButton.svelte';

	interface Props {
		id: string;
		open: boolean;
		formAction?: string;
		title?: string;
		message?: string;
		buttonLabel?: string;
		actionButtonVariant?: ButtonVariant;
		onClose: () => void;
		demo?: boolean;
	}

	let {
		id,
		open = false,
		onClose,
		formAction = '?/confirm',
		title = 'Confirmar accion',
		message = 'Favor de confirmar la accion',
		buttonLabel = 'Confirmar',
		actionButtonVariant = 'critical',
		demo = false
	}: Props = $props();

	function handleClose() {
		onClose();
	}
</script>

<Modal {open} onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">{title}</h2>
			<IconButton name="close" variant="ghost" size="lg" onClick={onClose} />
		</header>

		{#if demo}
			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleClose();
				}}
			>
				<input type="hidden" name="id" value={id} />
				<div class="modal-body">
					<div class="confirm-content">
						<p class="confirm-message text-body-large">
							{message}
						</p>
					</div>
				</div>

				<footer class="modal-footer text-body">
					<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
					<Button type="submit" variant={actionButtonVariant}>{buttonLabel}</Button>
				</footer>
			</form>
		{:else}
			<form method="POST" action={formAction} use:enhance>
				<input type="hidden" name="id" value={id} />
				<div class="modal-body">
					<div class="confirm-content">
						<p class="confirm-message text-body-large">
							{message}
						</p>
					</div>
				</div>

				<menu class="modal-footer text-body">
					<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
					<Button type="submit" variant={actionButtonVariant}>{buttonLabel}</Button>
				</menu>
			</form>
		{/if}
	</div>
</Modal>

<style>
	/* Responsive */
	@media (max-width: 640px) {
		.modal {
			margin: 0.5rem;
			max-height: calc(100vh - 1rem);
		}

		.modal-header,
		.modal-footer {
			padding: var(--space-4);
		}
	}

	.confirm-content {
		padding: var(--space-3) var(--space-6);
		text-align: center;
	}
</style>
