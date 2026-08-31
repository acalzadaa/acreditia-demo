<script lang="ts">
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { BaseRef } from '$lib/schemas/shared.schema';
	import InputSelectCustom from '$lib/components/ui/select/InputSelectCustom.svelte';

	interface Props {
		open: boolean;
		ref: BaseRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ref = [] }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		id: ''
	});

	let errorMessage = $state('');

	// Opciones para el select de puesto
	const evidenciaOptions = $derived(
		ref.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		}))
	);

	function handleSubmit() {
		// Validación básica
		if (!formData.id) {
			errorMessage = 'Debes seleccionar una evidencia';
			return;
		}

		// Aquí podrías console.log o guardar los datos si quieres
		console.log('Datos enviados (demo):', formData);

		// Limpiar formulario
		formData = {
			id: ''
		};

		// Limpiar mensaje de error
		errorMessage = '';

		// Cerrar modal
		handleClose();
	}

	function handleClose() {
		// Limpiar estado al cerrar
		formData = {
			id: ''
		};
		errorMessage = '';
		onClose();
	}

	function handleCancel() {
		handleClose();
	}

	function onKeydownClose(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	}
</script>

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Agregar evidencia</h2>
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
				<div class="form-fields">
					{#if errorMessage}
						<div class="form-feedback form-feedback--error" role="alert">
							<Icon name="warning" />
							{errorMessage}
						</div>
					{/if}

					<InputSelectCustom
						label="Evidencia"
						name="id"
						optionsData={evidenciaOptions}
						required={true}
						bind:value={formData.id}
						errors={errorMessage && !formData.id ? [errorMessage] : undefined}
					/>
				</div>
			</div>

			<menu class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Agregar</Button>
			</menu>
		</form>
	</div>
</Modal>

<style>
	/* Responsive */
	@media (max-width: 640px) {
		.modal {
			margin: 0.5rem;
			max-height: calc(100vh - 1rem);
		}

		.modal-header,
		.form-fields,
		.modal-footer {
			padding: var(--space-4);
		}
	}
</style>
