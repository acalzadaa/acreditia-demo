<script lang="ts">

	interface Props {
		title: string;
		subtitle?: string;
	}

	const { title, subtitle = '' }: Props = $props();
</script>

<header class="page-header">
	<div class="page-header-content">
		<h2 class="page-header-title text-h5">{title}</h2>
		{#if subtitle}
			<div class="page-header-subtitle text-body">
				{subtitle}
			</div>
		{/if}
	</div>
</header>

<style>
	.page-header {
		display: flex;
		align-items: center;
		padding: 0 var(--space-3);
		background-color: var(--bg-raised);
		box-shadow: var(--shadow-xs);
		border-bottom: var(--border-width-thin) solid var(--border-regular);
		flex-shrink: 0;
		height: var(--subheader-height);
		margin-left: var(--space-2);
		margin-right: var(--space-2);
	}

	.page-header-content {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--space-3);
	}

	.page-header-title {
		color: var(--text-primary);
		margin: 0;
		line-height: var(--text-h5-height);
	}

	.page-header-subtitle {
		color: var(--text-on-brand);
		background-color: var(--bg-overlay-brand);
		border-radius: var(--border-radius-button);
		padding: var(--space-1) var(--space-2);
		line-height: 1;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.page-header {
			padding: 0 var(--space-4);
		}
	}
</style>
