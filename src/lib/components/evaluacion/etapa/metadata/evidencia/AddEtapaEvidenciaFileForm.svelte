<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import InputFile from '$lib/components/ui/input/InputFile.svelte';
	import { isDirty } from 'zod/v3';
	import Modal from '$lib/components/modal/Modal.svelte';

	interface Props {
		open: boolean;
		onClose: () => void;
	}

	let { open, onClose }: Props = $props();

	// Estado local del formulario - usar null en lugar de undefined
	let file = $state<File | null>(null);
	let url = $state<string>('');

	let errorMessage = $state('');
	let isSubmitting = $state(false);

	function handleSubmit() {
		if (!file) {
			errorMessage = 'El archivo de evidencia es requerido';
			return;
		}

		// Construir FormData para enviar archivo
		const formData = new FormData();
		formData.append('url', url);
		formData.append('file', file);

		console.log('Datos enviados (demo):', {
			url,
			fileName: file.name,
			fileSize: file.size,
			fileType: file.type
		});

		// Simular envío
		isSubmitting = true;
		errorMessage = '';

		// Simular async
		setTimeout(() => {
			isSubmitting = false;
			console.log('Envío completado (demo)');

			// Opcional: resetear el formulario después del envío
			// file = null;
			// url = '';
		}, 1500);

		handleClose();
	}

	function handleClose() {
		onClose();
	}
</script>

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Capturar archivo de evidencia</h2>
		</header>

		<form
			onsubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			{#if errorMessage}
				<div class="form-feedback form-feedback--error" role="alert">
					<Icon name="warning" />
					{errorMessage}
				</div>
			{/if}

			<div class="modal-body">
				<div class="form-fields">
					<InputFile
						label="Archivo de evidencia"
						name="evidencia"
						required={false}
						disabled={isSubmitting}
						bind:value={file}
						errors={errorMessage && !file ? [errorMessage] : undefined}
						accept={['image/jpeg', 'image/png', 'image/gif', 'application/pdf']}
						maxSizeMB={10}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary" isDisabled={isSubmitting || !isDirty}>
					{isSubmitting ? 'Guardando...' : 'Capturar'}
				</Button>
			</footer>
		</form>
	</div>
</Modal>
