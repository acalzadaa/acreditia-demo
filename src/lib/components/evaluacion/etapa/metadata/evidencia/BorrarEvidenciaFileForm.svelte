<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { evidenciaFileRefSchema, type EvidenciaFileRef } from '$lib/schemas/etapaMetadata.schema';
	import Modal from '$lib/components/modal/Modal.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		open: boolean;
		item: EvidenciaFileRef;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, enhance } = superForm(props.item, {
		dataType: 'json',
		validators: zod4(evidenciaFileRefSchema),
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

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Borrar archivo</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={onClose}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form method="POST" action="?/deleteFile" use:enhance>
			<!-- Hidden input para el ID -->
			<input type="hidden" name="id" value={$form.id} />

			<div class="modal-body">
				<div class="confirm-content">
					<p class="confirm-message text-body-large">
						¿Estás seguro de que deseas aliminar el registro <strong>"{props.item?.filename}"</strong
						>?
					</p>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="critical">Borrar</Button>
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
		text-align: left;
	}
</style>
