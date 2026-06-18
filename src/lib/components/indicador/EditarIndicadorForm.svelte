<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import InputNumber from '../ui/input/InputNumber.svelte';

	import { zod4 } from 'sveltekit-superforms/adapters';
	import Icon from '../ui/Icon.svelte';
	import {
		indicadorFormSchema,
		indicadorTypeOptions,
		type IndicadorItem
	} from '$lib/schemas/indicador.schema';
	import type { ModeloFullRef } from '$lib/schemas/modelo.schema';

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
			seccionCode: props.selectedItem.section.code,
			target: props.selectedItem.target,
			targetUnit: props.selectedItem.targetUnit,
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

	// Estados para los selects
	let selectedModeloCode = $state<string>('');
	let selectedCapituloCode = $state<string>('');
	let selectedSeccionCode = $state<string>('');

	// Opciones de modelo (todos los modelos)
	let modeloOptions = $derived(
		props.modeloFullRef.map((item) => ({
			id: item.code,
			option: `${item.code} - ${item.name}`
		}))
	);

	let capituloOptions = $derived(
		!selectedModeloCode
			? []
			: (props.modeloFullRef
					.find((m) => m.code === selectedModeloCode)
					?.capitulos?.map((c) => ({
						id: c.code,
						option: `${c.code} - ${c.name || `Capítulo ${c.code}`}`
					})) ?? [])
	);

	let seccionOptions = $derived(
		!selectedModeloCode || !selectedCapituloCode
			? []
			: (props.modeloFullRef
					.find((m) => m.code === selectedModeloCode)
					?.capitulos?.find((c) => c.code === selectedCapituloCode)
					?.secciones?.map((s) => ({
						id: s?.code,
						option: `${s?.code} - ${s?.name || `Sección ${s?.code}`}`
					})) ?? [])
	);

	// Resetear selecciones cuando cambia el modelo
	function onModeloChange(value: string) {
		console.log("modelo changed!!");
		selectedModeloCode = value;
		console.log(selectedModeloCode, value);
		selectedCapituloCode = '';
		selectedSeccionCode = '';
		$form.seccionCode = '';
	}

	// Resetear selección de sección cuando cambia el capítulo
	function onCapituloChange(value: string) {
		selectedCapituloCode = value;
		selectedSeccionCode = '';
		$form.seccionCode = '';
	}

	// Actualizar el valor del formulario cuando se selecciona una sección
	function onSeccionChange(value: string) {
		selectedSeccionCode = value;
		$form.seccionCode = value;
	}
</script>

<Modal bind:open closeOnEscape closeOnBackdropClick>
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
					<InputSelect
						label="Modelo"
						name="modelo"
						optionsData={modeloOptions}
						required={true}
						bind:value={selectedModeloCode}
						onChange={onModeloChange}
					/>

					<InputSelect
						label="Capítulo"
						name="capitulo"
						optionsData={capituloOptions}
						required={true}
						bind:value={selectedCapituloCode}
						onChange={onCapituloChange}
						disabled={!selectedModeloCode}
					/>

					<InputSelect
						label="Sección"
						name="seccion"
						optionsData={seccionOptions}
						required={true}
						bind:value={selectedSeccionCode}
						onChange={onSeccionChange}
						disabled={!selectedCapituloCode}
						errors={$errors.seccionCode}
						{...$constraints.seccionCode}
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
						label="Unidades de Meta"
						name="targetUnit"
						required={true}
						placeholder="20"
						status={$errors.targetUnit ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.targetUnit}
						errors={$errors.targetUnit}
					/>

					<InputSelect
						label="Tipo"
						name="type"
						optionsData={indicadorTypeOptions}
						required={true}
						bind:value={$form.indicadorType}
						errors={$errors.indicadorType}
						{...$constraints.indicadorType}
					/>
				</div>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary">Editar indicador</Button>
			</footer>
		</form>
	</div>
</Modal>
