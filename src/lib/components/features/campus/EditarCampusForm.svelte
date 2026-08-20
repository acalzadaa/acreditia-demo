<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { campusItemSchema, type CampusItem } from '$lib/schemas/campus.schema';
	import type { BaseRef } from '$lib/schemas/shared.schema';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputSelect from '$lib/components/ui/input/InputSelect.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		open: boolean;
		selectedItem: CampusItem;
		institucionRef: BaseRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	let institucionOptions = $derived(
		props.institucionRef?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, submitting, tainted, isTainted, message, constraints } = superForm(
		props.selectedItem,
		{
			dataType: 'json',
			validators: zod4(campusItemSchema),
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

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Editar campus</h2>
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
						{...$constraints.name}
					/>
				</div>
			</div>

			<menu class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose} isDisabled={$submitting}>
					Cancelar
				</Button>
				<Button type="submit" variant="primary" isDisabled={$submitting}>Editar</Button>
			</menu>
		</form>
	</div>
</Modal>
