<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import { estatusOptions } from '$lib/types/common.types';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { entidadLegalItemSchema, type EntidadLegalItem } from '$lib/schemas/entidadLegal.schema';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		open: boolean;
		selectedItem: EntidadLegalItem;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, tainted, isTainted, message } = superForm(props.selectedItem, {
		dataType: 'json',
		validators: zod4(entidadLegalItemSchema),
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
			<h2 class="modal-title text-h4">Editar entidad legal</h2>
			<IconButton
				name={'close'}
				variant={'ghost'}
				size={'lg'}
				onClick={handleClose}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form method="POST" action="?/edit" use:enhance>
			<!-- Hidden input para el ID -->
			<input type="hidden" name="id" value={$form.id} />

			<div class="modal-body">
				{#if $message}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name={'warning'}></Icon>
						{$message}
					</div>
				{/if}

				<div class="form-fields">
					<InputText
						label={'Código'}
						name={'code'}
						required={true}
						placeholder={'GESEAC'}
						status={$errors.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.code}
						errors={$errors.code}
					/>

					<InputText
						label={'Nombre'}
						name={'name'}
						required={true}
						placeholder={'p.e Grupo Educativo del Sureste A.C'}
						status={$errors.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.name}
						errors={$errors.name}
					/>

					<InputSelect
						label={'Estado'}
						name={'status'}
						optionsData={estatusOptions}
						required={true}
						bind:value={$form.status}
						errors={$errors.status}
					></InputSelect>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear</Button>
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
		.form-fields,
		.modal-footer {
			padding: var(--space-4);
		}
	}
</style>
