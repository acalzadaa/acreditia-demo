<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { EtapaEjecucionPlanMejoraItem } from '$lib/schemas/etapaMetadata.schema';

	interface Props {
		selectedItem: EtapaEjecucionPlanMejoraItem;
		open: boolean;
		onClose: () => void;
	}

	let { selectedItem, open, onClose }: Props = $props();

	// Estado local del formulario
	let formData = $derived({
		processing: selectedItem.processing
	});

	let errorMessage = $state('');
	let isSubmitting = $state(false);

	function handleSubmit() {
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
			<h2 class="text-h4">Ejecutar plan de mejora</h2>
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
						<p class="confirm-message text-body-large">
							¿Esta seguro que desea iniciar la ejecucion del plan de mejora?
						</p>
					</div>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="submit" variant="primary" isDisabled={isSubmitting}>
					{isSubmitting ? 'Guardando...' : 'Ejecutar plan'}
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
