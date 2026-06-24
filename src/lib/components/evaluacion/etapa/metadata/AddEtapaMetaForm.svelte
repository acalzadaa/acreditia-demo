<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import InputNumber from '$lib/components/ui/input/InputNumber.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { EtapaMetaItem } from '$lib/schemas/etapaMetadata.schema';

	interface Props {
		selectedItem: EtapaMetaItem;
	}

	let { selectedItem }: Props = $props();

	// Estado local del formulario
	let formData = $derived({
		target: selectedItem.target,
		targetUnit: selectedItem.targetUnit
	});

	let errorMessage = $state('');
	let isSubmitting = $state(false);

	function handleSubmit() {
		// Validación básica
		if (!formData.target && formData.target !== 0) {
			errorMessage = 'La meta es requerida';
			return;
		}
		if (!formData.targetUnit) {
			errorMessage = 'La unidad de meta es requerida';
			return;
		}

		// Aquí podrías console.log o guardar los datos si quieres
		console.log('Datos enviados (demo):', formData);

		// Simular envío
		isSubmitting = true;

		// Limpiar mensaje de error
		errorMessage = '';

		// Notificar al padre si es necesario

		// Resetear estado de envío
		isSubmitting = false;
	}
</script>

<div class="form-container form-container--md form-container--spacious">
	<header class="form-header">
		<h2 class="text-h4">Capturar meta</h2>
	</header>

	<form
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}
	>
		{#if errorMessage}
			<div class="form-feedback form-feedback--error" role="alert">
				<Icon name="warning" />
				{errorMessage}
			</div>
		{/if}

		<div class="form-fields">
			<InputNumber
				label="Meta"
				name="target"
				required={true}
				placeholder="20"
				status={errorMessage && !formData.target ? 'error' : 'normal'}
				disabled={isSubmitting}
				bind:value={formData.target}
				errors={errorMessage && !formData.target ? [errorMessage] : undefined}
			/>

			<InputText
				label="Unidad de meta"
				name="targetUnit"
				required={true}
				placeholder="%"
				status={errorMessage && !formData.targetUnit ? 'error' : 'normal'}
				disabled={isSubmitting}
				bind:value={formData.targetUnit}
				errors={errorMessage && !formData.targetUnit ? [errorMessage] : undefined}
			/>
		</div>

		<footer class="form-actions text-body">
			<Button type="submit" variant="primary" isDisabled={isSubmitting}>
				{isSubmitting ? 'Guardando...' : 'Capturar'}
			</Button>
		</footer>
	</form>
</div>
