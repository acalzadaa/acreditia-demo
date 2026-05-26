<script lang="ts">
	import IconButton from '../ui/IconButton.svelte';

	interface Props {
		onClickCrear: (e: MouseEvent) => void;
		onKeydownCrear: (e: KeyboardEvent) => void;

		onClickExport?: (e: MouseEvent) => void;
		onKeydownExport?: (e: KeyboardEvent) => void;
		showExport?: boolean;

		onClickFilter?: (e: MouseEvent) => void;
		onKeydownFilter?: (e: KeyboardEvent) => void;
		showFilter?: boolean;
	}

	const {
		onClickCrear,
		onKeydownCrear,
		onClickExport,
		onKeydownExport,
		showExport = false,
		onClickFilter,
		onKeydownFilter,
		showFilter = false
	}: Props = $props();
</script>

<header class="toolbar">
	<section class="toolbar-actions">
		<IconButton
			size={'md'}
			variant="outline"
			borderShape={'round'}
			name="add"
			onClick={onClickCrear}
			onKeydown={onKeydownCrear}
		/>
	</section>
	<section>
		{#if showExport}
			<IconButton
				size={'md'}
				variant="ghost"
				borderShape={'square'}
				name="export"
				onClick={onClickExport || (() => {})}
				onKeydown={onKeydownExport || (() => {})}
			/>
		{/if}
		{#if showFilter}
			<IconButton
				size={'md'}
				variant={'ghost'}
				borderShape={'square'}
				name="filter"
				onClick={onClickFilter || (() => {})}
				onKeydown={onKeydownFilter || (() => {})}
			/>
		{/if}
	</section>
</header>

<style>
	/* Toolbar */
	.toolbar {
		grid-area: toolbar;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1.5rem;
		background-color: var(--bg-ground);
		box-shadow: var(--shadow-xs);
		border-bottom: 1px solid var(--border-light);
		gap: 1rem;
		flex-shrink: 0;
		height: 80px;
	}

	.toolbar-actions {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.toolbar {
			flex-direction: column;
			align-items: stretch;
			padding: 1rem;
		}

		.toolbar-actions {
			justify-content: stretch;
		}
	}
</style>
