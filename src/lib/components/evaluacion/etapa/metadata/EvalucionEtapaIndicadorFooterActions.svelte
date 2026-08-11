<script lang="ts" generics="T extends { status: EvaluacionEtapaIndicadorStatus }">
	import Button from '$lib/components/ui/Button.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import { isEvaluacionEtapaIndicadorActionDisabled } from '$lib/components/evaluacion/utils/EvaluacionEtapaIndicadorUtils';
	import type { EvaluacionEtapaIndicadorStatus } from '$lib/schemas/evaluacionEtapaIndicador.schema';

	// T es cualquier item que tenga `status` — MetaIndicadorItem,
	// EvidenciaIndicadorItem, ResultadoIndicadorItem, etc. Todos
	// comparten el mismo EvaluacionEtapaIndicadorStatus, así que
	// la lógica de qué botones mostrar/deshabilitar es idéntica.

	interface Props {
		item: T;
		onClickEditar?: (item: T) => void;
		onClickNoAplica: (item: T) => void;
		onClickFinish: (item: T) => void;
		onClickAceptar: (item: T) => void;
		onClickRechazar: (item: T) => void;
	}

	const {
		item,
		onClickEditar,
		onClickNoAplica,
		onClickFinish,
		onClickAceptar,
		onClickRechazar
	}: Props = $props();
</script>

{#if item.status !== 'invalidate_request'}
	{#if onClickEditar}
		<IconButton
			variant="ghost"
			isDisabled={isEvaluacionEtapaIndicadorActionDisabled(item.status, 'edit').disabled}
			name="edit"
			onClick={() => onClickEditar(item)}
		/>
	{/if}
	<Button
		variant="outline"
		isDisabled={isEvaluacionEtapaIndicadorActionDisabled(item.status, 'upload').disabled}
		name="upload"
		onClick={() => onClickFinish(item)}>Enviar</Button
	>
	<Button
		variant="critical"
		isDisabled={isEvaluacionEtapaIndicadorActionDisabled(item.status, 'invalidate').disabled}
		name="close"
		onClick={() => onClickNoAplica(item)}>Invalidar</Button
	>
{:else}
	<Button
		variant="ghost"
		name="check"
		isDisabled={isEvaluacionEtapaIndicadorActionDisabled(item.status, 'accept').disabled}
		onClick={() => onClickAceptar(item)}>Aceptar</Button
	>
	<Button
		variant="critical"
		name="close"
		isDisabled={isEvaluacionEtapaIndicadorActionDisabled(item.status, 'reject').disabled}
		onClick={() => onClickRechazar(item)}>Rechazar</Button
	>
{/if}
