<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Header from '$lib/components/common/Header.svelte';
	import { auth } from '$lib/stores/auth.svelte';

	async function handleLogin() {
		goto(resolve('/login'));
	}

	function handleLogout() {
		auth.logout();
	}

	// Redirigir si ya está logueado
	$effect(() => {
		if (auth.user) {
			goto(resolve('/dashboard'));
		}
	});
</script>

<Header isLoggedIn={!!auth.user} onClickLogout={handleLogout} onClickLogin={handleLogin} />
