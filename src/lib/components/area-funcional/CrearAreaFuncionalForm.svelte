<script lang="ts">
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import Icon from '../ui/Icon.svelte';
	import type { PuestoRef } from '$lib/schemas/puesto.schema';
	import type { AreaFuncionalRef } from '$lib/schemas/areaFuncional.schema';

	interface Props {
		open: boolean;
		refs: PuestoRef[];
		areaFuncionalRef: AreaFuncionalRef[];

		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		puestoId: '',
		code: '',
		name: '',
		description: '',
		parentId: ''
	});

	let errorMessage = $state('');

	// Opciones para el select de puesto
	const puestoOptions = $derived(
		props.refs?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	const areaFuncionalOptions = $derived(
		props.areaFuncionalRef?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	// Auto-seleccionar si solo hay una opción
	$effect(() => {
		if (puestoOptions.length === 1 && !formData.puestoId) {
			formData.puestoId = puestoOptions[0].id;
		}
	});

	function handleSubmit() {
		// Validación básica
		if (!formData.puestoId) {
			errorMessage = 'Debes seleccionar un puesto';
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
			puestoId: '',
			code: '',
			name: '',
			description: '',
			parentId: ''
		};

		// Limpiar mensaje de error
		errorMessage = '';

		// Cerrar modal
		handleClose();
	}

	function handleClose() {
		// Limpiar estado al cerrar
		formData = {
			puestoId: '',
			code: '',
			name: '',
			description: '',
			parentId: ''
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
			<h2 class="modal-title text-h4">Crear área funcional</h2>
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
						label="Puesto"
						name="puestoId"
						optionsData={puestoOptions}
						required={true}
						bind:value={formData.puestoId}
						errors={errorMessage && !formData.puestoId ? [errorMessage] : undefined}
					/>

					<InputText
						label="Código"
						name="code"
						required={true}
						placeholder="AF-001"
						status={errorMessage && !formData.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.code}
						errors={errorMessage && !formData.code ? [errorMessage] : undefined}
					/>

					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="Dirección de Finanzas"
						status={errorMessage && !formData.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.name}
						errors={errorMessage && !formData.name ? [errorMessage] : undefined}
					/>

					<TextArea
						label="Descripción"
						name="description"
						placeholder="Descripción..."
						bind:value={formData.description}
						rows={4}
					/>

					<InputSelect
						label="Reporta a"
						name="parentId"
						optionsData={areaFuncionalOptions}
						required={true}
						bind:value={formData.parentId}
						nullOption="Ninguno (es un elemento raiz)"
						errors={errorMessage && !formData.parentId ? [errorMessage] : undefined}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear área</Button>
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
