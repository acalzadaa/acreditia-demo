<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Button from './Button.svelte';
	import { resolve } from '$app/paths';

	// Detecta si un segmento es un "código" (ej: 2026-1, abc-123)
	// y lo capitaliza solo si parece una palabra normal
	function formatLabel(segment: string): string {
		// Si contiene dígitos junto a guiones, es un código → no transformar
		const isCode = /\d/.test(segment);
		if (isCode) return segment;

		// Si son palabras separadas por guiones, capitalizar cada una
		return segment
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	let segments = $derived(page.url.pathname.split('/').filter(Boolean));
	let isDashboardHome = $derived(segments.length === 1 && segments[0] === 'dashboard');

	let breadcrumbItems = $derived(
		segments.map((segment, index) => {
			// Construir path correctamente uniendo con '/'
			const path = '/' + segments.slice(0, index + 1).join('/');
			const label = formatLabel(segment);
			const isLast = index === segments.length - 1;
			return { label, path, isLast };
		})
	);

	function handleHomeClick() {
		if (!isDashboardHome) {
			goto(resolve('/dashboard'));
		}
	}
</script>

<nav class="breadcrumb" aria-label="Breadcrumb">
	<!-- Botón Home -->
	<Button
		variant="link"
		size="md"
		name="home"
		onClick={handleHomeClick}
		ariaLabel="Ir al dashboard"
		isActive={isDashboardHome}
	>
		Home
	</Button>

	<!-- Segmentos adicionales (solo si no estamos en dashboard/home) -->
	{#if !isDashboardHome}
		{#each breadcrumbItems as item (item.path)}
			<!-- Separador antes de cada segmento -->
			<span class="breadcrumb__separator" aria-hidden="true">/</span>

			{#if item.isLast}
				<!-- Último segmento: no es clickeable -->
				<span class="breadcrumb__current" aria-current="page">
					{item.label}
				</span>
			{:else}
				<!-- Segmentos intermedios: botón tipo link -->
				<Button
					variant="link"
					size="md"
					onClick={() => goto(resolve(item.path))}
					ariaLabel="Ir a {item.label}"
				>
					{item.label}
				</Button>
			{/if}
		{/each}
	{/if}
</nav>

<style>
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--space-1);
	}

	.breadcrumb__separator {
		color: var(--text-muted);
		user-select: none;
		padding: 0 var(--space-1);
	}

	.breadcrumb__current {
		color: var(--text-muted);
		padding: var(--space-1) var(--space-2);
		font-size: inherit;
	}
</style>
