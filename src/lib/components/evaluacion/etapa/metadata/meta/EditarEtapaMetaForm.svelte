<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import InputNumber from '$lib/components/ui/input/InputNumber.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import type { EvaluacionEtapaIndicadorItemFor } from '$lib/schemas/evaluacionEtapaIndicador.schema';
	type MetaIndicadorItem = EvaluacionEtapaIndicadorItemFor<'meta'>;

	interface Props {
		selectedItem: MetaIndicadorItem;
		open: boolean;
		onClose: () => void;
	}

	let { selectedItem, open, onClose }: Props = $props();

	// Estado de los campos
	// svelte-ignore state_referenced_locally
	let target = $state(selectedItem.metadata.target || 0);
	// svelte-ignore state_referenced_locally
	let targetUnit = $state(selectedItem.metadata.targetUnit || '');

	let errorMessage = $state('');
	let isSubmitting = $state(false);

	function handleSubmit() {
		// Preparar datos para enviar
		const formData = {
			target: target,
			targetUnit: targetUnit
		};

		console.log('Datos enviados:', formData);

		// Simular envío
		isSubmitting = true;
		errorMessage = '';

		// Resetear estado de envío después de un tiempo
		setTimeout(() => {
			isSubmitting = false;
		}, 2000);
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
			<h2 class="modal-title text-h4">Capturar meta</h2>
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
						label="Meta"
						name="target"
						required={true}
						placeholder="20"
						status={errorMessage && !target ? 'error' : 'normal'}
						disabled={isSubmitting}
						bind:value={target}
						errors={errorMessage && !target ? [errorMessage] : undefined}
					/>

					<InputText
						label="Unidad de meta"
						name="targetUnit"
						required={true}
						placeholder="%"
						status={errorMessage && !targetUnit ? 'error' : 'normal'}
						disabled={isSubmitting}
						bind:value={targetUnit}
						errors={errorMessage && !targetUnit ? [errorMessage] : undefined}
					/>
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
