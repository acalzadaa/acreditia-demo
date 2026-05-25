<!-- src/routes/accept-invite/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import InputText from '$lib/components/ui/input/InputText.svelte';
	import { page } from '$app/state';
	import Header from '$lib/components/common/Header.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { resolve } from '$app/paths';
	import { auth } from '$lib/stores/auth.svelte';

	let password = $state('');
	let loading = $state(false);
	let errorMsg = $state<string | null>(null);

	const token = $derived(page.url.searchParams.get('token') ?? '');

	async function handleAccept() {
		loading = true;
		errorMsg = null;
		try {
			await auth.acceptInvite(token, password);
			goto(resolve('/dashboard'));
		} catch (err: unknown) {
			errorMsg = err instanceof Error ? err.message : 'Error al recuperar la cuenta';
			loading = false;
		}
	}
</script>

<div class="app-grid">
	<Header showAuth={false} />
	<main class="main">
		<div class="form-container--spacious">
			<header>
				<h2 class="text-h4">Crea tu contraseña</h2>
			</header>
			<div class="modal-body">
				<InputText
					label="Password"
					name="password"
					type="password"
					required
					placeholder="********"
					bind:value={password}
					errors={errorMsg ?? ''}
				/>
			</div>
			<footer class="form-actions text-body">
				<Button type="button" variant="primary" onClick={handleAccept} disabled={loading}>
					{loading ? 'Iniciando...' : 'Iniciar Sesión'}
				</Button>
			</footer>
		</div>
	</main>
	<Footer />
</div>

<style>
	.app-grid {
		display: grid;
		grid-template-areas:
			'header'
			'main'
			'footer';
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
		height: 100vh;
	}

	.main {
		background-color: var(--bg-ground);
		grid-area: main;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-6);
	}
</style>
