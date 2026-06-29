<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputSelect from '$lib/components/ui/input/InputSelect.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { UnidadAcademicaRef } from '$lib/schemas/shared.schema';

	interface Props {
		open: boolean;
		unidadAcademicaRef: UnidadAcademicaRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, unidadAcademicaRef = [] }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		code: ''
	});

	let errorMessage = $state('');

	// Opciones para el select de unidad académica
	const unidadAcademicaOptions = $derived(
		unidadAcademicaRef.map((ref) => ({
			id: ref.code,
			option: `${ref.code} - ${ref.name}`
		}))
	);

	function handleSubmit() {
		// Validación básica
		if (!formData.code) {
			errorMessage = 'Debes seleccionar una unidad académica';
			return;
		}

		// Aquí podrías console.log o guardar los datos si quieres
		console.log('Datos enviados (demo):', formData);
		
		// Limpiar formulario
		formData = {
			code: ''
		};
		
		// Limpiar mensaje de error
		errorMessage = '';
		
		// Cerrar modal
		handleClose();
	}

	function handleClose() {
		// Limpiar estado al cerrar
		formData = {
			code: ''
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
			<h2 class="modal-title text-h4">Agregar unidad académica</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={handleCancel}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}>
			<div class="modal-body">
				<div class="form-fields">
					{#if errorMessage}
						<div class="form-feedback form-feedback--error" role="alert">
							<Icon name="warning" />
							{errorMessage}
						</div>
					{/if}

					<InputSelect
						label="Unidad Académica"
						name="code"
						optionsData={unidadAcademicaOptions}
						required={true}
						bind:value={formData.code}
						errors={errorMessage && !formData.code ? [errorMessage] : undefined}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Agregar unidad</Button>
			</footer>
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