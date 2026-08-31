<script lang="ts">
	
	import type { ObjetivoEstrategicoRef } from '$lib/schemas/objetivoEstrategico.schema';
	import { frequencyUnitOptions } from '$lib/schemas/indicadorEstrategico.schema';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputSelectCustom from '$lib/components/ui/select/InputSelectCustom.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';
	import InputNumber from '$lib/components/ui/input/InputNumber.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		open: boolean;
		refs: ObjetivoEstrategicoRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, refs = [] }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		objetivoId: '',
		code: '',
		name: '',
		description: '',
		dataOrigin: '',
		dataFormula: '',
		target: 0,
		targetUnit: '',
		frequencyValue: 0,
		frequencyUnit: ''
	});

	let errorMessage = $state('');

	// Opciones para el select de objetivo estratégico
	const objetivoOptions = $derived(
		refs.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		}))
	);

	function handleSubmit() {
		// Validación básica
		if (!formData.objetivoId) {
			errorMessage = 'Debes seleccionar un objetivo estratégico';
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
		if (!formData.dataOrigin) {
			errorMessage = 'El origen de datos es requerido';
			return;
		}
		if (!formData.dataFormula) {
			errorMessage = 'La fórmula de datos es requerida';
			return;
		}
		if (!formData.target || formData.target <= 0) {
			errorMessage = 'La meta es requerida y debe ser mayor a 0';
			return;
		}
		if (!formData.targetUnit) {
			errorMessage = 'La unidad de meta es requerida';
			return;
		}
		if (!formData.frequencyValue || formData.frequencyValue <= 0) {
			errorMessage = 'La frecuencia es requerida y debe ser mayor a 0';
			return;
		}
		if (!formData.frequencyUnit) {
			errorMessage = 'La unidad de frecuencia es requerida';
			return;
		}

		// Demo: solo mostrar en consola
		console.log('Demo - Crear indicador estratégico:', formData);

		// Limpiar formulario
		clearForm();

		// Cerrar modal
		handleClose();
	}

	function clearForm() {
		formData = {
			objetivoId: '',
			code: '',
			name: '',
			description: '',
			dataOrigin: '',
			dataFormula: '',
			target: 0,
			targetUnit: '',
			frequencyValue: 0,
			frequencyUnit: ''
		};
		errorMessage = '';
	}

	function handleClose() {
		// Limpiar estado al cerrar
		clearForm();
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

<Modal {open} onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Nuevo Indicador Estratégico</h2>
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
					<InputSelectCustom
						label="Objetivo Estratégico"
						name="objetivoId"
						optionsData={objetivoOptions}
						required={true}
						bind:value={formData.objetivoId}
						errors={errorMessage && !formData.objetivoId ? [errorMessage] : undefined}
					/>

					<InputText
						label="Código"
						name="code"
						required={true}
						placeholder="IE-001"
						status={errorMessage && !formData.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.code}
						errors={errorMessage && !formData.code ? [errorMessage] : undefined}
					/>

					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="Nombre del indicador"
						status={errorMessage && !formData.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.name}
						errors={errorMessage && !formData.name ? [errorMessage] : undefined}
					/>

					<TextArea
						label="Descripción"
						name="description"
						placeholder="Descripción del indicador..."
						bind:value={formData.description}
						rows={4}
					/>

					<TextArea
						label="Origen de Datos"
						name="dataOrigin"
						placeholder="Ej. Reporte SEP..."
						bind:value={formData.dataOrigin}
						required={true}
						rows={4}
						status={errorMessage && !formData.dataOrigin ? 'error' : 'normal'}
						errors={errorMessage && !formData.dataOrigin ? [errorMessage] : undefined}
					/>

					<TextArea
						label="Fórmula de Datos"
						name="dataFormula"
						placeholder="Ej. (Alumnos con beca/Total de Alumnos)*100"
						bind:value={formData.dataFormula}
						required={true}
						rows={4}
						status={errorMessage && !formData.dataFormula ? 'error' : 'normal'}
						errors={errorMessage && !formData.dataFormula ? [errorMessage] : undefined}
					/>

					<InputNumber
						label="Meta"
						name="target"
						required={true}
						placeholder="85"
						status={errorMessage && (!formData.target || formData.target <= 0) ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.target}
						errors={errorMessage && (!formData.target || formData.target <= 0)
							? [errorMessage]
							: undefined}
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

					<InputNumber
						label="Frecuencia"
						name="frequencyValue"
						required={true}
						placeholder="1"
						status={errorMessage && (!formData.frequencyValue || formData.frequencyValue <= 0)
							? 'error'
							: 'normal'}
						disabled={false}
						bind:value={formData.frequencyValue}
						errors={errorMessage && (!formData.frequencyValue || formData.frequencyValue <= 0)
							? [errorMessage]
							: undefined}
					/>

					<InputSelectCustom
						label="Unidad de Frecuencia"
						name="frequencyUnit"
						optionsData={frequencyUnitOptions}
						required={true}
						bind:value={formData.frequencyUnit}
						errors={errorMessage && !formData.frequencyUnit ? [errorMessage] : undefined}
					/>
				</div>
			</div>

			<menu class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear indicador</Button>
			</menu>
		</form>
	</div>
</Modal>
