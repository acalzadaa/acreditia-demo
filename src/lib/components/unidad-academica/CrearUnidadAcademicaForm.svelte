<script lang="ts">
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import Icon from '../ui/Icon.svelte';
	import type { CampusRef } from '$lib/schemas/campus.schema';

	interface Props {
		open: boolean;
		refs: CampusRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, refs = [] }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		campusId: '',
		code: '',
		name: ''
	});

	let errorMessage = $state('');

	// Opciones para el select de campus
	const campusOptions = $derived(
		refs.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		}))
	);

	// Auto-seleccionar si solo hay una opción
	$effect(() => {
		if (campusOptions.length === 1 && !formData.campusId) {
			formData.campusId = campusOptions[0].id;
		}
	});

	function handleSubmit() {
		// Validación básica
		if (!formData.campusId) {
			errorMessage = 'Debes seleccionar un campus';
			return;
		}
		if (!formData.code) {
			errorMessage = 'El código es requerido';
			return;
		}
		if (!formData.name) {
			errorMessage = 'El nombre es requerido';
			return;
		}

		// Aquí podrías console.log o guardar los datos si quieres
		console.log('Datos enviados (demo):', formData);
		
		// Limpiar formulario
		formData = {
			campusId: '',
			code: '',
			name: ''
		};
		
		// Limpiar mensaje de error
		errorMessage = '';
		
		// Cerrar modal
		handleClose();
	}

	function handleClose() {
		// Limpiar estado al cerrar
		formData = {
			campusId: '',
			code: '',
			name: ''
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

<Modal bind:open closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Crear unidad académica</h2>
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
						label="Campus"
						name="campusId"
						optionsData={campusOptions}
						required={true}
						bind:value={formData.campusId}
						errors={errorMessage && !formData.campusId ? [errorMessage] : undefined}
					/>

					<InputText
						label="Código"
						name="code"
						required={true}
						placeholder="UA-001"
						status={errorMessage && !formData.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.code}
						errors={errorMessage && !formData.code ? [errorMessage] : undefined}
					/>

					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="Facultad de Ingeniería"
						status={errorMessage && !formData.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.name}
						errors={errorMessage && !formData.name ? [errorMessage] : undefined}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear unidad académica</Button>
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