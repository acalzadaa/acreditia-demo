<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';

	import { toast } from '$lib/utils/toastManager.svelte';

	interface Props {
		open: boolean;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		email: '',
		firstName: '',
		lastName: ''
	});

	// Estado para mensajes de error (opcional, para demo)
	let errorMessage = $state('');

	function handleSubmit() {
		// Limpiar el formulario
		formData = {
			email: '',
			firstName: '',
			lastName: ''
		};

		// Limpiar mensaje de error
		errorMessage = '';

		// Cerrar el modal
		handleClose();

		// Mostrar toast
		toast.success('Usuario creado exitosamente');
	}

	function handleClose() {
		onClose();
	}

	function onKeydownClose(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	}

	function handleCancel() {
		// Limpiar formulario al cancelar también
		formData = {
			email: '',
			firstName: '',
			lastName: ''
		};
		errorMessage = '';
		handleClose();
	}
</script>

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Crear usuario</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={handleCancel}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form
			onsubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<div class="modal-body">
				{#if errorMessage}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning"></Icon>
						{errorMessage}
					</div>
				{/if}

				<div class="form-fields">
					<InputText
						label="Email"
						type="email"
						name="email"
						required={true}
						placeholder="acreditia@acreditia.com.mx"
						status={errorMessage && !formData.email ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.email}
					/>

					<InputText
						label="Nombre"
						name="firstName"
						required={true}
						placeholder="Alberto"
						status={errorMessage && !formData.firstName ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.firstName}
					/>

					<InputText
						label="Apellido"
						name="lastName"
						required={true}
						placeholder="Alvarez"
						status={errorMessage && !formData.lastName ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.lastName}
					/>
				</div>
			</div>

			<menu class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear</Button>
			</menu>
		</form>
	</div>
</Modal>
