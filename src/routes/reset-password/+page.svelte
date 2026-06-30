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
	let confirmPassword = $state('');
	let loading = $state(false);
	let errorMsg = $state<string | null>(null);
	let touchedConfirm = $state(false);

	const token = $derived(page.url.searchParams.get('token') ?? '');

	const passwordsMismatch = $derived(
		touchedConfirm && confirmPassword.length > 0 && password !== confirmPassword
	);

	const confirmError = $derived(passwordsMismatch ? 'Las contraseñas no coinciden' : '');

	const canSubmit = $derived(
		password.length > 0 && confirmPassword.length > 0 && password === confirmPassword && !loading
	);

	async function handleAccept() {
		touchedConfirm = true;
		if (password !== confirmPassword) {
			errorMsg = 'Las contraseñas no coinciden';
			return;
		}

		loading = true;
		errorMsg = null;
		try {
			await auth.resetPassword(token, password);
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
		<div class="form-container form-container--spacious form-container--sm">
			<header class="form-header">
				<h2 class="text-h4">Modificar password</h2>
			</header>
			<div class="form-fields">
				<InputText
					iconName="password"
					iconPosition="left"
					label="Password"
					name="password"
					type="password"
					required
					placeholder="********"
					bind:value={password}
					errors={errorMsg ?? ''}
				/>
				<InputText
					iconName="password"
					iconPosition="left"
					label="Confirmar password"
					name="confirmPassword"
					type="password"
					required
					placeholder="********"
					bind:value={confirmPassword}
					status={passwordsMismatch ? 'error' : 'normal'}
					errors={confirmError}
					onblur={() => (touchedConfirm = true)}
				/>
			</div>
			<footer class="form-actions text-body">
				<Button type="button" variant="primary" onClick={handleAccept} disabled={!canSubmit}>
					{loading ? 'Iniciando...' : 'Modificar'}
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
