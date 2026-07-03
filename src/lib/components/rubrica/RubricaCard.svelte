<script lang="ts">
	import Badge from '$lib/components/ui/Badge.svelte';
	import { navigateTo } from '$lib/helpers/navigation';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import Button from '../ui/Button.svelte';
	import CriterioList from './CriterioList.svelte';

	interface Props {
		item: RubricaItem;
		showDetailIcon?: boolean;
		showSelectIcon?: boolean;
		onClickSelect?: (item: RubricaItem) => void;
		currentScore?: number;
		highlight?: boolean;
	}

	const {
		item,
		showDetailIcon = false,
		onClickSelect,
		showSelectIcon,
		currentScore,
		highlight = false
	}: Props = $props();

	let isOpen = $state(false);
	let rotate = $state(0);
	function toggleOpen() {
		isOpen = !isOpen;
		rotate = rotate === 180 ? 0 : 180;
	}

	let seleccionado = $derived(
		currentScore && currentScore >= item.rangeStart && currentScore <= item.rangeEnd
	);
</script>

<article
	class="rubrica-card"
	class:rubrica-card--open={isOpen}
	class:rubrica-card--highlight={highlight}
>
	<div class="rubrica-card__header">
		<div class="rubrica-card__main text-body">
			{#if showSelectIcon && onClickSelect}
				{#if seleccionado}
					<Button variant="primary" onClick={() => onClickSelect(item)} name="check">
						Seleccionar
					</Button>
				{:else}
					<Button variant="outline" onClick={() => onClickSelect(item)} name="check">
						Seleccionar
					</Button>
				{/if}
			{/if}
			<span class="rubrica-card__code text-body-strong">{item.code}</span>
			<Badge variant="info">de {item.rangeStart} a {item.rangeEnd}</Badge>
			<Badge variant={item.criterios.length === 0 ? 'warning' : 'success'}>
				{item.criterios.length} criterios
			</Badge>
		</div>

		<div class="rubrica-card__actions text-body">
			{#if showDetailIcon}
				<Button
					isDisabled={item.isDeleted}
					name="detail"
					tooltipLabel="Ver detalle"
					size="md"
					variant="outline"
					onClick={() => navigateTo(item.code)}
					class="rubrica-card__criterios-toggle">Ver detalle</Button
				>
			{/if}
			<div>
				<Button
					iconRotate={rotate}
					variant="outline"
					name="chevron-down"
					ariaExpanded={isOpen}
					onClick={toggleOpen}
				>
					Ver criterios
				</Button>
			</div>
		</div>
	</div>

	{#if isOpen}
		<div class="rubrica-card__criterios">
			<CriterioList criterios={item.criterios} />
		</div>
	{/if}
</article>

<style>
	.rubrica-card {
		background-color: var(--bg-raised);
		border: var(--border-card);
		border-radius: var(--border-radius-card);
		box-shadow: var(--shadow-card);
		overflow: hidden;
		transition: box-shadow 0.15s ease;
	}

	.rubrica-card--open {
		box-shadow: var(--shadow-md);
	}

	.rubrica-card--highlight {
		background-color: var(--bg-raised-active);
	}

	.rubrica-card__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-4);
	}

	.rubrica-card__header:hover {
		background-color: var(--bg-raised-active);
	}

	.rubrica-card__main {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		min-width: 0;
	}

	.rubrica-card__code {
		color: var(--text-primary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.rubrica-card__actions {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-shrink: 0;
	}

	.rubrica-card__criterios {
		border-top: var(--divider);
		background-color: var(--bg-ground);
	}
</style>
