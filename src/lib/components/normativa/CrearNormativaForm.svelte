<script lang="ts">
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import Icon from '../ui/Icon.svelte';
	import TextArea from '../ui/input/TextArea.svelte';

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

	let errorMessage = $state('');

	function handleSubmit() {
		// Validación básica
		if (!formData.code) {
			errorMessage = 'El código es requerido';
			return;
		}
		if (!formData.name) {
			errorMessage = 'El nombre es requerido';
			return;
		}

		// Demo: solo mostrar en consola
		console.log('Demo - Crear normativa:', formData);
		
		// Limpiar formulario
		clearForm();
		
		// Cerrar modal
		handleClose();
	}

	function clearForm() {
		formData = {
			code: '',
			name: '',
			description: ''
		};
		errorMessage = '';
	}

	function handleClose() {
		// Limpiar estado al cerrar
		clearForm();
		onClose();
	}

	function handleCancel() {
		handleClose();
	}

	function onKeydownClose(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	}
</script>

<Modal bind:open closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Crear normativa</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={handleCancel}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}>
			<div class="modal-body">
				{#if errorMessage}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning" />
						{errorMessage}
					</div>
				{/if}

				<div class="form-fields">
					<InputText
						label="Código"
						name="code"
						required={true}
						placeholder="GESEAC"
						status={errorMessage && !formData.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.code}
						errors={errorMessage && !formData.code ? [errorMessage] : undefined}
					/>

					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="p.e Grupo Educativo del Sureste A.C"
						status={errorMessage && !formData.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.name}
						errors={errorMessage && !formData.name ? [errorMessage] : undefined}
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

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear normativa</Button>
			</footer>
		</form>
	</div>
</Modal>
