<script lang="ts">
	import Avatar from '../ui/Avatar.svelte';
	import Button from '../ui/Button.svelte';
	import Logo from '../ui/Logo.svelte';

	interface Props {
		showAuth?: boolean;
		isLoggedIn?: boolean;
		username?: string;
		avatarImage?: string;
		onClickLogin?: (e: MouseEvent) => void;
		onKeydownLogin?: (e: KeyboardEvent) => void;
		onClickLogout?: (e: MouseEvent) => void;
		onKeydownLogout?: (e: KeyboardEvent) => void;
		onClickRegister?: (e: MouseEvent) => void;
		onKeydownRegister?: (e: KeyboardEvent) => void;
	}

	const {
		showAuth = true,
		isLoggedIn = false,
		username = 'User',
		avatarImage,
		onClickLogin,
		onKeydownLogin,
		onClickLogout,
		onKeydownLogout,
		onClickRegister,
		onKeydownRegister
	}: Props = $props();
</script>

<header class="header header-panel text-body">
	<div class="header-logo">
		<Logo companyName="acreditia"></Logo>
		<p class="text-h4">Acreditia</p>
	</div>
	{#if showAuth}
		<div class="header-user">
			{#if isLoggedIn}
				<Button variant='ghost' onClick={onClickLogout} onKeydown={onKeydownLogout}>
					Cerrar Sesion
				</Button>
				<p class="text-body-strong">{username}</p>
				<Avatar {username} src={avatarImage}></Avatar>
			{:else}
				<Button variant='ghost' onClick={onClickRegister} onKeydown={onKeydownRegister}>
					Crear Cuenta
				</Button>
				<Button variant='primary' onClick={onClickLogin} onKeydown={onKeydownLogin}>
					Iniciar Sesion
				</Button>
			{/if}
		</div>
	{/if}
</header>

<style>
	.header-panel {
		grid-area: header;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--border-light);
		background-color: var(--bg-ground);
		color: var(--text-on-surface);
	}

	.header-logo {
		display: flex;
		justify-items: center;
		align-items: center;
		gap: var(--space-3);
		padding-left: var(--space-2);
	}

	.header-user {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding-right: var(--space-2);
	}
</style>
