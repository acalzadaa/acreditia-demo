<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { EtapaAutoevaluacionItem } from '$lib/schemas/etapaMetadata.schema';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';

	interface Props {
		selectedItem: EtapaAutoevaluacionItem;
		open: boolean;
		onClose: () => void;
	}

	let { selectedItem, open, onClose }: Props = $props();

	// Estado local del formulario
	let formData = $derived({
		comentario: selectedItem.comentario || ''
	});

	let errorMessage = $state('');
	let isSubmitting = $state(false);

	function handleSubmit() {
		// Aquí podrías console.log o guardar los datos si quieres
		console.log('Datos enviados (demo):', formData);

		// Simular envío
		isSubmitting = true;

		// Limpiar mensaje de error
		errorMessage = '';

		// Notificar al padre si es necesario

		// Resetear estado de envío
		handleClose();
	}

	function handleClose() {
		onClose();
	}
</script>

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="text-h4">Capturar comentario</h2>
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

			<div class="form-fields">
				<div class="modal-body">
					<TextArea
						label="Agregue un comentario"
						name="comment"
						placeholder="La rubrica..."
						required={false}
						status={errorMessage && !formData.comentario ? 'error' : 'normal'}
						disabled={isSubmitting}
						bind:value={formData.comentario}
						errors={errorMessage && !formData.comentario ? [errorMessage] : undefined}
						rows={4}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="submit" variant="primary" isDisabled={isSubmitting}>
					{isSubmitting ? 'Guardando...' : 'Capturar'}
				</Button>
			</footer>
		</form>
	</div>
</Modal>
