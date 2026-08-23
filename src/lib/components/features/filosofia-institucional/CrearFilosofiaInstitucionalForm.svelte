<script lang="ts">
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';

	
	import { toast } from '$lib/components/ui/toast/stores/toastManager.svelte';

	interface Props {
		open: boolean;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		code: '',
		name: '',
		description: ''
	});

	// Estado para mensajes de error (opcional, para demo)
	let errorMessage = $state('');

	function handleSubmit() {
		// Aquí podrías validar los datos si quieres
		if (!formData.code || !formData.name) {
			errorMessage = 'Código y nombre son requeridos';
			return;
		}

		// Limpiar el formulario
		formData = {
			code: '',
			name: '',
			description: ''
		};

		// Limpiar mensaje de error
		errorMessage = '';

		// Cerrar el modal
		handleClose();

		// Mostrar toast
		toast.success('Filosofia creada exitosamente');
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
			code: '',
			name: '',
			description: ''
		};
		errorMessage = '';
		handleClose();
	}
</script>

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Crear filosofía institucional</h2>
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
						label="Código"
						name="code"
						required={true}
						placeholder="PE-001"
						status={errorMessage && !formData.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.code}
					/>

					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="Excelencia educativa"
						status={errorMessage && !formData.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.name}
					/>

					<TextArea
						label="Descripción"
						name="description"
						placeholder="Descripción..."
						status="normal"
						disabled={false}
						bind:value={formData.description}
						rows={4}
					/>
				</div>
			</div>

			<menu class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear filosofia</Button>
			</menu>
		</form>
	</div>
</Modal>
