<script lang="ts">
	import Badge from '$lib/components/ui/Badge.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
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

	function toggleOpen() {
		isOpen = !isOpen;
	}
</script>

<article
	class="rubrica-card"
	class:rubrica-card--open={isOpen}
	class:rubrica-card--highlight={highlight}
>
	<div class="rubrica-card__header">
		<div class="rubrica-card__main text-body">
			{#if showSelectIcon && onClickSelect}
				<Button variant="outline" onClick={() => onClickSelect(item)} name="check"
					>Seleccionar</Button
				>
			{/if}
			<span class="rubrica-card__code text-body-strong">{item.code}</span>
			<Badge variant="info">de {item.rangeStart} a {item.rangeEnd}</Badge>
			<Badge variant={item.criterios.length === 0 ? 'warning' : 'success'}>
				{item.criterios.length} criterios
			</Badge>
			{#if currentScore && currentScore >= item.rangeStart && currentScore <= item.rangeEnd}
				<p class="text-body-strong">Este elemento fue seleccionado en la etapa de autoevaluacion</p>
			{/if}
		</div>

		<div class="rubrica-card__actions text-body">
			<Button variant="outline" name="chevron-down" ariaExpanded={isOpen} onClick={toggleOpen}
				>Ver criterios</Button
			>

			{#if showDetailIcon}
				<IconButton
					isDisabled={item.isDeleted}
					name="detail"
					tooltipLabel="Ver detalle"
					size="md"
					borderShape="square"
					variant="ghost"
					onClick={() => navigateTo(item.code)}
					class="rubrica-card__criterios-toggle"
				/>
			{/if}
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

	.rubrica-card__criterios-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-1) var(--space-2);
		border: none;
		background: transparent;
		border-radius: var(--border-radius-md);
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.rubrica-card__criterios-toggle:hover {
		background-color: var(--neutral-900-10);
	}

	.rubrica-card__criterios-toggle:focus-visible {
		outline: var(--focus-ring);
		outline-offset: var(--focus-ring-offset);
	}

	.rubrica-card__chevron {
		display: inline-flex;
		width: var(--icon-size-sm);
		height: var(--icon-size-sm);
		transition: transform 0.2s ease;
	}

	.rubrica-card__chevron svg {
		width: 100%;
		height: 100%;
	}

	.rubrica-card__chevron--open {
		transform: rotate(180deg);
	}

	.rubrica-card__criterios {
		border-top: var(--divider);
		background-color: var(--bg-ground);
	}
</style>
