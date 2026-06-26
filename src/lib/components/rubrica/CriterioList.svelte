<script lang="ts">
	import type { RubricaCriterioRef } from "$lib/schemas/shared.schema";


	interface Props {
		criterios: RubricaCriterioRef[];
	}

	const { criterios }: Props = $props();
</script>

<ul class="criterio-list">
	{#each criterios as criterio (criterio.id)}
		<li class="criterio-list__item">
			<span class="criterio-list__code text-caption">{criterio.code}</span>
			<p class="criterio-list__text text-body">{criterio.criterio}</p>
		</li>
	{/each}
</ul>

<style>
	.criterio-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin: 0;
		padding: var(--space-4);
		list-style: none;
	}

	.criterio-list__item {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		padding: var(--space-3);
		background-color: var(--bg-ground);
		border: var(--border-width-thin) solid var(--border-light);
		border-radius: var(--border-radius-md);
	}

	.criterio-list__code {
		color: var(--text-secondary);
		width: fit-content;
		padding: 0 var(--space-2);
		background-color: var(--bg-overlay-brand);
		color: var(--bg-brand-primary-active);
		border-radius: var(--border-radius-sm);
	}

	.criterio-list__text {
		margin: 0;
		color: var(--text-primary);
		line-height: var(--height-relaxed);
	}
</style>
