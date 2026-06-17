<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import InputText from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import InputNumber from '../ui/input/InputNumber.svelte';
	import Icon from '../ui/Icon.svelte';
	import type { ObjetivoEstrategicoRef } from '$lib/schemas/objetivoEstrategico.schema';
	import {
		indicadorFormSchema,
		indicadorTypeOptions,
		type IndicadorForm
	} from '$lib/schemas/indicador.schema';
	import InputSelect from '../ui/input/InputSelect.svelte';

	interface Props {
		open: boolean;
		form: SuperValidated<IndicadorForm>;
		refs: ObjetivoEstrategicoRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, message, constraints } = superForm(props.form, {
		resetForm: false,
		validators: zod4(indicadorFormSchema),
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
			<h2 class="modal-title text-h4">Crear indicador</h2>
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
				<Button type="submit" variant="primary">Crear</Button>
			</footer>
		</form>
	</div>
</Modal>
