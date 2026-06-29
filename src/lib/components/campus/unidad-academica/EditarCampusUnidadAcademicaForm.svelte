<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	import { zod4 } from 'sveltekit-superforms/adapters';
	import { campusItemSchema } from '$lib/schemas/campus.schema';
	import Modal from '$lib/components/modal/Modal.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { UnidadAcademicaRef } from '$lib/schemas/shared.schema';
	import InputSelect from '$lib/components/ui/input/InputSelect.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { UnidadAcademicaItem } from '$lib/schemas/unidadAcademica.schema';

	interface Props {
		open: boolean;
		selectedItem: UnidadAcademicaItem;
		unidadAcademicaRef: UnidadAcademicaRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	let unidadAcademicaOptions = $derived(
		props.unidadAcademicaRef?.map((ref) => ({
			id: ref.code,
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
			<h2 class="modal-title text-h4">Editar unidad academica</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={handleClose}
				onKeydown={(e) => onKeydownClose(e)}
				isDisabled={false}
			/>
		</header>

		<form method="POST" action="?/editCampusUnidadAcademica" use:enhance>
			<div class="modal-body">
				{#if $message}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning"></Icon>
						{$message}
					</div>
				{/if}

				<div class="form-fields">
					<InputSelect
						label="Unidad Academica"
						name="code"
						optionsData={unidadAcademicaOptions}
						required={true}
						bind:value={$form.code}
						errors={$errors.code}
						{...$constraints.code}
					></InputSelect>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose} isDisabled={$submitting}>
					Cancelar
				</Button>
				<Button type="submit" variant="primary" isDisabled={$submitting}>Editar unidad</Button>
			</footer>
		</form>
	</div>
</Modal>
