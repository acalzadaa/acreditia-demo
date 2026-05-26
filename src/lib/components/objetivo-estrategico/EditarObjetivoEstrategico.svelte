<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import {
		objetivoEstrategicoWithPlaneacionItemSchema,
		type ObjetivoEstrategicoWithPlaneacionItem
	} from '$lib/schemas/objetivoEstrategico.schema';
	import InputSelect, { type OptionData } from '../ui/input/InputSelect.svelte';
	import { estatusOptions } from '$lib/types/common.types';
	import InputText from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import Icon from '../ui/Icon.svelte';
	import type { PlaneacionEstrategicaRefSchema } from '$lib/schemas/planeacionEstrategica.schema';

	interface Props {
		open: boolean;
		selectedItem: ObjetivoEstrategicoWithPlaneacionItem;
		refs: PlaneacionEstrategicaRefSchema[];
		onClose: () => void;
	}

	let { open = $bindable(false), refs, onClose, ...props }: Props = $props();

	const planeacionesOptions: OptionData[] = $derived(
		refs?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, submitting, tainted, isTainted, message } = superForm(
		props.selectedItem,
		{
			dataType: 'json',
			validators: zod4(objetivoEstrategicoWithPlaneacionItemSchema),
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
			<h2 class="modal-title text-h4">Editar objetivo estrategico</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="md"
				borderShape="square"
				onClick={handleClose}
				onKeydown={(e) => onKeydownClose(e)}
				isDisabled={false}
			/>
		</header>

		<form method="POST" action="?/edit" use:enhance>
			<!-- Hidden input para el ID -->
			<input type="hidden" name="id" value={$form.id} />

			<div class="modal-body">
				{#if $message}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning"></Icon>
						{$message}
					</div>
				{/if}
				<div class="form-fields">
					<InputSelect
						label="Planeacion Estrategica"
						name="planeacionId"
						optionsData={planeacionesOptions}
						required={true}
						bind:value={$form.planeacionId}
						errors={$errors.planeacionId}
					></InputSelect>

					<InputText
						label="Código"
						name="code"
						required={true}
						placeholder="OE-001"
						status={$errors.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.code}
						errors={$errors.code}
					/>

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
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose} isDisabled={$submitting}>
					Cancelar
				</Button>
				<Button type="submit" variant="primary" isDisabled={$submitting}>Editar objetivo</Button>
			</footer>
		</form>
	</div>
</Modal>
