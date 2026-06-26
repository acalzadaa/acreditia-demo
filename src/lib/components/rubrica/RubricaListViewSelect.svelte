<script lang="ts">
	import EmptySection from '$lib/components/common/EmptySection.svelte';
	import type { RubricaItem } from '$lib/schemas/rubrica.schema';
	import RubricaCard from './RubricaCard.svelte';

	interface Props {
		showSelectIcon?: boolean;
		onClickSelect?: (item: RubricaItem) => void;
		items: RubricaItem[];
	}

	const {
		showSelectIcon = true,
		onClickSelect,
		items
	}: Props = $props();
</script>

<main class="main-panel">
	<section class="rubrica-list-container">
		{#if items && items.length > 0}
			<div class="rubrica-list">
				{#each items as item (item.id)}
					<RubricaCard {showSelectIcon} {onClickSelect} {item} />
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
