<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import {
		planeacionEstrategicaWithFilosofiaItemSchema,
		type PlaneacionEstrategicaWithFilosofiaItem
	} from '$lib/schemas/planeacionEstrategica.schema';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import type { FilosofiaInstitucionalRefSchema } from '$lib/schemas/filosofiaInstitucional.schema';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		open: boolean;
		selectedItem: PlaneacionEstrategicaWithFilosofiaItem;
		refs: FilosofiaInstitucionalRefSchema[];
		onClose: () => void;
	}

	let { open = $bindable(false), refs, onClose, ...props }: Props = $props();

	const filosofiaOptions = $derived(
		refs?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, submitting, tainted, isTainted, message, constraints } = superForm(
		props.selectedItem,
		{
			dataType: 'json',
			validators: zod4(planeacionEstrategicaWithFilosofiaItemSchema),
			validationMethod: 'onblur',
			customValidity: false,
			resetForm: false,
			taintedMessage: 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?',
			onSubmit: ({ cancel }) => {
				if (!isTainted($tainted)) {
					cancel();
					handleClose();
					console.log('No hay cambios para guardar');
				}
			},
			onUpdated: async ({ form }) => {
				if (form.valid) {
					handleClose();
				}
			}
		}
	);

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
			<h2 class="modal-title text-h4">Editar planeacion estrategica</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={handleClose}
				onKeydown={(e) => onKeydownClose(e)}
				isDisabled={false}
			/>
		</header>

		<form method="POST" action="?/edit" use:enhance>
			<!-- Hidden input para el ID -->
			<input type="hidden" name="id" value={$form.id} />

			<div class="modal-body">
				{#if $message}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning"></Icon>
						{$message}
					</div>
				{/if}

				<div class="form-fields">
					<InputSelect
						label="Filosofía Institucional"
						name="filosofiaId"
						optionsData={filosofiaOptions}
						required={true}
						bind:value={$form.filosofiaId}
						errors={$errors.filosofiaId}
						{...$constraints.filosofiaId}
					></InputSelect>

					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="Excelencia educativa"
						status={$errors.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.name}
						errors={$errors.name}
					/>

					<TextArea
						label="Descripcion"
						name="description"
						placeholder="Descripcion..."
						bind:value={$form.description}
						rows={4}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose} isDisabled={$submitting}>
					Cancelar
				</Button>
				<Button type="submit" variant="primary" isDisabled={$submitting}>Editar planeacion</Button>
			</footer>
		</form>
	</div>
</Modal>

<style>
	.form-fields {
		padding: var(--space-6);
		flex: 1;
		overflow-y: auto;
		min-height: 0;
		scrollbar-width: thin;
		scrollbar-color: var(--border-regular) var(--bg-ground);
	}

	.form-fields::-webkit-scrollbar {
		width: 8px;
	}

	.form-fields::-webkit-scrollbar-track {
		background: var(--bg-ground);
		border-radius: 4px;
	}

	.form-fields::-webkit-scrollbar-thumb {
		background-color: var(--border-regular);
		border-radius: 4px;
		border: 2px solid var(--bg-ground);
	}

	.form-fields::-webkit-scrollbar-thumb:hover {
		background-color: var(--border-brand);
	}

	/* Responsive */
	@media (max-width: 640px) {
		.modal {
			margin: 0.5rem;
			max-height: calc(100vh - 1rem);
		}

		.modal-header,
		.form-fields,
		.modal-footer {
			padding: var(--space-4);
		}
	}
</style>
