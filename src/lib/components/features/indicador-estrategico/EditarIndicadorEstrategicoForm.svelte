<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { type ObjetivoEstrategicoRef } from '$lib/schemas/objetivoEstrategico.schema';
	import {
		frequencyUnitOptions,
		indicadorEstrategicoFormSchema,
		type IndicadorEstrategicoItem
	} from '$lib/schemas/indicadorEstrategico.schema';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputSelectCustom from '$lib/components/ui/select/InputSelectCustom.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import TextArea from '$lib/components/ui/input/TextArea.svelte';
	import InputNumber from '$lib/components/ui/input/InputNumber.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		open: boolean;
		selectedItem: IndicadorEstrategicoItem;
		refs: ObjetivoEstrategicoRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	const objetivoOptions = $derived(
		props.refs?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, tainted, isTainted, message } = superForm(
		{
			id: props.selectedItem.id,
			objetivoId: props.selectedItem.objetivo?.id,
			code: props.selectedItem.code,
			name: props.selectedItem.name,
			description: props.selectedItem.description,
			target: props.selectedItem.target,
			targetUnit: props.selectedItem.targetUnit,
			dataOrigin: props.selectedItem.dataOrigin,
			dataFormula: props.selectedItem.dataFormula,
			frequencyValue: props.selectedItem.frequencyValue,
			frequencyUnit: props.selectedItem.frequencyUnit
		},
		{
			dataType: 'json',
			validators: zod4(indicadorEstrategicoFormSchema),
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

<Modal {open} onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Editar indicador estratégico</h2>
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

			<div class="modal-body">
				<input type="hidden" name="code" value={$form.code} />
				{#if $message}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning"></Icon>
						{$message}
					</div>
				{/if}
				<div class="form-fields">
					<InputSelectCustom
						label="Objetivo Estratégico"
						name="objetivoId"
						optionsData={objetivoOptions}
						required={true}
						bind:value={$form.objetivoId}
						errors={$errors.objetivoId}
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
					<InputNumber
						label="Meta"
						name="target"
						required={true}
						placeholder="20"
						status={$errors.target ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.target}
						errors={$errors.target}
					/>
					<InputText
						label="Unidad de Meta"
						name="targetUnit"
						required={true}
						placeholder="20"
						status={$errors.targetUnit ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.targetUnit}
						errors={$errors.targetUnit}
					/>

					<TextArea
						label="Origen de Datos"
						name="dataOrigin"
						placeholder="e.j Reporte SEP..."
						bind:value={$form.dataOrigin}
						required={true}
						rows={4}
					/>

					<TextArea
						label="Fórmula de Datos"
						name="dataFormula"
						placeholder="e.j (Alumnos con beca/Total de Alumnos)*100"
						bind:value={$form.dataFormula}
						required={true}
						rows={4}
					/>

					<InputNumber
						label="Frecuencia"
						name="frequencyValue"
						required={true}
						placeholder="1"
						status={$errors.frequencyValue ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.frequencyValue}
						errors={$errors.frequencyValue}
					/>

					<InputSelectCustom
						label="Unidad de Frecuencia"
						name="frequencyUnit"
						optionsData={frequencyUnitOptions}
						required={true}
						bind:value={$form.frequencyUnit}
						status={$errors.frequencyUnit ? 'error' : 'normal'}
					></InputSelectCustom>
				</div>
			</div>

			<menu class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary">Editar indicador</Button>
			</menu>
		</form>
	</div>
</Modal>
