<script lang="ts">
	import LoginForm from '$lib/components/features/auth/LoginForm.svelte';
	import Footer from '$lib/components/features/layout/Footer.svelte';
	import Header from '$lib/components/features/layout/Header.svelte';
</script>

<div class="app-grid">
	<Header showAuth={false} />
	<main class="main">
		<LoginForm />
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
