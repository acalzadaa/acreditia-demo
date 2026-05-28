<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { normativaItemSchema, type NormativaItem } from '$lib/schemas/normativa.schema';

	interface Props {
		open: boolean;
		selectedItem: NormativaItem;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, selectedItem }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, enhance } = superForm(selectedItem, {
		dataType: 'json',
		validators: zod4(normativaItemSchema),
		customValidity: false,
		resetForm: false,
		onSubmit: () => {
			handleClose();
		},
		onUpdated: async ({ form }) => {
			if (form.valid) {
				handleClose();
			}
		}
	});

	function handleClose() {
		onClose();
	}

	function onKeydownClose(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleClose();
		}
	}
</script>

<Modal bind:open closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Restaurar entidad legal</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={onClose}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form method="POST" action="?/restore" use:enhance>
			<!-- Hidden input para el ID -->
			<input type="hidden" name="id" value={$form.id} />
			<input type="hidden" name="code" value={$form.code} />

			<div class="modal-body">
				<div class="confirm-content">
					<p class="confirm-message text-body-large">
						¿Estás seguro de que deseas restaurar el registro <strong>"{selectedItem?.name}"</strong
						>?
					</p>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary">Restaurar entidad</Button>
			</footer>
		</form>
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
