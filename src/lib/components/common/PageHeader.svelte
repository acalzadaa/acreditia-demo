<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
	}

	const { title, subtitle = '' }: Props = $props();
</script>

<header class="page-header">
	<div class="page-header-content">
		<span class="page-header-title text-body-strong">{title}</span>
		{#if subtitle}
			<span class="page-header-subtitle text-body">{subtitle}</span>
		{/if}
	</div>
</header>

<style>
	.page-header {
		display: flex;
		align-items: center;
		padding: 0.5rem 1.5rem;
		background-color: var(--bg-ground);
		box-shadow: var(--shadow-xs);
		border-bottom: 1px solid var(--border-light);
		flex-shrink: 0;
		height: 60px;
	}

	.page-header-content {
		display: flex;
		flex-direction: row;
		gap: 0.125rem;
	}

	.page-header-title {
		line-height: 1.2;
	}

	.page-header-subtitle {
		color: var(--text-subtle);
		line-height: 1.2;
        padding-left: 20px;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.page-header {
			padding: 1rem;
		}
	}
</style>