<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputNumber from '$lib/components/ui/input/InputNumber.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import type { EvaluacionEtapaIndicadorItemFor } from '$lib/schemas/evaluacionEtapaIndicador.schema';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';
	type ResultadosIndicadorItem = EvaluacionEtapaIndicadorItemFor<'resultados'>;

	interface Props {
		selectedItem: ResultadosIndicadorItem;
		open: boolean;
		onClose: () => void;
	}

	let { selectedItem, open, onClose }: Props = $props();

	// Estado de los campos
	let formData = $derived({
		target: selectedItem.metadata.target,
		result: selectedItem.metadata.result || 0,
		isGoalReached: selectedItem.metadata.isGoalReached || false,
		reason: selectedItem.metadata.reason
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
						label="Resultados"
						name="results"
						required={true}
						placeholder="20"
						status={errorMessage && !formData.target ? 'error' : 'normal'}
						disabled={isSubmitting}
						bind:value={formData.target}
						errors={errorMessage && !formData.target ? [errorMessage] : undefined}
					/>
					{#if formData.result && !formData.isGoalReached}
						<TextArea
							label="Describa la razón"
							name="reason"
							placeholder="El campus no..."
							required={false}
							status={errorMessage && !formData.reason ? 'error' : 'normal'}
							disabled={isSubmitting}
							bind:value={formData.reason}
							errors={errorMessage && !formData.reason ? [errorMessage] : undefined}
							rows={4}
						/>
					{/if}
				</div>
			</div>

			<menu class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary" isDisabled={isSubmitting}>
					{isSubmitting ? 'Guardando...' : 'Capturar'}
				</Button>
			</menu>
		</form>
	</div>
</Modal>
