<script lang="ts">
	import Tag from '../ui/Tag.svelte';

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
			<Tag variant="info" class="text-body">{subtitle}</Tag>
		{/if}
	</div>
</header>
<style>
	.page-header {
		display: flex;
		align-items: center;
		padding: var(--stack-xs) var(--layout-container-padding);
		background-color: var(--bg-raised);
		box-shadow: var(--shadow-xs);
		border-bottom: var(--divider);
		flex-shrink: 0;
		min-height: var(--subheader-height);
		margin-left: var(--space-2);
		margin-right: var(--space-2);
	}

	.page-header-content {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		column-gap: var(--space-3);
		row-gap: var(--stack-xs);
		min-width: 0;
	}

	.page-header-title {
		color: var(--text-primary);
		margin: 0;
		line-height: var(--text-h5-height);
		min-width: 0;
	}

	/* Responsive: solo ajusta el "aire" exterior según el dispositivo,
	   el row->column del contenido ya lo resuelve flex-wrap */
	@media (max-width: 768px) {
		.page-header {
			padding: var(--stack-xs) var(--space-4);
		}
	}
</style>