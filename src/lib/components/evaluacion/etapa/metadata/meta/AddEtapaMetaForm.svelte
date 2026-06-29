<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import InputNumber from '$lib/components/ui/input/InputNumber.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { EtapaMetaItem } from '$lib/schemas/etapaMetadata.schema';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';
	import InputCheckbox from '$lib/components/ui/input/InputCheckbox.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';

	interface Props {
		selectedItem: EtapaMetaItem;
		open: boolean;
		onClose: () => void;
	}

	let { selectedItem, open, onClose }: Props = $props();

	// Estado del checkbox "no aplica"
	// svelte-ignore state_referenced_locally
	let doesNotApply = $state(selectedItem.doesNotApply || false);

	// Estado de los campos
	// svelte-ignore state_referenced_locally
	let target = $state(selectedItem.target || 0);
	// svelte-ignore state_referenced_locally
	let targetUnit = $state(selectedItem.targetUnit || '');
	// svelte-ignore state_referenced_locally
	let doesNotApplyReason = $state(selectedItem.doesNotApplyReason || '');

	let errorMessage = $state('');
	let isSubmitting = $state(false);

	function handleSubmit() {
		// Validación básica basada en el estado del checkbox
		if (!doesNotApply) {
			if (!targetUnit || targetUnit === '') {
				errorMessage = 'La unidad de meta es requerida';
				return;
			}
		} else {
			// Si está marcado "no aplica", la razón es obligatoria
			if (!doesNotApplyReason || doesNotApplyReason === '') {
				errorMessage = 'La razón es requerida cuando el indicador no aplica';
				return;
			}
		}

		// Preparar datos para enviar
		const formData = {
			target: doesNotApply ? null : target,
			targetUnit: doesNotApply ? null : targetUnit,
			doesNotApply: doesNotApply,
			doesNotApplyReason: doesNotApply ? doesNotApplyReason : null
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

					<InputCheckbox
						label="El indicador no aplica para este campus"
						name="doesNotApply"
						required={false}
						status={errorMessage && !doesNotApplyReason && doesNotApply ? 'error' : 'normal'}
						disabled={isSubmitting}
						bind:checked={doesNotApply}
						errors={errorMessage && !doesNotApplyReason && doesNotApply
							? [errorMessage]
							: undefined}
					/>

					<TextArea
						label="Describa la razón"
						name="doesNotApplyReason"
						placeholder="El indicador..."
						required={false}
						status={errorMessage && !doesNotApplyReason && doesNotApply ? 'error' : 'normal'}
						disabled={isSubmitting}
						bind:value={doesNotApplyReason}
						errors={errorMessage && !doesNotApplyReason && doesNotApply
							? [errorMessage]
							: undefined}
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
