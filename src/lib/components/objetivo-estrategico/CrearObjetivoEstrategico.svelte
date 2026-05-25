<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { estatusOptions } from '$lib/types/common.types';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import {
		objetivoEstrategicoFormSchema,
		type ObjetivoEstrategicoForm,
		type PlaneacionEstrategicaRef
	} from '$lib/schemas/objetivoEstrategico.schema';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		open: boolean;
		form: SuperValidated<ObjetivoEstrategicoForm>;
		refs: PlaneacionEstrategicaRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	const planeacionesOptions = $derived(
		props.refs?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, message, enhance } = superForm(props.form, {
		resetForm: true,
		validators: zod4Client(objetivoEstrategicoFormSchema),
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
			<h2 class="modal-title text-h4">Nuevo Objetivo Estrategico {$message}</h2>
			<IconButton
				name={'close'}
				variant={'ghost'}
				size={'lg'}
				onClick={handleClose}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form method="POST" action="?/create" use:enhance>
			<div class="modal-body">
				{#if $message}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name={'warning'}></Icon>
						{$message}
					</div>
				{/if}
				<div class="form-fields">
					<InputSelect
						label={'Planeacion Estrategica'}
						name={'planeacionId'}
						optionsData={planeacionesOptions}
						required={true}
						bind:value={$form.planeacionId}
						errors={$errors.planeacionId}
					></InputSelect>

					<InputText
						label={'Código'}
						name={'code'}
						required={true}
						placeholder={'OE-001'}
						status={$errors.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.code}
						errors={$errors.code}
					/>

					<InputText
						label={'Nombre'}
						name={'name'}
						required={true}
						placeholder={'Excelencia educativa'}
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

					<InputSelect
						label={'Estado'}
						name={'status'}
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
