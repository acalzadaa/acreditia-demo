<script lang="ts">
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import InputSelectCustom from '$lib/components/ui/select/InputSelect.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';

	import type { AreaResponsableRef, BaseRef } from '$lib/schemas/shared.schema';
	import { areaResponsableTypeOptions } from '$lib/schemas/areaResponsable.schema';

	interface Props {
		open: boolean;
		areaResponsableRef: AreaResponsableRef[];
		institucionRef?: BaseRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	// Estado local del formulario
	let formData = $state({
		puestoId: '',
		institucionId: '',
		code: '',
		name: '',
		type: '',
		description: '',
		parentId: ''
	});

	let errorMessage = $state('');

	const areaResponsableOptions = $derived(
		props.areaResponsableRef?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	// Auto-seleccionar si solo hay una opción
	$effect(() => {
		if (areaResponsableOptions.length === 1 && !formData.parentId) {
			formData.parentId = areaResponsableOptions[0]!.id;
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
			institucionId: '',
			code: '',
			name: '',
			type: '',
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
			institucionId: '',
			code: '',
			name: '',
			type: '',
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

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Crear área responsable</h2>
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

					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="Dirección de Planeación"
						status={errorMessage && !formData.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.name}
						errors={errorMessage && !formData.name ? [errorMessage] : undefined}
					/>

					<InputText
						label="Código"
						name="code"
						required={true}
						placeholder="AR-001"
						status={errorMessage && !formData.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={formData.code}
						errors={errorMessage && !formData.code ? [errorMessage] : undefined}
					/>

					<InputSelectCustom
						label="Tipo de área"
						name="type"
						optionsData={areaResponsableTypeOptions}
						required={true}
						bind:value={formData.type}
						nullOption="Ninguno (utilizar el default)"
						errors={errorMessage && !formData.type ? [errorMessage] : undefined}
					/>

					<InputSelectCustom
						label="Reporta a"
						name="parentId"
						optionsData={areaResponsableOptions}
						required={true}
						bind:value={formData.parentId}
						nullOption="Ninguno (es un elemento raiz)"
						errors={errorMessage && !formData.parentId ? [errorMessage] : undefined}
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
				<Button type="submit" variant="primary">Crear área</Button>
			</menu>
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
