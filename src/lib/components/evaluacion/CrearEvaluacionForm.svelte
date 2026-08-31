<script lang="ts">
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import Icon from '../ui/Icon.svelte';
	import type { BaseRef } from '$lib/schemas/shared.schema';
	import InputNumber from '../ui/input/InputNumber.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import InputSelectCustom from '../ui/select/InputSelect.svelte';

	interface Props {
		open: boolean;
		modeloRef: BaseRef[];
		institucionRef: BaseRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, modeloRef = [], institucionRef = [] }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		modeloId: '',
		institucionId: '',
		code: '',
		name: '',
		year: 2026,
		cycle: 1
	});

	let errorMessage = $state('');

	// Opciones para los selects
	const modeloOptions = $derived(
		modeloRef.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		}))
	);

	const institucionOptions = $derived(
		institucionRef.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		}))
	);

	// Auto-seleccionar si solo hay una opción
	$effect(() => {
		if (modeloOptions.length === 1 && !formData.modeloId) {
			formData.modeloId = modeloOptions[0].id;
		}
	});

	function handleSubmit() {
		// Validación básica
		if (!formData.modeloId) {
			errorMessage = 'Debes seleccionar un modelo';
			return;
		}
		if (!formData.institucionId) {
			errorMessage = 'Debes seleccionar una institución';
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
		if (!formData.year) {
			errorMessage = 'El año es requerido';
			return;
		}
		if (!formData.cycle) {
			errorMessage = 'El ciclo es requerido';
			return;
		}

		// Aquí podrías console.log o guardar los datos si quieres
		console.log('Datos enviados (demo):', formData);

		// Limpiar formulario
		formData = {
			modeloId: '',
			institucionId: '',
			code: '',
			name: '',
			year: 2026,
			cycle: 1
		};

		// Limpiar mensaje de error
		errorMessage = '';

		// Cerrar modal
		handleClose();
	}

	function handleClose() {
		// Limpiar estado al cerrar
		formData = {
			modeloId: '',
			institucionId: '',
			code: '',
			name: '',
			year: 2026,
			cycle: 1
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
			<h2 class="modal-title text-h4">Crear evaluación</h2>
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
						label="Modelo"
						name="modeloId"
						optionsData={modeloOptions}
						required={true}
						bind:value={formData.modeloId}
						errors={errorMessage && !formData.modeloId ? [errorMessage] : undefined}
					/>

					<InputSelectCustom
						label="Institución"
						name="institucionId"
						optionsData={institucionOptions}
						required={true}
						bind:value={formData.institucionId}
						errors={errorMessage && !formData.institucionId ? [errorMessage] : undefined}
					/>

					<InputText
						label="Código"
						name="code"
						required={true}
						placeholder="EVAL-2026-001"
						status={errorMessage && !formData.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.code}
						errors={errorMessage && !formData.code ? [errorMessage] : undefined}
					/>

					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="Evaluación Primavera 2026"
						status={errorMessage && !formData.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.name}
						errors={errorMessage && !formData.name ? [errorMessage] : undefined}
					/>

					<InputNumber
						label="Año"
						name="year"
						min={2000}
						max={2099}
						required={true}
						placeholder="2026"
						status={errorMessage && !formData.year ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.year}
						errors={errorMessage && !formData.year ? [errorMessage] : undefined}
					/>

					<InputNumber
						label="Ciclo"
						name="cycle"
						min={1}
						max={99}
						required={true}
						placeholder="1"
						status={errorMessage && !formData.cycle ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.cycle}
						errors={errorMessage && !formData.cycle ? [errorMessage] : undefined}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear evaluación</Button>
			</footer>
		</form>
	</div>
</Modal>
