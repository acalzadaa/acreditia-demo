<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { auth } from '$lib/stores/auth.svelte';

	// Redirigir si ya está logueado
	$effect(() => {
		if (auth.user) {
			goto(resolve('/dashboard'));
		}
	});
</script>
