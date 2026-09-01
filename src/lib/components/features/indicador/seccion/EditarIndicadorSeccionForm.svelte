<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import InputSelect from '$lib/components/ui/select/InputSelect.svelte';
	import type { ModeloFullRef } from '$lib/schemas/modelo.schema';

	interface Props {
		open: boolean;
		modeloFullRef: ModeloFullRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, modeloFullRef = [] }: Props = $props();

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
	let modeloOptions = $derived(
		modeloFullRef.map((item) => ({
			id: item.code,
			option: `${item.code} - ${item.name}`
		}))
	);

	let capituloOptions = $derived(
		!selectedModeloCode
			? []
			: (modeloFullRef
					.find((m) => m.code === selectedModeloCode)
					?.capitulos?.map((c) => ({
						id: c.code,
						option: `${c.code} - ${c.name || `Capítulo ${c.code}`}`
					})) ?? [])
	);

	let seccionOptions = $derived(
		!selectedModeloCode || !selectedCapituloCode
			? []
			: (modeloFullRef
					.find((m) => m.code === selectedModeloCode)
					?.capitulos?.find((c) => c.code === selectedCapituloCode)
					?.secciones?.map((s) => ({
						id: s?.code,
						option: `${s?.code} - ${s?.name || `Sección ${s?.code}`}`
					})) ?? [])
	);

	// Resetear selecciones cuando cambia el modelo
	function onModeloChange(value: string) {
		selectedModeloCode = value;
		selectedCapituloCode = '';
		selectedSeccionCode = '';
		formData.seccionCode = '';
	}

	// Resetear selección de sección cuando cambia el capítulo
	function onCapituloChange(value: string) {
		selectedCapituloCode = value;
		selectedSeccionCode = '';
		formData.seccionCode = '';
	}

	// Actualizar el valor del formulario cuando se selecciona una sección
	function onSeccionChange(value: string) {
		selectedSeccionCode = value;
		formData.seccionCode = value;
	}

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
			<h2 class="modal-title text-h4">Agregar la sección</h2>
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
						label="Modelo"
						name="modelo"
						optionsData={modeloOptions}
						required={true}
						bind:value={selectedModeloCode}
						onChange={onModeloChange}
					/>

					<InputSelect
						label="Capítulo"
						name="capitulo"
						optionsData={capituloOptions}
						required={true}
						bind:value={selectedCapituloCode}
						onChange={onCapituloChange}
						disabled={!selectedModeloCode}
					/>

					<InputSelect
						label="Sección"
						name="seccion"
						optionsData={seccionOptions}
						required={true}
						bind:value={selectedSeccionCode}
						onChange={onSeccionChange}
						disabled={!selectedCapituloCode}
						errors={errorMessage && !formData.seccionCode ? [errorMessage] : undefined}
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
