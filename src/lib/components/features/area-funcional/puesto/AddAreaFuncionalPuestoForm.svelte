<script lang="ts">
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputSelectCustom from '$lib/components/ui/select/InputSelectCustom.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PuestoRef } from '$lib/schemas/shared.schema';
	import InputRadio from '$lib/components/ui/input/InputRadio.svelte';

	interface Props {
		open: boolean;
		ref: PuestoRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ref = [] }: Props = $props();

	const DEFAULT_TYPE = 'directivo';
	// Estado local del formulario
	let formData = $state({
		id: '',
		type: 'directivo'
	});

	let errorMessage = $state('');

	// Opciones para el select de puesto
	const puestoOptions = $derived(
		ref
			.filter((r) => r.type === formData.type)
			.map((ref) => ({
				id: ref.id,
				option: `${ref.code} - ${ref.name}`
			}))
	);

	function handleSubmit() {
		// Validación básica
		if (!formData.id) {
			errorMessage = 'Debes seleccionar un puesto';
			return;
		}

		// Aquí podrías console.log o guardar los datos si quieres
		console.log('Datos enviados (demo):', formData);

		// Limpiar formulario
		formData = {
			id: '',
			type: DEFAULT_TYPE
		};

		// Limpiar mensaje de error
		errorMessage = '';

		// Cerrar modal
		handleClose();
	}

	function handleTypeChange() {
		formData.id = '';
	}

	function handleClose() {
		// Limpiar estado al cerrar
		formData = {
			id: '',
			type: DEFAULT_TYPE
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
			<h2 class="modal-title text-h4">Agregar puesto</h2>
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

					<fieldset class="form-check-group">
						<legend class="form-label text-caption">Tipo de puesto</legend>
						<InputRadio
							name="type"
							label="Directivo"
							value="directivo"
							status="warning"
							bind:group={formData.type}
							onChange={handleTypeChange}
						/>
						<InputRadio
							name="type"
							label="Operativo"
							value="operativo"
							status="warning"
							bind:group={formData.type}
							onChange={handleTypeChange}
						/>
					</fieldset>

					<InputSelectCustom
						label="Puesto"
						name="id"
						optionsData={puestoOptions}
						required={true}
						bind:value={formData.id}
						errors={errorMessage && !formData.id ? [errorMessage] : undefined}
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
