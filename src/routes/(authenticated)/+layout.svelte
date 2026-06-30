<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { auth } from '$lib/stores/auth.svelte';

	let { children } = $props();

	// Espera a que Identity termine de inicializar
	// y redirige si no hay usuario
	$effect(() => {
		if (auth.initialized && !auth.user) {
			console.log(auth.initialized, auth.user, 'you shall not pass!');
			goto(resolve('/'));
		}
	});
</script>

{#if !auth.initialized}
	<p>Cargando...</p>
{:else if auth.user}
	{@render children()}
{/if}
