<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/main.css';
	import type { LayoutProps } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/components/common/stores/auth.svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let { children }: LayoutProps = $props();

	// Rutas públicas que no requieren autenticación
	const PUBLIC_ROUTES = new Set([
		'/login',
		'/signup',
		'/forgot-password',
		'/reset-password',
		'/accept-invite',
		'/confirm-email'
	]);

	// Procesar callbacks de autenticación (OAuth, confirmación, etc.)
	onMount(async () => {
		const result = await auth.handleAuthCallback();

		if (result) {
			switch (result.type) {
				case 'invite':
					// Redirigir al formulario para establecer contraseña
					goto(resolve(`/accept-invite?token=${result.token}`));
					break;
				case 'recovery':
					goto(resolve('/reset-password'));
					break;
				case 'oauth':
				case 'confirmation':
				case 'email_change':
					goto(resolve('/dashboard'));
					break;
			}
		}
	});

	// Protección de rutas reactiva
	$effect(() => {
		const currentPath = page.url.pathname;
		const isPublicRoute = PUBLIC_ROUTES.has(currentPath);

		if (!auth.isAuthenticated && !isPublicRoute && auth.initialized) {
			goto(resolve('/login'));
		}

		if (auth.isAuthenticated && isPublicRoute && currentPath !== '/login') {
			goto(resolve('/dashboard'));
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
