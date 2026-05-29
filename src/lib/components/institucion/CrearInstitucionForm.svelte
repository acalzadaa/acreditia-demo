<script lang="ts">
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import Icon from '../ui/Icon.svelte';
	import type { RegionRef } from '$lib/schemas/region.schema';

	interface Props {
		open: boolean;
		regiones: RegionRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, regiones = [] }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		regionId: '',
		code: '',
		name: ''
	});

	let errorMessage = $state('');

	const regionesOptions = $derived(
		regiones.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		}))
	);

	// Auto-seleccionar entidad legal si solo hay una opción
	$effect(() => {
		if (regionesOptions.length === 1 && !formData.regionId) {
			formData.regionId = regionesOptions[0].id;
		}
	});

	// Auto-seleccionar región si solo hay una opción
	$effect(() => {
		if (regionesOptions.length === 1 && !formData.regionId) {
			formData.regionId = regionesOptions[0].id;
		}
	});

	function handleSubmit() {
		// Validación básica

		if (!formData.regionId) {
			errorMessage = 'Debes seleccionar una región';
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
			regionId: '',
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
			regionId: '',
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
			<h2 class="modal-title text-h4">Crear institución</h2>
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

					<InputSelect
						label="Región"
						name="regionId"
						optionsData={regionesOptions}
						required={true}
						bind:value={formData.regionId}
						errors={errorMessage && !formData.regionId ? [errorMessage] : undefined}
					/>

					<InputText
						label="Código"
						name="code"
						required={true}
						placeholder="INST-001"
						status={errorMessage && !formData.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.code}
						errors={errorMessage && !formData.code ? [errorMessage] : undefined}
					/>

					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="Instituto Tecnológico..."
						status={errorMessage && !formData.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.name}
						errors={errorMessage && !formData.name ? [errorMessage] : undefined}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear institución</Button>
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
