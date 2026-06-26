<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import Modal from '$lib/components/modal/Modal.svelte';

	interface Props {
		selectedItem: RubricaItem;
		open: boolean;
		onClose: () => void;
		currentScore: number;
	}

	let { selectedItem, open, onClose, currentScore }: Props = $props();

	// Estado local del formulario
	let formData = $derived({
		score: selectedItem.rangeEnd
	});

	let errorMessage = $state('');
	let isSubmitting = $state(false);

	function handleSubmit() {
		// Validación básica
		if (!formData.score && formData.score !== 0) {
			errorMessage = 'El score es requerido';
			return;
		}

		console.log('Datos enviados (demo):', formData);

		// Simular envío
		isSubmitting = true;

		// Limpiar mensaje de error
		errorMessage = '';

		// Notificar al padre si es necesario

		// Resetear estado de envío
		isSubmitting = false;
		handleClose();
	}

	function handleClose() {
		onClose();
	}
</script>

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="text-h4">Capturar autoevaluacion</h2>
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
					<div class="confirm-content">
						{#if currentScore !== selectedItem.rangeEnd}
							<p class="confirm-message text-body-large">
								¿Desea modificar la calificacion de la autoevaluacion por <strong
									>"{formData.score}"</strong
								>?
							</p>
						{:else}
							<p class="confirm-message text-body-large">
								¿Desea confirmar la calificacion de la autoevaluacion de <strong
									>"{formData.score}"</strong
								>?
							</p>
						{/if}
					</div>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary" isDisabled={isSubmitting}>
					{isSubmitting ? 'Guardando...' : 'Capturar'}
				</Button>
			</footer>
		</form>
	</div>
</Modal>

<style>
	.confirm-content {
		padding: var(--space-3) var(--space-6);
		text-align: left;
	}
</style>
