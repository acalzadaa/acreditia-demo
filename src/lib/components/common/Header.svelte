<script lang="ts">
	import Avatar from '../ui/Avatar.svelte';
	import Logo from '../ui/Logo.svelte';
	import UserMenuContainer from '../userMenu/UserMenuContainer.svelte';

	interface Props {
		showAuth?: boolean;
		showUserMenu?: boolean;
		username?: string;
		avatarImage?: string;
		onClickLogout?: () => void;
		onClickAvatar?: () => void;
	}

	const {
		showAuth = true,
		showUserMenu = false,
		username = 'User',
		avatarImage,
		onClickLogout,
		onClickAvatar
	}: Props = $props();
</script>

<header class="header header-panel text-body">
	<div class="header-logo">
		<Logo companyName="acreditia"></Logo>
		<p class="text-h4">Acreditia</p>
	</div>
	{#if showAuth}
		<div class="header-user">
			<div class="header-user">
				<p class="text-body-strong">{username}</p>
				<Avatar {username} src={avatarImage} onClick={onClickAvatar}></Avatar>
				{#if showUserMenu && onClickLogout}
					<UserMenuContainer {showUserMenu} {onClickLogout} />
				{/if}
			</div>
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
