<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { EtapaCapturaPlanMejoraItem } from '$lib/schemas/etapaMetadata.schema';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';

	interface Props {
		selectedItem: EtapaCapturaPlanMejoraItem;
		open: boolean;
		onClose: () => void;
	}

	let { selectedItem, open, onClose }: Props = $props();

	// Estado local del formulario
	let formData = $derived({
		agreements: selectedItem.agreements || ''
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
			<h2 class="text-h4">Editar acuerdos</h2>
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
						label="Agregue su acuerdo"
						name="agreement"
						placeholder="Se va a desarrollar un proceso..."
						required={false}
						status={errorMessage && !formData.agreements ? 'error' : 'normal'}
						disabled={isSubmitting}
						bind:value={formData.agreements}
						errors={errorMessage && !formData.agreements ? [errorMessage] : undefined}
						rows={4}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary" isDisabled={isSubmitting}>
					{isSubmitting ? 'Guardando...' : 'Editar'}
				</Button>
			</footer>
		</form>
	</div>
</Modal>
