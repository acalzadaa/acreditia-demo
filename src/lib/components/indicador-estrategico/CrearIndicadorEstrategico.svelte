<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { estatusOptions, frequencyUnitOptions } from '$lib/types/common.types';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import {
		indicadorEstrategicoFormSchema,
		type IndicadorEstrategicoForm,
		type ObjetivoEstrategicoRef
	} from '$lib/schemas/indicadorEstrategico.schema';
	import InputNumber from '../ui/input/InputNumber.svelte';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		open: boolean;
		form: SuperValidated<IndicadorEstrategicoForm>;
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
	const { form, errors, enhance, message } = superForm(props.form, {
		resetForm: false,
		validators: zod4(indicadorEstrategicoFormSchema),
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
			<h2 class="modal-title text-h4">Nuevo Indicador Estrategico</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={handleClose}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form method="POST" action="?/create" use:enhance>
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
						label="Meta"
						name="target"
						required={true}
						placeholder="20"
						status={$errors.target ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.target}
						errors={$errors.target}
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

					<InputText
						label="Responsable"
						name="responsible"
						placeholder="Nombre del responsable"
						status={$errors.responsible ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.responsible}
						errors={$errors.responsible}
					/>

					<InputSelect
						label="Estado"
						name="status"
						optionsData={estatusOptions}
						required={true}
						bind:value={$form.status}
						errors={$errors.status}
					></InputSelect>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear</Button>
			</footer>
		</form>
	</div>
</Modal>

<style>
	/* Responsive */
	@media (max-width: 640px) {
		.modal {
			margin: 0.5rem;
			max-height: calc(100vh - 1rem);
		}

		.modal-header,
		.form-fields,
		.modal-footer {
			padding: var(--space-4);
		}
	}
</style>
