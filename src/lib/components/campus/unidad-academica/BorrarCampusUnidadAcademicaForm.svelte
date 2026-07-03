<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Modal from '../../modal/Modal.svelte';
	import Button from '../../ui/Button.svelte';
	import IconButton from '../../ui/IconButton.svelte';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import {
		unidadAcademicaItemSchema,
		type UnidadAcademicaItem
	} from '$lib/schemas/unidadAcademica.schema';

	interface Props {
		open: boolean;
		selectedItem: UnidadAcademicaItem;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, selectedItem }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, enhance } = superForm(selectedItem, {
		dataType: 'json',
		validators: zod4(unidadAcademicaItemSchema),
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
			<h2 class="modal-title text-h4">Remover unidad</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={onClose}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form method="POST" action="?/deleteCampusUnidadAcademica" use:enhance>
			<input type="hidden" name="code" value={$form.code} />

			<div class="modal-form confirm-content">
				<p class="confirm-message text-body-large">
					¿Estás seguro de que deseas remover el registro <strong>"{selectedItem?.name}"</strong>?
				</p>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="critical">Remover unidad</Button>
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
		padding: var(--space-6);
		text-align: center;
	}
</style>
