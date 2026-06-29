<script lang="ts">
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import Input from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import Icon from '../ui/Icon.svelte';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import type { CapituloRef } from '$lib/schemas/shared.schema';

	interface Props {
		open: boolean;
		refs: CapituloRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, refs = [] }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		capituloId: '',
		code: '',
		name: '',
		content: '',
		description: ''
	});

	let errorMessage = $state('');

	// Opciones para el select de capítulo
	const capituloOptions = $derived(
		refs.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		}))
	);

	// Auto-seleccionar si solo hay una opción
	$effect(() => {
		if (capituloOptions.length === 1 && !formData.capituloId) {
			formData.capituloId = capituloOptions[0].id;
		}
	});

	function handleSubmit() {
		// Validación básica
		if (!formData.capituloId) {
			errorMessage = 'Debes seleccionar un capítulo';
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
			capituloId: '',
			code: '',
			name: '',
			content: '',
			description: ''
		};
		
		// Limpiar mensaje de error
		errorMessage = '';
		
		// Cerrar modal
		handleClose();
	}

	function handleClose() {
		// Limpiar estado al cerrar
		formData = {
			capituloId: '',
			code: '',
			name: '',
			content: '',
			description: ''
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
			<h2 class="modal-title text-h4">Crear sección</h2>
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
						label="Capítulo"
						name="capituloId"
						optionsData={capituloOptions}
						required={true}
						bind:value={formData.capituloId}
						errors={errorMessage && !formData.capituloId ? [errorMessage] : undefined}
					/>

					<Input
						label="Código"
						name="code"
						required={true}
						placeholder="1.2"
						status={errorMessage && !formData.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.code}
						errors={errorMessage && !formData.code ? [errorMessage] : undefined}
					/>

					<Input
						label="Nombre"
						name="name"
						required={true}
						placeholder="Criterios de evaluación"
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
						rows={4}
					/>

					<TextArea
						label="Descripción"
						name="description"
						placeholder="Descripción..."
						status='normal'
						disabled={false}
						bind:value={formData.description}
						rows={4}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear sección</Button>
			</footer>
		</form>
	</div>
</Modal>