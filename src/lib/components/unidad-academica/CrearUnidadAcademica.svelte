<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { estatusOptions } from '$lib/types/common.types';
	import InputSelect from '../ui/input/InputSelect.svelte';
	import InputText from '../ui/input/InputText.svelte';
	import type {
		CampusRef,
		EntidadLegalRef,
		InstitucionRef,
		RegionRef
	} from '$lib/schemas/ref.schema';
	import {
		unidadAcademicaFormSchema,
		type UnidadAcademicaForm
	} from '$lib/schemas/unidadAcademica.schema';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		open: boolean;
		form: SuperValidated<UnidadAcademicaForm>;
		entidadesLegales: EntidadLegalRef[];
		regiones: RegionRef[];
		instituciones: InstitucionRef[];
		campus: CampusRef[];
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	const entidadLegalOptions = $derived(
		props.entidadesLegales?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	const regionOptions = $derived(
		props.regiones?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	const institucionOptions = $derived(
		props.instituciones?.map((ref) => ({
			id: ref.id,
			option: `${ref.code} - ${ref.name}`
		})) ?? []
	);

	const campusOptions = $derived(
		props.campus?.map((ref) => ({
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
		validators: zod4(unidadAcademicaFormSchema),
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
						label={'Entidad Legal'}
						name={'entidadLegalId'}
						optionsData={entidadLegalOptions}
						required={true}
						bind:value={$form.entidadLegalId}
						errors={$errors.entidadLegalId}
					/>

					<InputSelect
						label={'Region'}
						name={'regionId'}
						optionsData={regionOptions}
						required={true}
						bind:value={$form.regionId}
						errors={$errors.regionId}
					/>

					<InputSelect
						label={'Institucion'}
						name={'institucionId'}
						optionsData={institucionOptions}
						required={true}
						bind:value={$form.institucionId}
						errors={$errors.institucionId}
					/>

					<InputSelect
						label={'Campus'}
						name={'campusId'}
						optionsData={campusOptions}
						required={true}
						bind:value={$form.campusId}
						errors={$errors.campusId}
					/>

					<InputText
						label={'Código'}
						name={'code'}
						required={true}
						placeholder={'PE-001'}
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
