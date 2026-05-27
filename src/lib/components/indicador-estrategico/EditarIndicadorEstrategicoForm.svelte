<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import {  frequencyUnitOptions } from '$lib/types/common.types';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import InputNumber from '../ui/input/InputNumber.svelte';
	import { type IndicadorEstrategicoWithObjetivoItem } from '$lib/schemas/indicadorEstrategico.schema';
	import {
		objetivoEstrategicoItemSchema,
		type ObjetivoEstrategicoRefSchema
	} from '$lib/schemas/objetivoEstrategico.schema';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		open: boolean;
		selectedItem: IndicadorEstrategicoWithObjetivoItem;
		refs: ObjetivoEstrategicoRefSchema[];
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
	const { form, errors, enhance, tainted, isTainted, message } = superForm(props.selectedItem, {
		dataType: 'json',
		validators: zod4(objetivoEstrategicoItemSchema),
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
			<h2 class="modal-title text-h4">Editar Indicador Estrategico</h2>
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

			<div class="modal-body">
				{#if $message}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name="warning"></Icon>
						{$message}
					</div>
				{/if}
				<div class="form-fields">
					<InputSelect
						label="Objetivo Estrategico"
						name="objetivoId"
						optionsData={objetivoOptions}
						required={true}
						bind:value={$form.objetivoId}
						errors={$errors.objetivoId}
					/>

					<InputText
						label="Código"
						name="code"
						required={true}
						placeholder="PE-001"
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
						label="Formula de Datos"
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

					<InputSelect
						label="Unidad de Frecuencia"
						name="frequencyUnit"
						optionsData={frequencyUnitOptions}
						required={true}
						bind:value={$form.frequencyUnit}
						status={$errors.frequencyUnit ? 'error' : 'normal'}
					></InputSelect>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary">Editar indicador</Button>
			</footer>
		</form>
	</div>
</Modal>
