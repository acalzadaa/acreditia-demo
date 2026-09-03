<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import {
		indicadorFormSchema,
		type IndicadorItem
	} from '$lib/schemas/indicador.schema';
	import type { ModeloFullRef } from '$lib/schemas/modelo.schema';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputSelectCustom from '$lib/components/ui/select/InputSelect.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { indicadorTypeOptions } from './utils/indicadorUtils';

	interface Props {
		open: boolean;
		selectedItem: IndicadorItem;
		modeloFullRef: ModeloFullRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, tainted, isTainted, message, constraints } = superForm(
		{
			id: props.selectedItem.id,
			code: props.selectedItem.code,
			name: props.selectedItem.name,
			description: props.selectedItem.description,
			indicadorType: props.selectedItem.indicadorType
		},
		{
			dataType: 'json',
			validators: zod4(indicadorFormSchema),
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
			<h2 class="modal-title text-h4">Editar indicador</h2>
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
			<input type="hidden" name="code" value={$form.code} />

			<div class="modal-body">
				{#if $message}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning"></Icon>
						{$message}
					</div>
				{/if}
				<div class="form-fields">
					<InputSelectCustom
						label="Tipo"
						name="type"
						optionsData={indicadorTypeOptions}
						required={true}
						bind:value={$form.indicadorType}
						errors={$errors.indicadorType}
						{...$constraints.indicadorType}
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
						label="Descripción"
						name="description"
						placeholder="Descripción..."
						bind:value={$form.description}
						rows={4}
					/>
				</div>
			</div>

			<menu class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary">Editar</Button>
			</menu>
		</form>
	</div>
</Modal>
