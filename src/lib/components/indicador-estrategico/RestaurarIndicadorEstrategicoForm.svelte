<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Modal from '../modal/Modal.svelte';
	import Button from '../ui/Button.svelte';
	import IconButton from '../ui/IconButton.svelte';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import {
		indicadorEstrategicoFormSchema,
		type IndicadorEstrategicoItem
	} from '$lib/schemas/indicadorEstrategico.schema';

	interface Props {
		open: boolean;
		selectedItem: IndicadorEstrategicoItem;
		onClose: () => void;
	}

	let { open = $bindable(false), onClose, ...props }: Props = $props();

	// NOTE: The form prop is replaced via server response and page re-render,
	// not through reactive updates within this component instance.
	// Therefore ignoring the state_referenced_locally warning is safe.
	// svelte-ignore state_referenced_locally
	const { form, enhance } = superForm(
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
			customValidity: false,
			resetForm: false,
			onSubmit: () => {
				handleClose();
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

<Modal bind:open onClickClose={handleClose} closeOnEscape closeOnBackdropClick>
	<div class="modal">
		<header class="modal-header">
			<h2 class="modal-title text-h4">Restaurar indicador estrategico</h2>
			<IconButton
				name="close"
				variant="ghost"
				size="lg"
				onClick={onClose}
				onKeydown={(e) => onKeydownClose(e)}
			/>
		</header>

		<form method="POST" action="?/restore" use:enhance>
			<!-- Hidden input para el ID -->
			<input type="hidden" name="id" value={$form.id} />
			<input type="hidden" name="code" value={$form.code} />

			<div class="modal-form confirm-content">
				<p class="confirm-message text-body-large">
					¿Estás seguro de que deseas restaurar el registro <strong>"{$form.name}"</strong>?
				</p>
			</div>

			<footer class="modal-footer text-body">
				<Button type="button" variant="ghost" onClick={handleClose}>Cancelar</Button>
				<Button type="submit" variant="primary">Restaurar indicador</Button>
			</footer>
		</form>
	</div>
</Modal>
