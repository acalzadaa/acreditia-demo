<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import { usuarioItemSchema, type UsuarioItem } from '$lib/schemas/usuario.schema';

	interface Props {
		open: boolean;
		selectedItem: UsuarioItem;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, submitting, tainted, isTainted, message, constraints } = superForm(
		props.selectedItem,
		{
			dataType: 'form',
			validators: zod4(usuarioItemSchema),
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
</script>

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Editar usuario</h2>
			<IconButton name="close" variant="ghost" size="lg" onClick={handleClose} isDisabled={false} />
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
					<InputText
						label="email"
						type="email"
						name="name"
						required={true}
						placeholder="acreditia@acreditia.com.mx"
						status={$errors.email ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.email}
						errors={$errors.email}
						{...$constraints.email}
					/>

					<InputText
						label="nombre"
						name="name"
						required={true}
						placeholder="Acreditia"
						status={$errors.firstName ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.firstName}
						errors={$errors.firstName}
						{...$constraints.firstName}
					/>

					<InputText
						label="apellido"
						name="lastName"
						required={true}
						placeholder="Acreditia"
						status={$errors.lastName ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.lastName}
						errors={$errors.lastName}
						{...$constraints.lastName}
					/>
				</div>
			</div>

			<menu class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose} isDisabled={$submitting}>
					Cancelar
				</Button>
				<Button type="submit" variant="primary" isDisabled={$submitting}>Editar</Button>
			</menu>
		</form>
	</div>
</Modal>
