<script lang="ts">
	import Badge from '$lib/components/ui/Badge.svelte';
	import IconButton from '$lib/components/ui/IconButton.svelte';
	import { navigateTo } from '$lib/helpers/navigation';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import CriterioList from './CriterioList.svelte';

	interface Props {
		item: RubricaItem;
		showDetailIcon?: boolean;
		showSelectIcon?: boolean;
		onClickSelect?: (item: RubricaItem) => void;
		selectedValue?: number;
	}

	const {
		item,
		showDetailIcon = false,
		onClickSelect,
		showSelectIcon,
		selectedValue
	}: Props = $props();

	let isOpen = $state(false);

	function toggleOpen() {
		isOpen = !isOpen;
	}
</script>

<article class="rubrica-card" class:rubrica-card--open={isOpen}>
	<div class="rubrica-card__header">
		<div class="rubrica-card__main">
			{#if showSelectIcon && onClickSelect}
				<IconButton onClick={() => onClickSelect(item)} name="check" />
			{/if}
			<span class="rubrica-card__code text-body-strong">{item.code}</span>
			<Badge variant="info">de {item.rangeStart} a {item.rangeEnd}</Badge>
			<Badge variant={item.criterios.length === 0 ? 'warning' : 'success'}>
				{item.criterios.length} criterios
			</Badge>
			{#if selectedValue && selectedValue >= item.rangeStart && selectedValue <= item.rangeEnd}
				<Badge variant="success">Selected</Badge>
			{/if}
		</div>

		<div class="rubrica-card__actions">
			<IconButton name="chevron-down" ariaExpanded={isOpen} onClick={toggleOpen} />

			{#if showDetailIcon}
				<IconButton
					isDisabled={item.isDeleted}
					name="detail"
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
