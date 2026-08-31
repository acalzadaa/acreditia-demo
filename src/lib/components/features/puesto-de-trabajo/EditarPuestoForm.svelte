<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	import { zod4 } from 'sveltekit-superforms/adapters';
	import { puestoItemSchema, type PuestoItem } from '$lib/schemas/puesto.schema';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import InputSelectCustom from '$lib/components/ui/select/InputSelectCustom.svelte';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { jobScopeOptions, jobTypeOptions } from './utils/puesto';

	interface Props {
		open: boolean;
		selectedItem: PuestoItem;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, submitting, tainted, isTainted, message } = superForm(
		props.selectedItem,
		{
			dataType: 'json',
			validators: zod4(puestoItemSchema),
			validationMethod: 'onblur',
			customValidity: false,
			resetForm: false,
			taintedMessage: 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?',
			onSubmit: ({ cancel }) => {
				if (!isTainted($tainted)) {
					cancel();
					handleClose();
					console.log('No hay cambios para guardar');
				}
			},
			onUpdated: async ({ form }) => {
				if (form.valid) {
					onClose();
				}
			}
		}
	);

	function handleClose() {
		onClose();
	}

	function onKeydownClose(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleClose();
		}
	}
</script>

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Editar puesto de trabajo</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={handleClose}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form method="POST" action="?/edit" use:enhance>
			<!-- Hidden input para el ID -->
			<input type="hidden" name="id" value={$form.id} />
			<input type="hidden" name="code" value={$form.code} />

			<div class="modal-body">
				{#if $message}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning"></Icon>
						{$message}
					</div>
				{/if}

				<div class="form-fields">
					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="p.e Grupo Educativo del Sureste A.C"
						status={$errors.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.name}
						errors={$errors.name}
					/>

					<InputSelect
						label="Ámbito del puesto"
						name="scope"
						optionsData={jobScopeOptions}
						required={true}
						bind:value={$form.scope}
						errors={$errors.scope}
					/>

					<InputSelectCustom
						label="Tipo de puesto"
						name="type"
						optionsData={jobTypeOptions}
						required={true}
						bind:value={$form.type}
						errors={$errors.type}
					/>

					<TextArea
						label="Descripción"
						name="description"
						required={false}
						status={$errors.description ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.description}
						errors={$errors.description}
					/>
				</div>
			</div>

			<menu class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose} isDisabled={$submitting}
					>Cancelar</Button
				>
				<Button type="submit" variant="primary" isDisabled={$submitting}>Editar puesto</Button>
			</menu>
		</form>
	</div>
</Modal>
