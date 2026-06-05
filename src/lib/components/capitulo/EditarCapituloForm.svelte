<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';

	import { zod4Client } from 'sveltekit-superforms/adapters';
	import Input from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import Icon from '../ui/Icon.svelte';
	import { type ModeloRef } from '$lib/schemas/shared.schema';
	import { capituloFormSchema, type CapituloWithModeloItem } from '$lib/schemas/capitulo.schema';
	import InputSelect from '../ui/input/InputSelect.svelte';

	interface Props {
		open: boolean;
		item: CapituloWithModeloItem;
		refs: ModeloRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	const modeloOptions = $derived(
		props.refs?.map((ref) => ({
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
			id: props.item.id,
			modeloId: props.item.modeloId,
			code: props.item.code,
			name: props.item.name,
			description: props.item.description,
			content: props.item.content,
			order: props.item.order
		},
		{
			dataType: 'json',
			validators: zod4Client(capituloFormSchema),
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

	$effect(() => {
		if (modeloOptions.length === 1 && !$form.modeloId) {
			$form.modeloId = modeloOptions[0]!.id;
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
			<h2 class="modal-title text-h4">Editar capitulo de modelo</h2>
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
						label="modelo"
						name="modeloId"
						optionsData={modeloOptions}
						required={true}
						bind:value={$form.modeloId}
						errors={$errors.modeloId}
						{...$constraints.modeloId}
					/>
					<Input
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

					<TextArea
						label="Contenido"
						name="content"
						required={true}
						placeholder="La institucion debera..."
						maxLength={400}
						status={$errors.content ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.content}
						errors={$errors.content}
						{...$constraints.content}
						rows={4}
					/>
					<TextArea
						label="Descripcion"
						name="description"
						placeholder="Descripcion..."
						status={$errors.description ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.description}
						errors={$errors.description}
						{...$constraints.description}
						rows={4}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose} isDisabled={$submitting}>
					Cancelar
				</Button>
				<Button type="submit" variant="primary" isDisabled={$submitting}>Editar capitulo</Button>
			</footer>
		</form>
	</div>
</Modal>
