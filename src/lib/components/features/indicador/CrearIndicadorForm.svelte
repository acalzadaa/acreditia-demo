<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import InputSelect from '$lib/components/ui/select/InputSelect.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import { indicadorTypeOptions } from './utils/indicadorUtils';
	
	interface Props {
		open: boolean;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		code: '',
		name: '',
		description: '',
		target: 0,
		targetUnit: '',
		indicadorType: '',
		seccionCode: ''
	});

	let errorMessage = $state('');

	// Estados para los selects anidados
	// Estados para los selects
	let selectedModeloCode = $state<string>('');
	let selectedCapituloCode = $state<string>('');
	let selectedSeccionCode = $state<string>('');

	// Opciones de modelo (todos los modelos)



	// Resetear selecciones cuando cambia el modelo

	// Resetear selección de sección cuando cambia el capítulo

	// Actualizar el valor del formulario cuando se selecciona una sección

	function handleSubmit() {
		// Validación básica
		if (!formData.code) {
			errorMessage = 'El código es requerido';
			return;
		}
		if (!selectedModeloCode) {
			errorMessage = 'Debes seleccionar un modelo';
			return;
		}
		if (!selectedCapituloCode) {
			errorMessage = 'Debes seleccionar un capítulo';
			return;
		}
		if (!selectedSeccionCode) {
			errorMessage = 'Debes seleccionar una sección';
			return;
		}
		if (!formData.name) {
			errorMessage = 'El nombre es requerido';
			return;
		}
		if (!formData.target && formData.target !== 0) {
			errorMessage = 'La meta es requerida';
			return;
		}
		if (!formData.targetUnit) {
			errorMessage = 'Las unidades de meta son requeridas';
			return;
		}
		if (!formData.indicadorType) {
			errorMessage = 'El tipo es requerido';
			return;
		}

		// Aquí podrías console.log o guardar los datos si quieres
		console.log('Datos enviados (demo):', {
			...formData,
			modeloId: selectedModeloCode,
			capituloId: selectedCapituloCode,
			seccionId: selectedSeccionCode
		});

		// Limpiar formulario
		formData = {
			code: '',
			name: '',
			description: '',
			target: 0,
			targetUnit: '',
			indicadorType: '',
			seccionCode: ''
		};
		selectedModeloCode = '';
		selectedCapituloCode = '';
		selectedSeccionCode = '';

		// Limpiar mensaje de error
		errorMessage = '';

		// Cerrar modal
		handleClose();
	}

	function handleClose() {
		// Limpiar estado al cerrar
		formData = {
			code: '',
			name: '',
			description: '',
			target: 0,
			targetUnit: '',
			indicadorType: '',
			seccionCode: ''
		};
		selectedModeloCode = '';
		selectedCapituloCode = '';
		selectedSeccionCode = '';
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
			<h2 class="modal-title text-h4">Crear indicador</h2>
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
						<Icon name="warning" />
						{errorMessage}
					</div>
				{/if}

				<div class="form-fields">
					<InputSelect
						label="Tipo"
						name="indicadorType"
						optionsData={indicadorTypeOptions}
						required={true}
						bind:value={formData.indicadorType}
						errors={errorMessage && !formData.indicadorType ? [errorMessage] : undefined}
					/>
					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="Tasa de graduación"
						status={errorMessage && !formData.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.name}
						errors={errorMessage && !formData.name ? [errorMessage] : undefined}
					/>
					<InputText
						label="Código"
						name="code"
						required={true}
						placeholder="IND-001"
						status={errorMessage && !formData.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.code}
						errors={errorMessage && !formData.code ? [errorMessage] : undefined}
					/>

					<TextArea
						label="Descripción"
						name="description"
						placeholder="Descripción..."
						bind:value={formData.description}
						rows={4}
					/>
				</div>
			</div>

			<menu class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear</Button>
			</menu>
		</form>
	</div>
</Modal>
