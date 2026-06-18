<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import Icon from '../ui/Icon.svelte';
	import {
		areaResponsableFormSchema,
		type AreaResponsableItem
	} from '$lib/schemas/areaResponsable.schema';
	import type { AreaResponsableRef, InstitucionRef, PuestoRef } from '$lib/schemas/shared.schema';

	interface Props {
		open: boolean;
		selectedItem: AreaResponsableItem;
		puestoRef: PuestoRef[];
		institucionRef: InstitucionRef[];
		areaResponsableRef: AreaResponsableRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	const puestoOptions = $derived(
		props.puestoRef?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	let institucionOptions = $derived(
		props.institucionRef?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	const areaResponsableOptions = $derived(
		props.areaResponsableRef?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, submitting, tainted, isTainted, message, constraints } = superForm(
		{
			id: props.selectedItem.id,
			puestoId: props.selectedItem.puesto.id,
			code: props.selectedItem.code,
			name: props.selectedItem.name,
			description: props.selectedItem.description,
			institucionId: props.selectedItem.institucion.id,
			parentId: props.selectedItem.parent?.id ?? '',
			createdBy: props.selectedItem.createdBy
		},
		{
			dataType: 'json',
			validators: zod4(areaResponsableFormSchema),
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
					handleClose();
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

<Modal bind:open closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Editar area responsable</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={handleClose}
				onKeydown={(e) => onKeydownClose(e)}
				isDisabled={false}
			/>
		</header>

		<form method="POST" action="?/edit" use:enhance>
			<!-- Hidden input para el ID -->
			<input type="hidden" name="code" value={$form.code} />

			<div class="modal-body">
				{#if $message}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning"></Icon>
						{$message}
					</div>
				{/if}

				<div class="form-fields">
					<InputSelect
						label="Institucion"
						name="institucionId"
						optionsData={institucionOptions}
						required={true}
						bind:value={$form.institucionId}
						errors={$errors.institucionId}
						{...$constraints.institucionId}
					/>

					<InputSelect
						label="Puesto"
						name="puestoId"
						optionsData={puestoOptions}
						required={true}
						bind:value={$form.puestoId}
						errors={$errors.puestoId}
						{...$constraints.puestoId}
					></InputSelect>

					<InputText
						label="Nombre"
						name="name"
						required={true}
						placeholder="Excelencia educativa"
						status={$errors.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.name}
						errors={$errors.name}
					/>

					<TextArea
						label="Descripcion"
						name="description"
						placeholder="Descripcion..."
						bind:value={$form.description}
						rows={4}
					/>

					<InputSelect
						label="Reporta a"
						name="parentId"
						optionsData={areaResponsableOptions}
						required={true}
						bind:value={$form.parentId}
						errors={$errors.parentId}
						{...$constraints.parentId}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose} isDisabled={$submitting}>
					Cancelar
				</Button>
				<Button type="submit" variant="primary" isDisabled={$submitting}>Editar area</Button>
			</footer>
		</form>
	</div>
</Modal>
