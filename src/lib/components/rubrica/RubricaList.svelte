<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import RubricaCard from './RubricaCard.svelte';

	interface Props {
		gridArea?: string;
		showHeader?: boolean;
		showDetailIcon?: boolean;
		showSelectIcon?: boolean;
		onClickSelect?: (item: RubricaItem) => void;
		title?: string;
		subtitle?: string;
		items: RubricaItem[];
	}

	const {
		gridArea = 'main',
		showHeader = false,

		showDetailIcon = false,
		showSelectIcon = false,
		onClickSelect,
		title = 'Add',
		subtitle = '',
		items
	}: Props = $props();
</script>

<main class="main-panel" style="grid-area: {gridArea}">
	{#if showHeader}
		<PageHeader {title} {subtitle} />
	{/if}
	<section class="rubrica-list-container">
		{#if items && items.length > 0}
			<div class="rubrica-list">
				{#each items as item (item.id)}
					<RubricaCard {showSelectIcon} {onClickSelect} {item} {showDetailIcon} />
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
