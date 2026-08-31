<script lang="ts">
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import InputSelectCustom from '$lib/components/ui/select/InputSelect.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';
	import type { BaseRef } from '$lib/schemas/shared.schema';

	interface Props {
		open: boolean;
		refs: BaseRef[];
		onClose: () => void;
	}

	let { open = false, onClose, refs = [] }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		modeloId: '',
		code: '',
		name: '',
		description: '',
		content: ''
	});

	let errorMessage = $state('');

	// Opciones para el select de modelo
	const modeloOptions = $derived(
		refs.map((ref) => ({
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
		if (!formData.code) {
			errorMessage = 'El código es requerido';
			return;
		}
		if (!formData.name) {
			errorMessage = 'El nombre es requerido';
			return;
		}
		if (!formData.content) {
			errorMessage = 'El contenido es requerido';
			return;
		}

		// Aquí podrías console.log o guardar los datos si quieres
		console.log('Datos enviados (demo):', formData);

		// Limpiar formulario
		formData = {
			modeloId: '',
			code: '',
			name: '',
			description: '',
			content: ''
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
			code: '',
			name: '',
			description: '',
			content: ''
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
			<h2 class="modal-title text-h4">Crear capítulo</h2>
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

					<InputText
						label="Código"
						name="code"
						required={true}
						placeholder="CAP-001"
						status={errorMessage && !formData.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.code}
						errors={errorMessage && !formData.code ? [errorMessage] : undefined}
					/>

					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="Fundamentos de calidad"
						status={errorMessage && !formData.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.name}
						errors={errorMessage && !formData.name ? [errorMessage] : undefined}
					/>

					<TextArea
						label="Contenido"
						name="content"
						required={true}
						placeholder="La institución deberá..."
						status={errorMessage && !formData.content ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.content}
						errors={errorMessage && !formData.content ? [errorMessage] : undefined}
						rows={6}
					/>

					<TextArea
						label="Descripción"
						name="description"
						placeholder="Descripción..."
						status="normal"
						disabled={false}
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
