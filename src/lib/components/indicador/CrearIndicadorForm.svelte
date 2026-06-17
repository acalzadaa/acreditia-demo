<script lang="ts">
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import InputNumber from '../ui/input/InputNumber.svelte';
	import Icon from '../ui/Icon.svelte';
	import { indicadorTypeOptions } from '$lib/schemas/indicador.schema';
	import InputSelect from '../ui/input/InputSelect.svelte';

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
		indicadorType: ''
	});

	let errorMessage = $state('');

	function handleSubmit() {
		// Validación básica
		if (!formData.code) {
			errorMessage = 'El código es requerido';
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
		console.log('Datos enviados (demo):', formData);
		
		// Limpiar formulario
		formData = {
			code: '',
			name: '',
			description: '',
			target: 0,
			targetUnit: '',
			indicadorType: ''
		};
		
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
			indicadorType: ''
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
			<h2 class="modal-title text-h4">Crear indicador</h2>
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
				{#if errorMessage}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning" />
						{errorMessage}
					</div>
				{/if}
				
				<div class="form-fields">
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

					<TextArea
						label="Descripción"
						name="description"
						placeholder="Descripción..."
						bind:value={formData.description}
						rows={4}
					/>

					<InputNumber
						label="Meta"
						name="target"
						required={true}
						placeholder="20"
						status={errorMessage && !formData.target ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.target}
						errors={errorMessage && !formData.target ? [errorMessage] : undefined}
					/>

					<InputText
						label="Unidades de Meta"
						name="targetUnit"
						required={true}
						placeholder="%"
						status={errorMessage && !formData.targetUnit ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.targetUnit}
						errors={errorMessage && !formData.targetUnit ? [errorMessage] : undefined}
					/>

					<InputSelect
						label="Tipo"
						name="indicadorType"
						optionsData={indicadorTypeOptions}
						required={true}
						bind:value={formData.indicadorType}
						errors={errorMessage && !formData.indicadorType ? [errorMessage] : undefined}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear indicador</Button>
			</footer>
		</form>
	</div>
</Modal>