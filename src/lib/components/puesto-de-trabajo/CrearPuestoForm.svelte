<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import { jobTypeOptions } from '$lib/types/common.types';
	import { puestoFormSchema, type PuestoForm } from '$lib/schemas/puesto.schema';
	import TextArea from '../ui/input/TextArea.svelte';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		open: boolean;
		form: SuperValidated<PuestoForm>;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, message, enhance, constraints } = superForm(props.form, {
		resetForm: true,
		validators: zod4(puestoFormSchema),
		validationMethod: 'auto',
		customValidity: false,
		onUpdated: async ({ form }) => {
			if (form.valid) {
				handleClose();
			}
		}
	});

	function handleClose() {
		onClose();
	}

	function onKeydownClose(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleClose();
		}
	}
</script>

<Modal bind:open closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Crear puesto de trabajo</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				shape="round"
				onClick={handleClose}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form method="POST" action="?/create" use:enhance>
			<div class="modal-body">
				{#if $message}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning"></Icon>
						{$message}
					</div>
				{/if}

				<div class="form-fields">
					<InputText
						label="Código"
						name="code"
						required={true}
						placeholder="PT-001"
						status={$errors.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.code}
						errors={$errors.code}
						{...$constraints.code}
					/>

					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="p.e Director Academico"
						status={$errors.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.name}
						errors={$errors.name}
						{...$constraints.code}
					/>

					<InputSelect
						label="Tipo"
						name="type"
						optionsData={jobTypeOptions}
						required={true}
						bind:value={$form.type}
						errors={$errors.type}
						{...$constraints.code}
					></InputSelect>

					<TextArea
						label="Descripcion"
						name="description"
						placeholder="Descripcion..."
						status={$errors.description ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.description}
						errors={$errors.description}
						{...$constraints.code}
						rows={4}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear puesto</Button>
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
