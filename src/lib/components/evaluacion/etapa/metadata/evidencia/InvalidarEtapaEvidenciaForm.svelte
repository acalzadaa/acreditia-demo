<script lang="ts">
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';

	import { toast } from '$lib/components/ui/toast/stores/toastManager.svelte';
	import type { EvaluacionEtapaIndicadorItemFor } from '$lib/schemas/evaluacionEtapaIndicador.schema';
	type EvidenciaIndicadorItem = EvaluacionEtapaIndicadorItemFor<'evidencia'>;

	interface Props {
		selectedItem: EvidenciaIndicadorItem;
		open: boolean;
		onClose: () => void;
	}

	let { selectedItem, open = $bindable(false), onClose }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		invalidateReason: selectedItem.metadata.invalidateReason
	});

	// Estado para mensajes de error (opcional, para demo)
	let errorMessage = $state('');

	function handleSubmit() {
		// Limpiar el formulario
		formData = {
			invalidateReason: ''
		};

		// Limpiar mensaje de error
		errorMessage = '';

		// Cerrar el modal
		handleClose();

		// Mostrar toast
		toast.success('Indicador de etapa invalidada exitosamente');
	}

	function handleClose() {
		onClose();
	}

	function onKeydownClose(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	}

	function handleCancel() {
		// Limpiar formulario al cancelar también
		formData = {
			invalidateReason: ''
		};
		errorMessage = '';
		handleClose();
	}
</script>

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Invalidar indicador</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={handleCancel}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form
			onsubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<div class="modal-body">
				{#if errorMessage}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning"></Icon>
						{errorMessage}
					</div>
				{/if}

				<div class="form-fields">
					<TextArea
						label="Razón de invalidación"
						name="invalidateReason"
						placeholder="El indicador no..."
						status="normal"
						disabled={false}
						bind:value={formData.invalidateReason}
						rows={4}
					/>
				</div>
			</div>

			<menu class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="critical">Invalidar</Button>
			</menu>
		</form>
	</div>
</Modal>
