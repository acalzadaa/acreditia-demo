<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { etapaFormSchema, type EvaluacionEtapaItem } from '$lib/schemas/evaluacionEtapa.schema';
	import Modal from '$lib/components/modal/Modal.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import DatePickerInput from '$lib/components/ui/input/DatePickerInput.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		open: boolean;
		item: EvaluacionEtapaItem;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, submitting, tainted, isTainted, message, constraints } = superForm(
		{
			id: props.item.id,
			fechaInicio: props.item.fechaInicio,
			fechaFinal: props.item.fechaFinal,
			periodoExtraordinario: props.item.periodoExtraordinario,
			periodoExtraordinarioInicio: props.item.periodoExtraordinarioInicio,
			periodoExtraordinarioFinal: props.item.periodoExtraordinarioFinal,
		},
		{
			dataType: 'json',
			validators: zod4Client(etapaFormSchema),
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
			<h2 class="modal-title text-h4">Editar etapa</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={handleClose}
				onKeydown={(e) => onKeydownClose(e)}
				isDisabled={false}
			/>
		</header>

		<form method="POST" action="?/editEtapa" use:enhance>
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
					<DatePickerInput
						label="Fechas de etapa"
						name="fechasEtapa"
						required={true}
						bind:startDate={$form.fechaInicio}
						bind:endDate={$form.fechaFinal}
						errors={$errors.fechaInicio}
						{...$constraints.fechaInicio}
					/>

					{#if props.item.periodoExtraordinario}
						<DatePickerInput
							label="Periodo extraordinario"
							name="periodoExtraordinario"
							required={true}
							bind:startDate={$form.periodoExtraordinarioInicio}
							bind:endDate={$form.periodoExtraordinarioFinal}
							errors={$errors.fechaInicio}
							{...$constraints.fechaInicio}
						/>
					{/if}
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose} isDisabled={$submitting}>
					Cancelar
				</Button>
				<Button type="submit" variant="primary" isDisabled={$submitting}>Editar fechas</Button>
			</footer>
		</form>
	</div>
</Modal>
