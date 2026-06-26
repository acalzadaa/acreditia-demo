<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import PageHeader from '../common/PageHeader.svelte';
	import RubricaCard from './RubricaCard.svelte';

	interface Props {
		showHeader?: boolean;
		showSelectIcon?: boolean;
		onClickSelect?: (item: RubricaItem) => void;
		items: RubricaItem[];
		currentScore: number;
		title?: string;
		subtitle?: string;
	}

	const {
		showHeader = false,
		showSelectIcon = true,
		onClickSelect,
		items,
		currentScore,
		title = '',
		subtitle = ''
	}: Props = $props();
</script>

<main class="main-panel">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<section class="rubrica-list-container">
		{#if items && items.length > 0}
			<div class="rubrica-list">
				{#each items as item (item.id)}
					<RubricaCard
						highlight={currentScore >= item.rangeStart && currentScore <= item.rangeEnd}
						{showSelectIcon}
						{onClickSelect}
						{item}
						{currentScore}
					/>
				{/each}
			</div>
		{:else}
			<EmptySection message="No hay elementos de indicador"></EmptySection>
		{/if}
	</section>
</main>

<style>
	.rubrica-list-container {
		flex: 1;
		overflow-y: auto;
		padding: var(--space-2);
	}

	.rubrica-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}
</style>
