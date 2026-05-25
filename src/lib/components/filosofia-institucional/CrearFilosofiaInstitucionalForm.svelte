<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import {
		filosofiaInstitucionalFormSchema,
		type FilosofiaInstitucionalForm
	} from '$lib/schemas/filosofiaInstitucional.schema';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import Input from '../ui/input/InputText.svelte';
	import TextArea from '../ui/input/TextArea.svelte';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		open: boolean;
		form: SuperValidated<FilosofiaInstitucionalForm>;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, errors, message, enhance, constraints } = superForm(props.form, {
		resetForm: true,
		validators: zod4Client(filosofiaInstitucionalFormSchema),
		validationMethod: 'auto',
		customValidity: false,
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
			<h2 class="modal-title text-h4">Crear filosofía institucional</h2>
			<IconButton
				name={'close'}
				variant={'ghost'}
				size={'lg'}
				onClick={handleClose}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<!--
			El <form> solo gestiona el envío.
			El scroll y el padding los maneja .modal-body.
			Los campos usan .form-fields sin modificador --scrollable
			porque el scroll ya lo aporta el contenedor padre.
		-->
		<form method="POST" action="?/create" use:enhance>
			<div class="modal-body">
				{#if $message}
					<div class="form-feedback form-feedback--error" role="alert">
						<Icon name={'warning'}></Icon>
						{$message}
					</div>
				{/if}

				<div class="form-fields">
					<Input
						label={'Código'}
						name={'code'}
						required={true}
						placeholder={'PE-001'}
						status={$errors.code ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.code}
						errors={$errors.code}
						{...$constraints.code}
					/>

					<Input
						label={'Nombre'}
						name={'name'}
						required={true}
						placeholder={'Excelencia educativa'}
						status={$errors.name ? 'error' : 'normal'}
						disabled={false}
						bind:value={$form.name}
						errors={$errors.name}
						{...$constraints.name}
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
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary">Crear filosofia</Button>
			</footer>
		</form>
	</div>
</Modal>
