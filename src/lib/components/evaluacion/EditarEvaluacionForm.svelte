<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';

	import { zod4Client } from 'sveltekit-superforms/adapters';
	import Input from '../ui/input/InputText.svelte';
	import Icon from '../ui/Icon.svelte';
	import { type BaseRef } from '$lib/schemas/shared.schema';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import { evaluacionFormSchema, type EvaluacionItem } from '$lib/schemas/evaluacion.schema';
	import InputNumber from '../ui/input/InputNumber.svelte';

	interface Props {
		open: boolean;
		item: EvaluacionItem;
		modeloRef: BaseRef[];
		institucionRef: BaseRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	const modeloOptions = $derived(
		props.modeloRef?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	const institucionOptions = $derived(
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
		{
			id: props.item.id,
			code: props.item.code,
			modeloId: props.item.modelo.id,
			institucionId: props.item.institucion.id,
			name: props.item.name,
			year: props.item.year,
			cycle: props.item.cycle
		},
		{
			dataType: 'json',
			validators: zod4Client(evaluacionFormSchema),
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
		if (institucionOptions.length === 1 && !$form.institucionId) {
			$form.institucionId = institucionOptions[0]!.id;
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

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Editar evaluacion</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={handleClose}
				onKeydown={(e) => onKeydownClose(e)}
				isDisabled={false}
			/>
		</header>

		<form  method="POST" action="?/edit" use:enhance>
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

					<InputSelect
						label="Institución"
						name="institucionId"
						optionsData={institucionOptions}
						required={true}
						bind:value={$form.institucionId}
						errors={$errors.institucionId}
						{...$constraints.institucionId}
					/>

					<Input
						label="Código"
						name="code"
						required={true}
						placeholder="PE-001"
						status={$errors.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.code}
						errors={$errors.code}
						{...$constraints.code}
					/>

					<Input
						label="Nombre"
						name="name"
						required={true}
						placeholder="Verano 2026"
						status={$errors.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.name}
						errors={$errors.name}
						{...$constraints.name}
					/>

					<InputNumber
						label="Año"
						name="year"
						min={2000}
						max={2099}
						required={true}
						placeholder="1"
						status={$errors.year ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.year}
						errors={$errors.year}
					/>

					<InputNumber
						label="Ciclo"
						name="cycle"
						min={1}
						max={99}
						required={true}
						placeholder="1"
						status={$errors.cycle ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.cycle}
						errors={$errors.cycle}
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
