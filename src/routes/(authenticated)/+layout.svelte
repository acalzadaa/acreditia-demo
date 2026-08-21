<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { auth } from '$lib/components/common/stores/auth.svelte';

	let { children } = $props();

	// Espera a que Identity termine de inicializar
	// y redirige si no hay usuario
	$effect(() => {
		if (auth.initialized && !auth.user) {
			goto(resolve('/'));
		}
	});
</script>

{#if !auth.initialized}
	<p>Cargando...</p>
{:else if auth.user}
	{@render children()}
{/if}
