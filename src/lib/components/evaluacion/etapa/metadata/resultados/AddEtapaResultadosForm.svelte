<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputNumber from '$lib/components/ui/input/InputNumber.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { EtapaResultadosItem } from '$lib/schemas/etapaMetadata.schema';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';

	interface Props {
		selectedItem: EtapaResultadosItem;
		open: boolean;
		onClose: () => void;
	}

	let { selectedItem, open, onClose }: Props = $props();

	// Estado local del formulario
	let formData = $derived({
		target: selectedItem.target,
		result: selectedItem.result || 0,
		isGoalReached: selectedItem.isGoalReached || false,
		reason: selectedItem.reason
	});

	let errorMessage = $state('');
	let isSubmitting = $state(false);

	function handleSubmit() {
		// Validación básica
		if (!formData.target && formData.target !== 0) {
			errorMessage = 'La meta es requerida';
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
			<h2 class="modal-title text-h4">Capturar resultados</h2>
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
					<InputNumber
						label="Resultado"
						name="result"
						required={true}
						placeholder="1"
						status={errorMessage && !formData.result ? 'error' : 'normal'}
						disabled={isSubmitting}
						bind:value={formData.result}
						errors={errorMessage && !formData.result ? [errorMessage] : undefined}
					/>

					<TextArea
						label="Describa la razon"
						name="reason"
						placeholder="El indicador..."
						required={false}
						status={errorMessage && !formData.reason ? 'error' : 'normal'}
						disabled={isSubmitting}
						bind:value={formData.reason}
						errors={errorMessage && !formData.reason ? [errorMessage] : undefined}
						rows={4}
					/>
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
